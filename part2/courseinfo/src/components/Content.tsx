import { PartType } from "../App";
import Part from "./Part";

type ContentProps = {
  parts: PartType[];
};

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

export default Content;
