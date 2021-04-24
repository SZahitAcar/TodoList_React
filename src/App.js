import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  // State Parts
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Handlers
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  //Save Local Storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    let localTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(localTodos);
  };
  //UseEffects
  useEffect(() => {
    getLocalTodos();
  }, []);
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  return (
    <div className="App">
      <header>
        <h1>To Do App</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputText={inputText}
        setStatus={setStatus}
      ></Form>
      <List
        filteredTodos={filteredTodos}
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
      />
    </div>
  );
}

export default App;
