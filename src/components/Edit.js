const Edit = () => {
  return (
    <div className="todo-edit">
      <input
        type="text"
        placeholder="Add a todo"
        name="title"
        value=""
        className="todo-input"
      />
      <button className="todo-button">Update Todo</button>
    </div>
  );
};

export default Edit;
