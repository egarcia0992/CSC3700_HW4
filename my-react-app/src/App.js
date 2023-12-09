import './App.css';
import NavBar from "./Components/NavBar";
import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home";
import Customers from "./Components/Customers";
import Products from "./Components/Products";
import Sales from "./Components/Sales";
import UpdateCustomer from "./Components/UpdateCustomer";
import InsertCustomer from "./Components/InsertCustomer";
import InsertProduct from "./Components/InsertProduct";
import EditC from "./Components/EditC";
// I will save you some time the update and deletes dont work :(
function App() {
  return (
    <div>
      <NavBar />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='customers' element={<Customers />}></Route>
            <Route path='products' element={<Products />}></Route>
            <Route path='sales' element={<Sales />}></Route>
            <Route path='update-c' element={<UpdateCustomer />}></Route>
            <Route path='insert-c' element={<InsertCustomer />}></Route>
            <Route path='insert-p' element={<InsertProduct />}></Route>
            <Route path='edit-c' element={<EditC />}></Route>
        </Routes>
    </div>
  );
}

export default App;
