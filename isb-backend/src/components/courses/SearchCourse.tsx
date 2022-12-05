import MiniCourseCard from "./MiniCourseCard";
import MiniCourse from "../../models/mini_course";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { SSRProvider } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchCourse: React.FC<{ onSearchCourse: (course: string) => void }> = (
  props
) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [enteredCourse, setEnteredCourse] = useState("");
  const searchCourseHandler = (event: React.FormEvent) => {
    event.preventDefault();
    //Important: '!' instead of '?' because we are 100% sure that connection has been established, ie
    //input is not null

    const enteredCourse = searchInputRef.current!.value;

    //check to make sure input isn't empty
    if (enteredCourse.trim().length === 0) {
      //we could throw an error here
      return;
    }
    props.onSearchCourse(enteredCourse);
  };
  const courseChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredCourse(event.target.value);
  };

  return (
    <SSRProvider>
      <Form onSubmit={searchCourseHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search For a course</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: COMP 250"
            value={enteredCourse}
            onChange={courseChangeHandler}
            ref={searchInputRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </SSRProvider>
  );
};
export default SearchCourse;
