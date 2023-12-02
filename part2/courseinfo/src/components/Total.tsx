import { PartType } from "../App";

type TotalProps = {
  parts: PartType[];
};

const Total = ({ parts }: TotalProps) => {
  const initialValue = 0;

  const getTotalExercises = (parts: PartType[]) => {
    const totalExercises = parts
      .map((part) => part.exercises)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
    return totalExercises;
  };

  return <p>Total of {getTotalExercises(parts)} exercises</p>;
};

export default Total;
