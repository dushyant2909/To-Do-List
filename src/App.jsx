import { useEffect, useState } from 'react';
import { TodoContextProvider } from './context/index';
import { TodoForm, TodoItem, ThemeBtn } from './components'

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, settheme] = useState("dark");

  const addTodo = (todo) => {
    setTodos((oldtodos) => [{ id: Date.now(), ...todo }, ...oldtodos]);
    // setTodos(todo) then all prev todos will be lost.
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      )
    );
  }

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((currTodo) => currTodo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((currTodo) =>
        currTodo.id === id ? { ...currTodo, completed: !currTodo.completed } : currTodo
      )
    );
  }

  const lightTheme = () => {
    settheme("light");
  }
  const darkTheme = () => {
    settheme("dark");
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(theme)
  }, [theme])

  useEffect(() => {
    const fetchedTodos = localStorage.getItem("todos");
    if (fetchedTodos) {
      const storedTodos = JSON.parse(fetchedTodos)//all values stored in a string in localStorage
      if (storedTodos && storedTodos.length > 0) {
        setTodos(storedTodos);
      }
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete, theme, lightTheme, darkTheme }}>
      <div className="bg-sky-300 dark:bg-[#172842] min-h-screen py-5">
        <div className="flex justify-end px-4 md:px-8">
          <ThemeBtn />
        </div>
        <div className="md:w-full max-w-2xl md:mx-auto mx-2 shadow-lg rounded-lg px-4 py-3 dark:text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2 text-black dark:text-white">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
