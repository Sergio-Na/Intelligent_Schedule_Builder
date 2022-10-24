import React, { useState } from "react";
import courseExample from "../assets/courseExample";
import CourseInfo from "./courseInfo";
import { courses } from "../assets/courseExample";
function TestForm() {
  let index = 0;
  function handleSubmit(event) {
    event.preventDefault();
    const courseTitle = event.target.elements.courseCode.value;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].course_id === courseTitle) {
        index = i;
        break;
      }
    }
    console.log(courses[index]);
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex">
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Course code"
            name="courseCode"
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default TestForm;
