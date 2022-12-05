import SearchCourse from "./SearchCourse";
import MiniCourseCard from "../schedule-board/CourseSearchResults";

const DisplaySearchResults = () => {
    const searchCourseHandler = (course_title: string) => {
        
    };
    return (
    <div>
        <SearchCourse onSearchCourse = {searchCourseHandler}/>
    </div>);
}

export default DisplaySearchResults;