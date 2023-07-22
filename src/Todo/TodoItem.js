import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";

const styles = {
  li: {
    display: "flex",
    padding: ".5rem 1rem",
    margin: "10px 0",
    backgroundColor: "rgba(24, 21, 15, 0.9)",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "2px",
    border: "1px solid #fff",
    // fontFamily: "'Pacifico', cursive",
    fontSize: "18px",
  },
  checkbox: {
    marginRight: "1rem",
    outline: "none",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

function TodoItem({ todo, index, onChange }) {
  const [edit, setEdit] = React.useState(false);

  const { removeTodo } = useContext(Context);
  const { duplicateTodo } = useContext(Context);
  const { editTodo } = useContext(Context);

  const classes = [];

  function saveTodo(event) {
    event.preventDefault();
    editTodo(event.target.title.value, todo.id);
    setEdit(false);
  }

  if (todo.completed) {
    classes.push("done");
  }

  return (
    <li style={styles.li}>
      <span
        className={classes.join(" ")}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          style={styles.checkbox}
          onChange={() => onChange(todo.id)}
        />
        <span>{index + 1}.</span>
        &nbsp;
        {edit ? (
          <form style={styles.form} onSubmit={saveTodo}>
            <input name="title" defaultValue={todo.title} />
            <button type="submit" className="button">
              Edit
            </button>
          </form>
        ) : (
          <span onDoubleClick={() => setEdit(true)}>{todo.title}</span>
        )}
      </span>
      <div className="end">
        <button className="button" onClick={duplicateTodo.bind(null, todo.id)}>
          Duplicate
        </button>
        <button className="button" onClick={removeTodo.bind(null, todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
