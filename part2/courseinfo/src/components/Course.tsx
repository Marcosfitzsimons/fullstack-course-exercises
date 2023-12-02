import { CourseType } from "../App";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

type CourseProps = {
  course: CourseType;
};

const Course = ({ course }: CourseProps) => {
  return (
    <div>
      <Header course={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
