import React from "react";
import "./Togglebutton.css";

export default function Btn() {
  return (
    <div>
      <label class="switch">
        <input class="switch-input" type="checkbox" />
        <span class="switch-label" data-on="Yes" data-off="No"></span>
        <span class="switch-handle"></span>
      </label>
    </div>
  );
}
