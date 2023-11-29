import { useState } from "react";

type StatisticsProps = {
  good: number;
  neutral: number;
  bad: number;
};

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

type StatisticProps = {
  text: string;
  value: number;
};

const Button = ({ text, handleClick }: ButtonProps) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }: StatisticProps) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }: StatisticsProps) => {
  const calculateAverage = () => {
    const totalCount = good + neutral + bad;
    const totalScore = good * 1 + neutral * 0 + bad * -1;

    if (totalCount === 0) {
      return 0; // Avoid division by zero
    }

    return totalScore / totalCount;
  };

  const calculatePositive = () => {
    const totalCount = good + neutral + bad;
    return (100 * good) / totalCount;
  };

  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>;

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="average" value={calculateAverage()} />
          <StatisticsLine text="positive" value={calculatePositive()} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood((prev) => prev + 1)} text="good" />
      <Button
        handleClick={() => setNeutral((prev) => prev + 1)}
        text="neutral"
      />
      <Button handleClick={() => setBad((prev) => prev + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
