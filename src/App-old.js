
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
import Attributtes from "./pages/attributes";
import Products from "./pages/products";
import SalesList from "./pages/sales";
import Inventory from "./pages/inventory";
import Reports from "./pages/reports";
import { useEffect, useState } from "react";


/**
 * Main Application
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
        <Route path="/sign-up" exact component={SignUp} />
        {/* <Route path="/sales" exact component={SalesList} /> */}
        <Main>
          {/* <Route exact path="/dashboard" component={Home} /> */}
          <Route exact path="/dashboard" component={Home}>
            {isAuthenticated ? <Home /> : <Redirect to="/sign-up" />}
          </Route>
          <Route exact path="/category" component={Category} />
          <Route exact path="/brands" component={Brand} />
          <Route exact path="/attributes" component={Attributtes} />
          <Route exact path="/products" component={Products} />
          <Redirect from="*" to="/dashboard" />
          <Route path="/sales" exact component={SalesList} />
          <Route path="/inventory" exact component={Inventory} />
          <Route path="/reports" exact component={Reports} />


        </Main>
      </Switch>
    </div>
  );
}

export default App;
