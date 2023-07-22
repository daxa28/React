import React from "react";
import "./Modal.css";
import AddTodo from "../Todo/AddTodo";

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  };
  changeStateCloseButton = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          Create Todo
        </button>

        {this.state.isOpen && (
          <div
            className="modal"
            onClick={() => this.setState({ isOpen: false })}
          >
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
              <AddTodo changeStateCloseButton={this.changeStateCloseButton} />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
