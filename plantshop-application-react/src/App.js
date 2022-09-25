import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
