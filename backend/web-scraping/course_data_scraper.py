import json
from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup
import pandas as pd
myclient = MongoClient("mongodb+srv://ben-hep:QDS1WvgC8Ae7KGwf@isb-beta.qujthpg.mongodb.net/?retryWrites=true&w=majority")

db = myclient["Courses"]
Collection = db["Course Information"]

"""
Webscaping driver:

Parses McGill's course catalog and retrieves the necessary field values required to populate
Documents in our MongoDB's Course database.
"""
def dataScapeDriver():
    source_url='https://www.mcgill.ca/study/2022-2023/courses/search'
    response = requests.get(source_url)

    soup = BeautifulSoup(response.text, 'html.parser')
    div = soup.find_all('h4', class_='field-content')
    course_codes = []

    for d in div:
        s = d.text.split(" ")

        st = s[0] +"-"+ s[1]
        #
        course_codes.append(st.lower())


    url1 = 'https://www.mcgill.ca/study/2022-2023/courses/search?page='


    for page in range(1,5):
        #parse through all the course pages
        url2 = url1 + str(page)
        response = requests.get(url2)

        soup = BeautifulSoup(response.text, 'html.parser')
        div = soup.find_all('h4', class_='field-content')



    base_url = 'https://www.mcgill.ca/study/2022-2023/courses/'
    course_page = base_url + course_codes[1]
    #print(course_page)

    res = requests.get(course_page)
    soup = BeautifulSoup(res.text, 'html.parser')
    dm = soup.find_all(True, {'class':['node', 'node-catalog']})
    parseHTML(dm,course_codes[1],soup)

def parseHTML(dm,course_code,soup):

    #sort through the resulting web page HTML data

    for g in dm:
        #print(g.findAll('p'))
        credit = soup.find('h1', id='page-title').text.split('(')[1].split(" ")[0]
        #print("credit: {c}".format(c=credit))
        par = g.findAll('p')
        overview = par[1].text.strip("\n")[19:]
        #print(overview)
        terms = par[2].text.split(":")[1:]
        terms = [e.strip() for e in terms]

        instructors = par[3].text.split(":")[1].strip().split(")")
        instructors.remove("")
        faculty = par[0].a.text
        #print(terms)
        prereqs = par[4].text.split(":")[1:]
        prereqs = [ e.strip() for e in prereqs]
        #print(prereqs)
        title = course_code.replace("-"," ")
        storeCourseData(course_code,title,credit,faculty,overview,terms,prereqs)
        #c = Course(course_codes[1], int(credit),overview, faculty, instructors,terms)

def storeCourseData(id,title,credits,faculty,overview,terms,prerequisites=[],corequisites=[]):
  '''
  Takes cleaned data points required for a course document and stores them in DB

  Creates key-value pair between item:field
  '''
  data_dict = {
      "course_id":id,
      "course_title":title,
      "credits":credits,
      "faculty":faculty,
      "overview":overview,
      "pre-requisites": prerequisites,
      "co-requisites": corequisites
  }
  for key,value in data_dict.items():
      print("{k} : {v}".format(k=key,v=value))

  #insert resulting dictionary into ISB-Beta/Courses/Course Data as a json file
  Collection.insert_one(data_dict)

dataScapeDriver()
