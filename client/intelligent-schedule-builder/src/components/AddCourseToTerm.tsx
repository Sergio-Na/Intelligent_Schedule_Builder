//prompts the user to enter a course code and adds it
//Note: Currently the form waits for the entire code before querying, 
//but we can modify the form to listen to each keystroke if we want to provide drop down
//options (autocomplete) as they search for a course.
import {useRef} from 'react'

const AddCourse: React.FC<{onAddCourse : (course : string) => void}> = (props) => {
    const courseInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event : React.FormEvent) => {
        event.preventDefault();
        //Important: '!' instead of '?' because we are 100% sure that connection has been established, ie
        //input is not null
        const enteredCourse = courseInputRef.current!.value;
        //check to make sure input isn't empty
        if (enteredCourse.trim().length === 0){
            //we could throw an error here
            return;
        }
        props.onAddCourse(enteredCourse);
    }

    return (
        <form onSubmit={submitHandler}> 
            <label htmlFor='text'> Course ID</label>
            <input type = 'text' id = 'text' ref = {courseInputRef}/>
            <button>Add Course</button>
        </form>
    );

}

export default AddCourse