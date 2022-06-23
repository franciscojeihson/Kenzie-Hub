import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes } from "./Routes";
import GlobalStyle from "./Styles/global";

export const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <GlobalStyle />
      <Routes />
    </>
  );
};
