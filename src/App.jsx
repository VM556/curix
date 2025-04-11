import Nav from "./components/Nav";
import Main from "./components/Main";
import { useEffect } from "react";

export default function App() {
  //   useEffect(() => {
  //     document.documentElement.classList.add("light");
  //   }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <>
      <Nav />
      <Main />
    </>
  );
}
