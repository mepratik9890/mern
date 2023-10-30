import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Error from "./Components/Error";
import Signup from "./Components/Signup";
import Container from "./Components/Container";
import { DataProvider } from "../Context/DataContext";
import CartPage from "./Components/CartPage";
import OrderHistory from "./Components/OrderHistory";
import Header from "./Components/Header";
import axios from "axios";

axios.defaults.withCredentials= true

const App = () => {
  return (
    <>
      <DataProvider >
        <Header/>
        <Routes>
          <Route path='/' element={<Container />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/orderHistory/:userID' element={<OrderHistory/>} />
          <Route path='*' element={<Error />} />
        </Routes>
      </DataProvider>
    </>
  );
};
export default App;
