import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Category from "./pages/category";
import Brand from "./pages/brand";
import Attributes from "./pages/attributes";
import Products from "./pages/products";
import SalesList from "./pages/sales";
import Inventory from "./pages/inventory";
import Reports from "./pages/reports";
import { useEffect, useState } from "react";


/**
 * 
 * @returns Application redirection routes
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication token (or any other method to check logged-in status)
    const token = sessionStorage.getItem('token'); // or localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        
        <Main>
          <Route exact path="/dashboard">
            {isAuthenticated ? <Home /> : <Redirect to="/sign-in" />}
          </Route>
          <Route exact path="/category">
            {isAuthenticated ? <Category /> : <Redirect to="/sign-in" />}
          </Route>
          <Route exact path="/brands">
            {isAuthenticated ? <Brand /> : <Redirect to="/sign-in" />}
          </Route>
          <Route exact path="/attributes">
            {isAuthenticated ? <Attributes /> : <Redirect to="/sign-in" />}
          </Route>
          <Route exact path="/products">
            {isAuthenticated ? <Products /> : <Redirect to="/sign-in" />}
          </Route>
          <Route exact path="/sales">
            {isAuthenticated ? <SalesList /> : <Redirect to="/sign-in" />}
          </Route>
          <Route exact path="/inventory">
            {isAuthenticated ? <Inventory /> : <Redirect to="/sign-in" />}
          </Route>
          <Route exact path="/reports">
            {isAuthenticated ? <Reports /> : <Redirect to="/sign-in" />}
          </Route>
          <Redirect from="*" to={isAuthenticated ? "/dashboard" : "/sign-in"} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;