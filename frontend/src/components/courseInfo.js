import React from "react";

const CourseInfo = (par) => {
  let props = par.info;
  return (
    <div className="">
      <p>Course id: {props.course_id}</p>
      <p>Course title: {props.course_title}</p>
      <p>Credits: {props.credits}</p>
      <p>Faculty: {props.faculty}</p>
      <p>Overview: {props.overview}</p>
      <p>Terms: {props.terms}</p>
    </div>
  );
};

export default CourseInfo;
