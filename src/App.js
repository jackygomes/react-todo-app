import "./App.css";
import TodoMain from "./components/TodoMain";
import { useEffect } from "react";

const App = () => {
  const initialState = [];

  useEffect(() => {
    const todoObject = localStorage.getItem("todos");
    if (!todoObject) {
      localStorage.setItem("todos", JSON.stringify(initialState));
    }
  }, []);

  return (
    <div className="App">
      <TodoMain />
    </div>
  );
};

export default App;
