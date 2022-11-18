import MiniCourse from "../models/mini_course";

const TermScheduleBuilder: React.FC<{courses : MiniCourse[]}> = (props) => {
    //TODO: Replace function body with how a mini course should appear on the schedule board

    return( 
        <ul>
        {props.courses.map((course) => (
            <li key={course.id}>{course.id} </li>
        ))}
        </ul>
    );
}


export default TermScheduleBuilder;
