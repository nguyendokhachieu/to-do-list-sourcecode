export default function AddTaskButton(props) {
  function handleToggleAddForm() {
    props.handleToggleAddForm();
  }

  let innerText = props.isAddFormShowed ? "Close" : "Add a new task";

  return (
    <button
      type="button"
      className="btn btn-info btn-block"
      onClick={handleToggleAddForm}
    >
      {innerText}
    </button>
  );
}
