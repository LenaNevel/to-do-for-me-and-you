import React, { Component } from "react";

import "./index.css";
export default class CreateToDoList extends Component {
  render() {
    return (
      <div className="create-list">
        <div className="create-list-content">
          <span className="create-list-editor">TO DO</span>
          <span className="create-list-preview">for me and you</span>
        </div>
      </div>
    );
  }
}
