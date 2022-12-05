import Link from "next/link";
import { Fragment, useEffect } from "react";
import { SSRProvider } from "react-bootstrap";
import SearchCourse from "../../src/components/courses/SearchCourse";
import MiniCourseCard from "../../src/components/courses/MiniCourseCard";
import {MongoClient} from 'mongodb'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import MiniCourse from "../../src/models/mini_course";

const DUMMY_COURSE = {
  id: "sdfsdfslkd23r90s",
  course_title: "COMP 250",
  credits: 3,
  faculty: "Science",
  overview: "COMPSCI ROCKS!!!",
  terms: ["Fall", "Winter"],
  instructors: ["Adam Smith", "Sidney Crosby"],
  prerequisites: ["COMP 250"],
  corequisites: ["MATH 240"],
};

function CourseSelection(props: MiniCourse) {
  
  const [courseDetails,displayCourse] = useState<MiniCourse>(DUMMY_COURSE);
  useEffect(() => {
    displayCourse(DUMMY_COURSE);
  },[] );
  const searchCourseHandler = async (course_title: string) => {
  //   const searchRequest = {"course_title":course_title};
  //   const response = await fetch('/api/course-search', {cache: 'no-store' 
  //   });
  //   const resultData = await response.json();
  //   const courseCard: MiniCourse = JSON.parse(resultData);

  //   displayCourse((prevCourse) => {
  //     return (prevCourse = courseCard);
  //   })

    
  };
  

  return (
    <div>
      <SSRProvider>
        <SearchCourse onSearchCourse={searchCourseHandler} />
        <MiniCourseCard course = {props}/>
      </SSRProvider>
    </div>
  );
}
export async function getStaticPaths(){
  return {
    fallback: true,
    paths: [
      {
        params: {
          courseId: 'COMP 250'
        }
      }
    ]
  };
}

export async function getStaticProps(context:any) {
  const courseId = context.params.courseId
  const client = await MongoClient.connect('mongodb+srv://ben-hep:QDS1WvgC8Ae7KGwf@isb-beta.qujthpg.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db("Courses");
  const coursesCollection = db.collection("Course Information");

  const data = await coursesCollection.findOne({course_title: courseId});
  client.close();
  return {
    props: {
      course: DUMMY_COURSE
    }
  };
}

export default CourseSelection;
