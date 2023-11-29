import { useState } from "react";

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

type AnecdoteMostVotedProps = {
  highestVotes: number;
  winningAnecdote: string;
};

type AnecdoteOfDayProps = {
  anecdote: string;
  votes: number;
};

const AnecdoteOfDay = ({ anecdote, votes }: AnecdoteOfDayProps) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const AnecdoteMostVoted = ({
  highestVotes,
  winningAnecdote,
}: AnecdoteMostVotedProps) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      {winningAnecdote}
      <p>has {highestVotes} votes</p>
    </>
  );
};

const Button = ({ text, handleClick }: ButtonProps) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const handleNextAnecdote = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePoints = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const highestVotes = Math.max(...votes);
  const winningAnecdote = anecdotes[votes.indexOf(highestVotes)];

  return (
    <div>
      <AnecdoteOfDay anecdote={anecdotes[selected]} votes={votes[selected]} />
      <div className="">
        <Button handleClick={handlePoints} text="vote" />
        <Button
          handleClick={() =>
            setSelected(handleNextAnecdote(0, anecdotes.length - 1))
          }
          text="next anecdote"
        />
      </div>
      <AnecdoteMostVoted
        winningAnecdote={winningAnecdote}
        highestVotes={highestVotes}
      />
    </div>
  );
};

export default App;
