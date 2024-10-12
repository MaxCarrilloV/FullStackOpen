import { CoursePart } from "../App";
import Part from "./Part";
const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {courses.map((part) => {
        return (
          <div key={part.name}>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};
export default Content;
