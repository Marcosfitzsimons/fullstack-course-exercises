type FilterProps = {
  setSearch: (e: string) => void;
};

const Filter = ({ setSearch }: FilterProps) => {
  return (
    <div className="">
      <label>Filter shown with</label>
      <input type="search" onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default Filter;
