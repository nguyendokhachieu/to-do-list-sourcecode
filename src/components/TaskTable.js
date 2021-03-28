import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { orderBy } from "lodash";

export default function TaskTable(props) {
  const [tasks, setTasks] = useState([]);
  const [filterLevel, setFilterLevel] = useState(-1);

  useEffect(() => {
    setTasks(props.taskList);
  }, [props.taskList]);

  let newTaskList = [];
  if (props.searchString === "") {
    newTaskList = tasks;
  } else {
    tasks.forEach((task) => {
      if (task.name.indexOf(props.searchString) !== -1) {
        newTaskList.push(task);
      }
    });
  }

  newTaskList = orderBy(newTaskList, [props.sort.by], [props.sort.dir]);

  function handleDelete(t) {
    props.handleDelete(t);
  }

  function handleEdit(t) {
    props.handleEdit(t);
  }

  function handleOnFilterChange(e) {
    setFilterLevel(Number(e.target.value));
  }

  let _newTaskList = newTaskList.filter((value) => {
    if (filterLevel === -1) return true;
    else {
      return value.level === filterLevel;
    }
  });

  let taskItems = null;
  if (_newTaskList.length !== 0) {
    taskItems = _newTaskList.map((task, index) => {
      return (
        <TaskItem
          task={task}
          index={index + 1}
          key={index}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      );
    });
  }

  return (
    <table className="table table-hover ">
      <thead>
        <tr>
          <th className="text-center" style={{ width: "10%" }}>
            #
          </th>
          <th className="text-center">Task</th>
          <th className="text-center" style={{ width: "20%" }}>
            Level
          </th>
          <th className="text-center" style={{ width: "20%" }}>
            Action
          </th>
        </tr>
        <tr>
          <th className="text-center" style={{ width: "10%" }}></th>
          <th className="text-center"></th>
          <th className="text-center" style={{ width: "20%" }}>
            <select
              value={filterLevel}
              name="filter"
              id="filter"
              className="form-control"
              onChange={handleOnFilterChange}
            >
              <option value={-1}>All</option>
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
          </th>
          <th className="text-center" style={{ width: "20%" }}></th>
        </tr>
      </thead>
      <tbody>{taskItems}</tbody>
    </table>
  );
}
