import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "./screens/home";
import "react-figma-plugin-ds/styles/figma-plugin-ds.min.css";
import "./ui.css";

declare function require(path: string): any;

const App = () => {
  const [currentPage, setCurrentPage] = React.useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
    }
  };

  return renderPage();
};

const rootElement = document.getElementById("react-page");
ReactDOM.render(<App />, rootElement);
