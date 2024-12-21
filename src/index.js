
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import service worker registration

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// Register the service worker
serviceWorkerRegistration.register();

// Latest

// import React from "react";
// import ReactDOM from "react-dom/client"; // Note the change in import
// import App from "./App";

// // Create a root for your React application
// const root = ReactDOM.createRoot(document.getElementById("root"));

// // Render your App component into the root
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );