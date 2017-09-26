import ReactDOM from 'react-dom';
import Shell from 'shell';
import React from 'react';

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Shell />, document.querySelector("#shell"));
});
