import MiniCourse from "../../models/mini_course";
import Card from "react-bootstrap/Card";
import { SSRProvider } from "react-bootstrap";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';

const MiniCourseCard: React.FC<{ course: MiniCourse }> = (props) => {
  //TODO: Replace function body with how a mini course should appear on the schedule board

  return (
    <SSRProvider>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props.course.course_title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.course.faculty}
          </Card.Subtitle>
          <Card.Text>{props.course.overview}</Card.Text>
          <Card.Link href="#">View in Catalog</Card.Link>
        </Card.Body>
      </Card>
    </SSRProvider>
  );
};

export default MiniCourseCard;
