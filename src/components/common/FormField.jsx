// One field of ItemForm: an input or a textarea, with a label above it if the field has one.
export default function FormField({ field, value, onChange, autoFocus }) {
  const inputProps = {
    name: field.name,
    value,
    onChange,
    autoFocus,
    placeholder: field.placeholder,
    "aria-label": field.label ? undefined : field.placeholder, // for screen readers
  };

  const inputElement = field.isMultiline ? (
    <textarea {...inputProps} rows={field.rows} />
  ) : (
    <input {...inputProps} type={field.type ?? "text"} />
  );

  if (!field.label) return inputElement;

  return (
    <label>
      {field.label}
      {inputElement}
    </label>
  );
}
