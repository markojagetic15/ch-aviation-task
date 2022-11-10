import {useEffect, useState} from "react";

const DropdownMenu = ({availableOptions, isDeleted}) => {
  const [isDropDownOpen, setDropdownOpen] = useState(false);
  // It would be better to handle elements as {key,value}, but I didn't have the time to rewrite
  const [isActive, setIsActive] = useState("");
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Choose an option");

  useEffect(() => {
    if (isDeleted) {
      setIsActive("");
      setSelectedOption("Select an option");
    }
  }, [availableOptions, isDeleted])

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

  const extractActiveClassName = (name) => {
    if (isActive === "") {
      return "";
    }

    return isActive === name ? "is-active" : "not-active";
  };

  let options = availableOptions || [];
  if (query) {
    options = options.filter((e) => e.toLowerCase().includes(query.toLowerCase()));
  }

  return (
      <div className="dropdown-menu">
        <div className="search">
          <label>Search options</label>
          <input type="text" onChange={(e) => setQuery(e.target.value)}/>
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
                style={{height: "auto"}}
            >
              <li>{!query ? "Add options" : "There are no search results"}</li>
            </ul>
        ) : (
            <ul
                className={isDropDownOpen ? "is-open" : ""}
                style={
                  options.length <= 5
                      ? {height: "auto", overflow: "auto"}
                      : {height: "200px"}
                }
            >
              {options.map((element, index) => (
                  <li
                      onClick={() => handleClick(index, element)}
                      key={index}
                      className={extractActiveClassName(element)}
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