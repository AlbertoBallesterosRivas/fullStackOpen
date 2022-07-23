import "./index.css";

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage !== null) {
    return <div className="success">{successMessage}</div>;
  } else if (errorMessage !== null) {
    return <div className="error">{errorMessage}</div>;
  }

  return null;
};

export default Notification;
