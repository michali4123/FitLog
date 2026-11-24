import "../../css/common/ErrorMessage.css";

// A red error message. Shows nothing when there is no message.
export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="error-message">{message}</p>;
}
