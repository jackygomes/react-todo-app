import moment from "moment";
import { useEffect, useState } from "react";

const TodoMain = () => {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [updateTodoData, setUpdateTodoData] = useState("");

  const addTodoHandler = () => {
    const newTodoObject = {
      id: todos.length > 0 ? todos[0].id + 1 : 1,
      title: todoValue,
      date: moment().format("MMM Do YYYY, h:mm:ss a"),
      done: 1,
    };
    const todoTemp = [newTodoObject, ...todos];
    setTodos([newTodoObject, ...todos]);
    localStorage.setItem("todos", JSON.stringify(todoTemp));
    setTodoValue("");
  };

  const deleteTodo = (todoId) => {
    const tempTodos = todos;
    const todoFind = tempTodos.findIndex(({ id }) => id === todoId);

    tempTodos.splice(todoFind, 1);
    setTodos([...tempTodos]);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const editTodo = (todoId) => {
    setEdit(true);
    const todoFind = todos.find(({ id }) => id === todoId);

    setEditData(todoFind);
    setUpdateTodoData(todoFind.title);
  };

  const updateTodo = (todoId) => {
    const tempTodos = todos;
    const todoFind = tempTodos.find(({ id }) => id === todoId);

    todoFind.title = updateTodoData;
    setTodos([...tempTodos]);
    localStorage.setItem("todos", JSON.stringify(todos));
    setEdit(false);
  };

  const doneTodo = (todoId, status) => {
    const tempTodos = todos;

    const todoFind = tempTodos.find(({ id }) => id === todoId);

    todoFind.done = status;

    setTodos([...tempTodos]);
    localStorage.setItem("todos", JSON.stringify(tempTodos));
  };

  useEffect(() => {
    const todoObject = JSON.parse(localStorage.getItem("todos"));
    setTodos(todoObject);
  }, []);
  return (
    <div className="todo-main">
      <h1>What's your plan for today?</h1>
      {!edit && (
        <div>
          <div className="todo-form">
            <input
              type="text"
              placeholder="Type in your todo!"
              name="title"
              value={todoValue}
              className="todo-input"
              onInput={(e) => {
                setTodoValue(e.target.value);
              }}
            />
            <button className="todo-button" onClick={addTodoHandler}>
              Add Todo
            </button>
          </div>

          <div className="todo-list">
            {todos &&
              todos.map(
                (todo, index) =>
                  todo.done === 1 && (
                    <div className="todo-item" key={index}>
                      {/* {todo.done && <div className="overlay"></div>} */}
                      <input
                        type="checkbox"
                        onClick={() => doneTodo(todo.id, 2)}
                      />{" "}
                      In progress |&nbsp;
                      <input
                        type="checkbox"
                        onClick={() => doneTodo(todo.id, 3)}
                      />{" "}
                      Done |&nbsp;
                      {todo.title} | {todo.date}
                      <div className="todo-action">
                        <span onClick={() => editTodo(todo.id)}>edit</span>
                        <span onClick={() => deleteTodo(todo.id)}>delete</span>
                      </div>
                    </div>
                  )
              )}
          </div>

          <div className="todo-list">
            {todos &&
              todos.map(
                (todo, index) =>
                  todo.done === 2 && (
                    <div className="todo-item" key={index}>
                      {/* {todo.done && <div className="overlay"></div>} */}
                      <input
                        type="checkbox"
                        onClick={() => doneTodo(todo.id, 3)}
                      />{" "}
                      Done |&nbsp;
                      {todo.title} | {todo.date}
                      <div className="todo-action">
                        <span onClick={() => editTodo(todo.id)}>edit</span>
                        <span onClick={() => deleteTodo(todo.id)}>delete</span>
                      </div>
                    </div>
                  )
              )}
          </div>

          <div className="todo-list">
            {todos &&
              todos.map(
                (todo, index) =>
                  todo.done === 3 && (
                    <div className="todo-item" key={index}>
                      {/* {todo.done && <div className="overlay"></div>} */}
                      {todo.title} | {todo.date}
                      <div className="todo-action">
                        <span onClick={() => editTodo(todo.id)}>edit</span>
                        <span onClick={() => deleteTodo(todo.id)}>delete</span>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      )}
      {edit && (
        <div className="todo-edit">
          <input
            type="text"
            value={updateTodoData}
            className="todo-input"
            onInput={(e) => {
              setUpdateTodoData(e.target.value);
            }}
          />
          <button
            className="todo-button"
            onClick={() => updateTodo(editData.id)}
          >
            Update Todo
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoMain;
