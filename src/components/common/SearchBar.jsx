import OptionsSelect from "./OptionsSelect";
import "../../css/common/SearchBar.css";

// The search of a list: which field to search by + what to search.
// search        = the result of useSearch()
// searchOptions = the fields to search by. A field with "choices" (like Status)
//                 shows a select instead of a text box.
export default function SearchBar({ search, searchOptions }) {
  const chosenOption = searchOptions.find((option) => option.value === search.field);

  function handleQueryChange(event) {
    search.setQuery(event.target.value);
  }

  const queryElement = chosenOption.choices ? (
    <OptionsSelect
      options={chosenOption.choices}
      value={search.query}
      onChange={search.setQuery}
      label={chosenOption.label}
    />
  ) : (
    <input type="search" placeholder="Search..." value={search.query} onChange={handleQueryChange} />
  );

  return (
    <div className="search-bar">
      <OptionsSelect
        options={searchOptions}
        value={search.field}
        onChange={search.setField}
        label="Search by"
      />
      {queryElement}
    </div>
  );
}
