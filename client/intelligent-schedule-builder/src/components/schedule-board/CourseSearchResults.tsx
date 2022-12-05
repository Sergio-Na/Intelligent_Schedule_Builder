import MiniCourse from "../../models/mini_course";

const MiniCourseCard: React.FC<{course : MiniCourse}> = (props) => {
    //TODO: Replace function body with how a mini course should appear on the schedule board

    return( 
        <div> 
        <h1> {props.course.course_title}</h1>
                <ul>
                    <li>{props.course.overview}</li>
                    <li>{props.course.credits}</li>
                    <li>{props.course.faculty}</li>
                </ul>
        </div>
    );
}


export default MiniCourseCard;
