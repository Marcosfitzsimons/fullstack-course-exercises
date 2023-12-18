import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const selectFilter = (state) => state.filter;
const selectAnecdotes = (state) => state.anecdotes;

// Create a memoized selector to filter and sort anecdotes
const filteredAndSortedAnecdotes = createSelector(
  [selectFilter, selectAnecdotes],
  (filter, anecdotes) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
    if (filter) {
      return sortedAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return sortedAnecdotes;
    }
  }
);

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(filteredAndSortedAnecdotes);

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotification(`you voted ${anecdote.content}`, 5));
  };

  const anecdoteStyle = {
    marginBlock: "20px",
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} style={anecdoteStyle}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
