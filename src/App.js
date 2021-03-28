import { useState } from "react";
import AddForm from "./components/AddForm";
import AddTaskButton from "./components/AddTaskButton";
import Header from "./components/Header";
import Search from "./components/Search";
import Sort from "./components/Sort";
import TaskTable from "./components/TaskTable";
import "./css/bootstrap.min.css";
import "./css/style.css";

function App() {
  if (!JSON.parse(localStorage.getItem("localStorageTasks"))) {
    localStorage.setItem("localStorageTasks", JSON.stringify([]));
  }
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("localStorageTasks"))
  );
  const [searchString, setSearchString] = useState("");
  const [isAddFormShowed, toggleIsAddFormShowed] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: 0,
    name: "",
    level: 0,
  });
  const [sort, setSort] = useState({
    by: "name",
    dir: "asc",
  });

  function handleAddTask(task) {
    taskList.push(task);
    setTaskList([...taskList]);
    localStorage.setItem("localStorageTasks", JSON.stringify([...taskList]));
  }

  function handleSearch(searchStr) {
    setSearchString(searchStr);
  }

  function handleOnSortChange(sort) {
    setSort(sort);
  }

  function handleToggleAddForm() {
    toggleIsAddFormShowed(!isAddFormShowed);
  }

  function handleDelete(t) {
    taskList.forEach((task, index) => {
      if (task.id === t.id) {
        taskList.splice(index, 1);
      }
    });
    setTaskList([...taskList]);
    localStorage.setItem("localStorageTasks", JSON.stringify([...taskList]));
  }

  function handleEdit(t) {
    setEditedTask(t);
    toggleIsAddFormShowed(true);
  }

  function handleOnEditedTask(_editedTask) {
    setEditedTask(_editedTask);
    taskList.forEach((task) => {
      if (task.id === _editedTask.id) {
        task.name = _editedTask.name;
        task.level = _editedTask.level;

        setTaskList([...taskList]);
        localStorage.setItem(
          "localStorageTasks",
          JSON.stringify([...taskList])
        );
      }
    });
  }

  return (
    <div className="container">
      <Header />
      <div className="row tools">
        <Search handleSearch={handleSearch} />
        <Sort handleOnSortChange={handleOnSortChange} />
        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
          <AddTaskButton
            handleToggleAddForm={handleToggleAddForm}
            isAddFormShowed={isAddFormShowed}
          />
          <AddForm
            handleAddTask={handleAddTask}
            editedTask={editedTask}
            handleOnEditedTask={handleOnEditedTask}
            handleToggleAddForm={handleToggleAddForm}
            isAddFormShowed={isAddFormShowed}
          />
        </div>
      </div>
      <div className="panel panel-success">
        <div className="panel-heading">List Task</div>
        <TaskTable
          taskList={taskList}
          searchString={searchString}
          sort={sort}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
