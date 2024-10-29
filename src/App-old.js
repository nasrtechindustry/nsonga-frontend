
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
import {AuthProvider} from './components/auth/auth.js'


/**
 * Main Application
 */
function App() {
  const [isAuth, setAuth] = useState(false);

  const getItemAsync = (key) => {
      return new Promise((resolve) => {
          const value = localStorage.getItem(key);
          resolve(value);
      });
  };

  useEffect(() => {
    const checkAuth = async () => {
        const token = await getItemAsync('nsonga-auth-token');
        if (token) {
            setAuth(true);
        }
    };
        checkAuth();
    }, []);

  return (
    <AuthProvider >
    <div className="App">
      <Router >
      <Switch>

        <Route 
          path="/sign-in" 
          exact 
          render={() => {
            return isAuth ? <Redirect to="/dashboard" /> : <SignIn />
          }}/>
        <Route path="/sign-up" exact component={SignUp} />

        <Main> 

          <Route 
            exact 
            path="/dashboard"  
            render={() => {
              return isAuth ? <Home />  : <Redirect to="/sign-in" />
            }}
          />
          <Route exact path="/category" component={Category} />
          <Route exact path="/brands" component={Brand} />
          <Route exact path="/attributes" component={Attributtes} />
          <Route exact path="/products" component={Products} />
          <Route path="/sales" exact component={SalesList} />
          <Route path="/inventory" exact component={Inventory} />
          <Route path="/reports" exact component={Reports} />

        </Main>
        {/* <Route path="*" exact component={SignIn} /> */}

      </Switch>

      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
