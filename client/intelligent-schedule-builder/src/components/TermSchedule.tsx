import { useState } from 'react';
import TermScheduleBuilder from './TermScheduleBuilder';
import MiniCourse from '../models/mini_course';
import AddCourse from './AddCourseToTerm';



const TermSchedule = () => {
  const [miniCourses, addCourses] = useState<MiniCourse[]>([]);
  const addCourseHandler = (course : string) => {
    //update existing course selections to include the new course
    const newMiniCourse = new MiniCourse(course);

    addCourses((existingCourses)=> {
      return existingCourses.concat(newMiniCourse);
    });
  };
  return (
    <div>
      <AddCourse onAddCourse={addCourseHandler}/>
      <TermScheduleBuilder courses ={miniCourses}/>

    </div>
  );
}

export default TermSchedule;