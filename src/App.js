import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import OptionsForm from "./OptionsForm";

const App = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [hasError, serError] = useState(false);
  const [isDeleted, setDeleted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedOption === "") {
      serError(true);
      return;
    }
    serError(false);
    setOptions((options) => [...options, selectedOption]);
    e.target.reset();
    setSelectedOption("");
  };

  const handleDelete = (index) => {
    let array = [...options];
    if(index > -1) {
      array.splice(index, 1)
      setOptions(array)
    }
    setDeleted(true);
  }

  return (
    <div className="App">
      <div className="main-container">
        <div>
          <h3>Choose an option</h3>
          <DropdownMenu availableOptions={options} isDeleted={isDeleted}/>
        </div>
        <OptionsForm
          handleChange={(e) => setSelectedOption(e.target.value)}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          hasError={hasError}
          options={options}
        />
      </div>
    </div>
  );
};

export default App;
