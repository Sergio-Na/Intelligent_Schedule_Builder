import SearchCourse from "./SearchCourse";
import MiniCourseCard from "./MiniCourseCard"

const DisplaySearchResults = () => {
    const searchCourseHandler = (course_title: string) => {
        
    };
    return (
    <div>
        <SearchCourse onSearchCourse = {searchCourseHandler}/>
    </div>);
}

export default DisplaySearchResults;