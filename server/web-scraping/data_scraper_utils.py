"""
Helper functions for cleaning the HTML pages from the McGIll Course Catalog
"""
def courseIsOffered(par,adjustment):
    """
    Takes the HTML Page of a course, and checks if the course is offered in the course
    current academic year.

    Note: the adjustment argument refers to the differences in 
    
    () -> (list)
    """
    terms = getTerms(par,adjustment)
    instructors = getInstructors(par,adjustment)

    return [terms,instructors]

def getSafeDataPoints(par,course_code):
    """
    Returns the data points which will exist regardless of if course is offered.
    (par) -> list
    """
    title = getTitle(course_code)
    adjustment,overview = getOverview(par)
    
    return [title,overview,adjustment]

def cleanDataIfOffered(par,soup):
    """
    
    Only safe to call if the course, who's HTML page is passed, is valid.
    Returns the remaining course data points.

    (par) -> (list)
    """
    faculty = getFaculty(par)
    prereqs = getPrerequisites(par)
    credits = getCredits(soup)
    coreqs = getCorequisites(par)
    
    return [faculty,prereqs,credits,coreqs]

def getInstructors(par,adjustment):
    """
    (par) -> (bool, list)
    
    """
    instructors = par[3+adjustment].text.split(":")[1].strip().split(")")
    if instructors[0] == 'There are no professors associated with this course for the 2022-2023 academic year.':
        return False, instructors
    else:
        instructors.remove("")
        return True, instructors
        
def getTerms(par,adjustment):
    """
    (par) -> (bool, list)
    """
    terms = par[2+adjustment].text.split(":")[1:]
    terms = [e.strip() for e in terms]
    if terms[0] == 'This course is not scheduled for the 2022-2023 academic year.':
        return False, terms

    else:
        return True, terms

def getOverview(par):

    if par[1].text[:15].__eq__("Administered by"):
        overview = par[2].text.strip("\n").split(":")
        if len(overview) == 1:
            return 1,"No description"
        return 1, overview[1][1:]
    else:
        print(par[1].text.strip("\n"))
        overview = par[1].text.strip("\n").split(":")
        if len(overview) == 1:
            return 0,"No description"
        return 0, overview[1][1:]        
    
    

def getPrerequisites(par):
    #TODO: replace 'equivalent' with the actual course codes of the referenced course's equivalencies
    prereqs = []
    for i in range(4,7):
        try:
            if par[i].text[:12].__eq__("Prerequisite"):
                prereqs = par[i].text.split(":")[1:]
        except IndexError:
            break
    return [ e.strip() for e in prereqs]

def getCorequisites(par):
    #TODO: replace 'equivalent' with the actual course codes of the referenced course's equivalencies
    coreqs = []
    for i in range(5,8):
        try:
            if par[i].text[:11].__eq__("Corequisite"):
                coreqs = par[i].text.split(":")[1:]
        except IndexError:
            break
    return [ e.strip() for e in coreqs]

def getFaculty(par):
    return par[0].a.text

def getTitle(course_code):
    return course_code.replace("-"," ").upper()

def getCredits(soup):
    try:
        credits = soup.find('h1', id='page-title').text.split('(')[1].split(" ")[0]
    except IndexError:
        print("no credits for this course")
        credits = "N/A"
    return credits

