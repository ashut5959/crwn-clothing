import "./form-input.styles.scss";
const FromInput = ({ label, ...otherValues }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherValues} />
      {label && (
        <label
          htmlFor={label}
          className={`${
            otherValues.value.length ? "srink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FromInput;
