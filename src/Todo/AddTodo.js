import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ changeStateCloseButton }) {
  const { addTodo } = useContext(Context);

  const input = useInputValue("");

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      addTodo(input.value());
      input.clear();
      changeStateCloseButton();
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <p
        style={{
          margin: "10px 0px",
          fontSize: "20px",
          fontFamily: "'Abril Fatface', cursive",
        }}
      >
        Create Todo:
      </p>
      <input {...input.bind} />
      <button className="button" type="submit">
        Add Todo
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  addTodo: PropTypes.func,
};

export default AddTodo;
