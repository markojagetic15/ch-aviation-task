const OptionsForm = ({ handleChange, handleSubmit, handleDelete, hasError, options }) => {
  return (
      <>
        <form className="set-option" onSubmit={handleSubmit} >
          <h3>Set an option</h3>
          <input type="text" onChange={handleChange}></input>
          <span className={hasError ? "has-error" : ""}>
            Please add something into the input field
          </span>
          <button type="submit">Add option</button>
        </form>
        <ul className="admin-options">
            {options.map((element, index) => (
                <li key={index}>
                    {element}
                    <button onClick={() => {handleDelete(index)}}>X</button>
                </li>
            ))}
        </ul>
      </>
  );
};

export default OptionsForm;
