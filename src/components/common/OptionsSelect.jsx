// A select box. options = [{ value, label }].
// onChange gets the chosen value (not the event).
export default function OptionsSelect({ options, value, onChange, label }) {
  function handleChange(event) {
    onChange(event.target.value);
  }

  const optionElements = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <select value={value} onChange={handleChange} aria-label={label}>
      {optionElements}
    </select>
  );
}
