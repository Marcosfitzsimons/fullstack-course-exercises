import { useDispatch } from "react-redux";

const SearchFilter = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch({ type: "filter/handleSearchFilter", payload: e.target.value });
  };
  return (
    <div>
      Filter <input type="text" onChange={handleOnChange} />
    </div>
  );
};

export default SearchFilter;
