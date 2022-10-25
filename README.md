# Intelligent_Schedule_Builder

# Overview

Intelligent Schedule Builder (ISB) is a web application which allows
McGill students to plan out their course load for their entire degree.
It’s name is a playful poke at Visual Schedule Builder (VSB), which is
the official course planning software currently offered to students by
the school. Unlike VSB, ISB provides the functionality for students to
plan their courses beyond a single term. Instead students can use ISB to
select the courses they want to take for every year and every term that
they are at McGill.  
As a student fills out the courses for a given year or term, the
software will automatically filter in and out courses based on whether
or not they have their prior choices give them the pre-requisites or
not. After filling out their planner, users can save their selections
under a personal profile, so that they can return and make changes if
needed.

## Application Scope

-   Display the users courses for each year and every term.

-   Ability to add and remove courses to the planner. User can search
    for courses, but will also be prompted with recommended options
    based on their degree and previously taken courses.

-   Dynamically and automatically update the list of possible courses a
    user can take, as they add or remove them in previous terms and/or
    years.

-   Store the users finished course plan in a customized personal
    profile/account.

## Future Avenues to Extend Project Scope

-   Implement a course recommendation system using machine learning.

-   Introduce a rating system, similar to rate my profs that’s
    associated with a reviewers profile.

# Use Cases

While ISB’s target user base is McGill Students, there are four example
user profiles which encompass the majority of use cases for all
students.  

-   First Year undeclared Arts Major: Since first-year students have not
    chosen any major that they want to be in, we want to ensure they
    take a variety of courses.

-   Entering U1 CS & Stats Major: They will have to take basic required
    courses that are pre-requisite to other higher level courses.

-   Entering U2 Biology & History Major, Fiance Minor want to do an
    exchange: The U2 has a lot of unrelated courses, but taking an
    exchange in the year they’re entering will mean that they will have
    to plan out how they are going to arrange their schedule.

-   Software engineering student who has to do Co-Ops: Similar
    constraints to the CS & Stats apply. However, they have to factor in
    when they will be doing Co-Ops and how it will be affecting their
    schedule.

# General Requirements

-   MongoDB: We will be using Graph Database which will allow us to
    create a tree structure based on the pre-requisite courses. Use
    $graphLookup to traverse connections between each node.

-   Node.js: Using Node.js to scrap McGill Websites to acquire
    information about general required courses and complementary courses
    for each program.

-   TypeScript: Using TypeScript as main language for the web app
    implementation

-   NextJs: Using NextJs as framework for our backend and frontend
    implementation

# Milestones and deadlines

|                                                   |                       |
|:--------------------------------------------------|:----------------------|
| Web scraping app                                  | Week of 14th October  |
| Database set up                                   | Week of 21st October  |
| Backend interface set up and synced with database | Week of 28th October  |
| Web app logic implemented                         | Week of 4th November  |
| Front-end components built                        | Week of 11th November |
| Testing and final build of the web app            | Week of 11th November |
