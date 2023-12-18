import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnecdote } from "../requests";
import { useNotificationDispatch } from "../context/NotificationContext";

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes
          .filter((anecdote) => anecdote.id !== updatedAnecdote.id)
          .concat(updatedAnecdote)
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "SHOW", payload: `${anecdote.content} has been voted` });
    setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
