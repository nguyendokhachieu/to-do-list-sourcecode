import { useEffect, useState } from "react";

export default function TaskItem(props) {
  const [_task, setTask] = useState({});

  function handleOnDelete(t) {
    props.handleDelete(t);
  }

  function handleOnEdit(t) {
    props.handleEdit(t);
  }

  useEffect(() => {
    setTask(props.task);
  }, [props.task, _task]);

  return (
    <tr>
      <td className="text-center">{props.index}</td>
      <td className="text-center">{_task.name}</td>
      <td className="text-center">
        <span
          className={
            _task.level === 0
              ? "level-low"
              : _task.level === 1
              ? "level-medium"
              : "level-high"
          }
        >
          {_task.level === 0 ? "Low" : _task.level === 1 ? "Medium" : "High"}
        </span>
      </td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-warning"
          onClick={(e) => handleOnEdit(_task)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={(e) => handleOnDelete(_task)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
