import "./App.css";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import LayoutWrapper from "./layout";
import { Routes } from "./routes";
import Loader from "../src/components/Loader";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth } from "./components/Auth";

toast.configure();

const App = () => {
  const { loading } = useSelector((state) => state.public);

  return (
    <BrowserRouter>
      <ToastContainer />
      {(!loading && (
        <Auth>
          <LayoutWrapper>
            <Routes />
          </LayoutWrapper>
        </Auth>
      )) || <Loader />}
    </BrowserRouter>
  );
};

export default App;
