import json
from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup
import pandas as pd 
import data_scraper_utils as utils

secret_key = ""
myclient = MongoClient(secret_key)

db = myclient["Courses"]
Collection = db["Course Information"]

"""
Webscaping driver:

Parses McGill's course catalog and retrieves the necessary field values required to populate
Documents in our MongoDB's Course database.
"""
def dataScapeDriver():
    
    source_url='https://www.mcgill.ca/study/2022-2023/courses/search'
    headers = requests.utils.default_headers()

    headers.update(
        {
            'User-Agent': 'My User Agent 1.0',
        }
    )
    response = requests.get(source_url,headers=headers)

    soup = BeautifulSoup(response.text, 'html.parser')
    div = soup.find_all('h4', class_='field-content')
    course_codes = []



    url1 = 'https://www.mcgill.ca/study/2022-2023/courses/search?page='


    for page in range(1,520):
        #parse through all the course pages
        url2 = url1 + str(page)
        response = requests.get(url2)
        
        soup = BeautifulSoup(response.text, 'html.parser')
        div = soup.find_all('h4', class_='field-content')

        for d in div:
            s = d.text.split(" ")

            st = s[0] +"-"+ s[1]
            #
            course_codes.append(st.lower())

    print(len(course_codes))
    
    base_url = 'https://www.mcgill.ca/study/2022-2023/courses/'
    
    cleaned_course_dicts_for_db = []
    for code_index in range(0,len(course_codes)-1):
        #loop through the list of course codes, get the html of each, and parse it
        course_page = base_url + course_codes[code_index]
        res = requests.get(course_page)
        soup = BeautifulSoup(res.text, 'html.parser')
        dm = soup.find_all(True, {'class':['node', 'node-catalog']})
        #each html file will be cleaned and turned into a dictionary, 
        #that will be inserted into the db. these dicts are stored as a list
        print(code_index)
        cleaned_course_dicts_for_db.append(parseHTML(dm,course_codes[code_index],soup))
    
    #the final list of data dictionaries will be inserted all at once into the MongoDB
    #get rid of any courses which aren't offered.
    response.close()
    return list(filter(lambda x: bool(x), cleaned_course_dicts_for_db))

def parseHTML(dm,course_code,soup):
    #TODO: clean the instructors field. Turn isntructors into a list of (term, prof_name) tuples
    

    """sort through the resulting web page HTML data
    the fields store infor on a given course and are labeled appropriately"""
    
    for g in dm:

        par = g.findAll('p')
        
        
        #print(par[2:])
        
        #title and overview are always available
        title,overview,adjustment = utils.getSafeDataPoints(par,course_code)
        terms,instructors = utils.courseIsOffered(par,adjustment)
        #check if the course is still offered
        if terms[0] and instructors[0]:
            #if the course is valid then extract and clean the remaining data points
            faculty,prereqs,credits,coreqs = utils.cleanDataIfOffered(par,soup)
        else:
            return {}

        #   
        #create a dictionary of the data and return it
    
    return courseDataToDict(course_code,title,credits,faculty,overview,terms[1],instructors[1],prereqs,coreqs)

        
        

def courseDataToDict(id,title,credits,faculty,overview,terms,instructors,prerequisites,corequisites):
  '''
  Takes cleaned data points required for a course document and stores them in DB

  Creates key-value pair between item:field
  '''
  data_dict = {
      "course_id": id,
      "course_title": title,
      "credits": credits,
      "faculty": faculty,
      "overview": overview,
      "terms": terms,
      "instructors": instructors,
      "prerequisites": prerequisites,
      "corequisites": corequisites
  }


  #insert resulting dictionary into ISB-Beta/Courses/Course Data as a json file
  
  return data_dict
  
if __name__ == '__main__':

    result = dataScapeDriver()
    Collection.insert_many(result)
