import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import FormField from "./FormField";
import "../../css/common/ItemForm.css";

// Builds the start values of the form, e.g. { title: "", body: "" },
// or the values of the item that is edited.
function buildStartValues(fields, initialValues = {}) {
  return Object.fromEntries(fields.map((field) => [field.name, initialValues[field.name] ?? ""]));
}

// Removes spaces at the start and the end of every field (not of passwords).
function trimValues(fields, values) {
  return Object.fromEntries(
    fields.map((field) => {
      const value = values[field.name];
      return [field.name, field.type === "password" ? value : value.trim()];
    })
  );
}

function hasEmptyField(values) {
  return Object.values(values).some((value) => value === "");
}

function isSameValues(firstValues, secondValues) {
  return Object.keys(firstValues).every((fieldName) => firstValues[fieldName] === secondValues[fieldName]);
}

// One generic form for ALL the forms of the site: add / edit / login / register.
//
// fields        = which fields to show (see js/fields.js)
// initialValues = (only when editing) the current values of the item
// submitText    = the text of the submit button
// onSubmit(values) - saves. Returns true if it succeeded (then the form is cleared),
//                    or throws an Error - its message is shown in the form.
// onCancel      = (optional) shows a Cancel button. Escape also cancels.
// children      = (optional) a title / note above the fields
export default function ItemForm({
  fields,
  initialValues,
  submitText,
  onSubmit,
  onCancel,
  autoFocus = false,
  className = "",
  children,
}) {
  const startValues = buildStartValues(fields, initialValues);
  const [values, setValues] = useState(startValues);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && onCancel) onCancel();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedValues = trimValues(fields, values);

    if (hasEmptyField(trimmedValues)) {
      setFormError("Please fill in all the fields.");
      return;
    }

    // editing without changing anything - no need to go to the server
    if (initialValues && onCancel && isSameValues(trimmedValues, startValues)) {
      onCancel();
      return;
    }

    setFormError("");
    setIsSaving(true);
    try {
      const isSaved = await onSubmit(trimmedValues);
      if (isSaved) setValues(startValues);
    } catch (submitError) {
      setFormError(submitError.message);
    }
    setIsSaving(false);
  }

  const fieldElements = fields.map((field, fieldIndex) => (
    <FormField
      key={field.name}
      field={field}
      value={values[field.name]}
      onChange={handleChange}
      autoFocus={autoFocus && fieldIndex === 0}
    />
  ));

  const submitButtonText = isSaving ? "Please wait..." : submitText;

  return (
    <form className={`item-form ${className}`} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      {children}
      {fieldElements}
      <ErrorMessage message={formError} />
      <div className="form-buttons">
        <button type="submit" className="primary" disabled={isSaving}>
          {submitButtonText}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isSaving}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
