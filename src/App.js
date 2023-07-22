import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
// import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

// const AddTodo = React.lazy(() => import("./Todo/AddTodo"));

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function duplicateTodo(id) {
    setTodos(
      todos.flatMap((todo) =>
        id === todo.id
          ? [todo, { ...todo, id: Math.max(...todos.map((e) => e.id)) + 1 }]
          : [todo]
      )
    );
  }

  function addTodo(title) {
    console.log("jjj");
    setTodos(todos.concat([{ title, id: Date.now(), completed: false }]));
  }

  function editTodo(value, id) {
    setTodos(
      todos.map((todo) => (id === todo.id ? { ...todo, title: value } : todo))
    );
  }

  return (
    <Context.Provider
      value={{
        removeTodo: removeTodo,
        duplicateTodo: duplicateTodo,
        editTodo: editTodo,
        addTodo: addTodo,
      }}
    >
      <div className="content_app">
        <h1>Todo List</h1>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}></React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No Todos!</p>
        )}
      </div>
      <div className="about_app">
        <h2>О приложении</h2>
        <p>
          <b>#</b> Данное приложение реализовано с помощью <b>JavaScript</b>
          -библиотеки – <b>React</b>, для хранения и редактирования списка
          задач. <br />
          <b>#</b> В ходе работы было реализовано:
          <br />
          <b>-загрузка данных с сервера</b> &#40;Использование хука{" "}
          <b>useEffect</b>, отправка <b>Fetch-запроса</b> на бесплатный онлайн{" "}
          <b>REST API</b> <b>– JSONPlaceholder</b>, сохранение данных в
          переменную состояния, использование хука <b>useState</b>&#41;;
          <br />
          <b>-возможность добавления новой задачи в список</b> &#40;Создано
          модальное окно, которое можно увидеть при нажатии на кнопку “Create
          Todo”. Модальное окно реализовано, как отдельный классовый компонент
          Modal, состоящий из кнопки “Create Todo” и функционального компонента
          AddTodo для добавления новой задачи. В компоненте AddTodo был
          реализован кастомный хук useInputValue для отслеживания изменения
          значения input в форме. Помимо элемента ввода, в форме есть кнопка,
          при начатии которой отрабатывает функция, переданная с помощью хука{" "}
          <b>useContext</b>. Сама функция находить в компоненте App, там же и
          находится переменная состояния списка задач. Функция добавляет новую
          задачу в переменную состояния&#41;;
          <br />
          <b>-отображение списка задач</b> &#40;Создание функционального
          компонента TodoList, передача пропсов с проверкой типов{" "}
          <b>PropTypes</b>&#41;;
          <br />
          <b>-отображение каждой задачи с необходимым функционалом</b>{" "}
          &#40;Создание функционального компонента TodoItem, передача пропсов с
          проверкой типов <b>PropTypes</b>. Компонент TodoItem состоит из
          checkbox, номера задачи, имени задачи и двумя кнопками для
          редактирования – Duplicate и Delete. Checkbox имеет функцию,
          переданную пропсами, которая отвечает за изменение данных об
          выполнении или невыполнений, той или иной задачи. Кнопка “Duplicate”
          имеют функцию, переданную с помощью хука <b>useContext</b>. Функция
          выполняет дублирование задачи, добавляя задачу сразу после выбранной
          для дублирования задачи. Кнопка “Delete” отвечает за удаление задачи
          из списка и выполняет функцию, переданную хуком <b>useContext</b>. Так
          же <b>при двойном клике</b> по выбранной задаче можно редактировать её
          значение. Появляется форма, состоящая из окна ввода и кнопки для
          сохранения изменений&#41;.
        </p>
      </div>
    </Context.Provider>
  );
}

export default App;
