import Part from "./Part";

export type PartType = {
  name: string;
  exercises: number;
};

type ContentProps = {
  parts: PartType[];
};

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;
