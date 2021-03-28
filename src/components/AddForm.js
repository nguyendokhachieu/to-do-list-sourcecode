import { useEffect, useState } from "react";

export default function AddForm(props) {
  const [inputText, setInputText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [isEdited, setIsEdited] = useState(false);

  function handleOnInputTextChange(e) {
    setInputText(e.target.value);
  }

  function handleOnSelectedLevelChange(e) {
    setSelectedLevel(Number(e.target.value));
  }

  function handleOnAddClick(e) {
    let alert = document.getElementsByClassName("alert");
    if (!inputText) {
      alert[0].classList.remove("display-none");
    } else {
      alert[0].classList.add("display-none");

      if (isEdited === false) {
        // add a new task
        let task = {
          id: Math.ceil(Math.random() * 69696969),
          name: inputText,
          level: selectedLevel,
        };
        props.handleAddTask(task);

        setInputText("");
        setSelectedLevel(0);
        props.handleToggleAddForm();
      } else {
        // edit a current task
        setIsEdited(false);

        let _editedTask = {
          id: props.editedTask.id,
          name: inputText,
          level: selectedLevel,
        };
        props.handleOnEditedTask(_editedTask);

        setInputText("");
        setSelectedLevel(0);
        props.handleToggleAddForm();
      }
    }
  }

  function handleOnCancelClick() {
    props.handleToggleAddForm();
    setIsEdited(false);
    setInputText("");
    setSelectedLevel(0);
  }

  useEffect(() => {
    if (props.editedTask.name !== "") {
      setIsEdited(true);
      setInputText(props.editedTask.name);
      setSelectedLevel(props.editedTask.level);
    } else {
      setIsEdited(false);
    }
  }, [props.editedTask]);

  let addFormClassName = props.isAddFormShowed ? "" : "display-none";

  return (
    <div className={`add-form ${addFormClassName}`}>
      <input
        type="text"
        name="input"
        id="input"
        className="form-control"
        placeholder="Your task ..."
        onChange={handleOnInputTextChange}
        value={inputText}
      />
      <select
        value={selectedLevel}
        name="select"
        id="select"
        className="form-control"
        onChange={handleOnSelectedLevelChange}
      >
        <option value={0}>Low</option>
        <option value={1}>Medium</option>
        <option value={2}>High</option>
      </select>
      <div className="add-form-btn">
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleOnAddClick}
        >
          {isEdited ? "Update this task" : "Add"}
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={handleOnCancelClick}
        >
          Cancel
        </button>
      </div>
      <div className="alert display-none">Please fill your task ...</div>
    </div>
  );
}
