type PersonFormProps = {
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setNumber: (e: string) => void;
  setNewName: (e: string) => void;
};

const PersonForm = ({
  handleOnSubmit,
  setNumber,
  setNewName,
}: PersonFormProps) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        name: <input type="text" onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
