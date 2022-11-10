import {useEffect, useState} from "react";

const DropdownMenu = ({ options, isDeleted }) => {
  const [isDropDownOpen, setDropdownOpen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [selectedOption, setSelectedOption] = useState("Choose an option");
  const [availableOptions, setAvailableOptions] = useState(options);

  useEffect(() => {
    setAvailableOptions(options);
    if(isDeleted) {
      setIsActive("");
      setSelectedOption("Select an option");
    }
  }, [options, isDeleted])

  const handleClick = (key, name) => {
    setIsActive(name);
    setSelectedOption(name);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsActive("");
    setSelectedOption("Select an option");
    setDropdownOpen(true);
  };

  const handleClassAssign = (name) => {
    if (isActive === "") {
      return "";
    }

    return isActive === name ? "is-active" : "not-active";
  };

  const onSearch = (query) => {
    setDropdownOpen(true);

    setAvailableOptions(options.filter((e) => e.toLowerCase().includes(query.toLowerCase())));
  }

  return (
    <div className="dropdown-menu">
      <div className="search">
        <label>Search options</label>
        <input type="text" onChange={(e) => onSearch(e.target.value)}/>
      </div>
      <div
        className={isDropDownOpen ? "dropdown-button focus" : "dropdown-button"}
        onClick={() => setDropdownOpen(!isDropDownOpen)}
      >
        {selectedOption}
        <div
          onClick={isActive ? (e) => handleDelete(e) : null}
          className={isActive ? "delete" : ""}
        ></div>
      </div>
      {options.length === 0 ? (
        <ul
          className={isDropDownOpen ? "is-open" : ""}
          style={{ height: "auto" }}
        >
          <li>Add options</li>
        </ul>
      ) : (
        <ul
          className={isDropDownOpen ? "is-open" : ""}
          style={
            availableOptions.length <= 5
              ? { height: "auto", overflow: "auto" }
              : { height: "200px" }
          }
        >
          <li style={availableOptions.length !== 0 ? {"display": "none"} : {}}>There are no search results</li>
          {availableOptions.map((element, index) => (
            <li
              onClick={() => handleClick(index, element)}
              key={index}
              className={handleClassAssign(element)}
            >
              <label className="checkbox-container">
                {" "}
                {element}
                <input
                  type="checkbox"
                  checked={isActive === element && isActive !== ""}
                />
                <span className="checkmark"></span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
