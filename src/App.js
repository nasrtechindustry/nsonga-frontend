
import {BrowserRouter as Router, Switch, Route, Redirect , useHistory} from "react-router-dom";
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
import Category from "./pages/category/category.js";
import Brand from "./pages/brands/brand.js";  
import Attributtes from "./pages/attributes/attributes";
import Products from "./pages/products/products.js";
import EditProduct from "./pages/products/EditProduct.js";
import SalesList from "./pages/sales/sales.js";
import Inventory from "./pages/Invetory/inventory";
import Reports from "./pages/reports";
import { useEffect, useState} from "react";
import {AuthProvider} from './components/auth/auth.js'
import PrivateRoute from './components/auth/PrivateRoute.js'
import NotFound from './components/notfound/NotFound.js'


/**
 * Main Application
 */
function App() {

  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'development') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
  

  

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
       return  checkAuth();
    }, []);

  return (
    <AuthProvider >
      <div className="App">
        <Router>
          <Switch>
            <Route 
              path="/sign-in" 
              exact 
              render={() => (isAuth ? <Redirect to="/dashboard" /> : <SignIn setAuth={setAuth}/>)}
            />
            <Route 
              path="/sign-up" 
              exact 
              render={() => (isAuth ? <Redirect to="/dashboard" /> : <SignUp setAuth={setAuth}/>)}
            />


            {isAuth ? (
              <Main>
                <Switch>
                  <Route exact path="/" render={() => (<Redirect to="/dashboard" />)}/>
                  <Route exact path="/dashboard" component={Home} />
                  <Route exact path="/category" component={Category} />
                  <Route exact path="/brands" component={Brand} />
                  <Route exact path="/attributes" component={Attributtes} />
                  <Route exact path="/products" component={Products} />
                  <Route path="/products/edit/:id" component={EditProduct} />
                  <Route exact path="/sales" component={SalesList} />
                  <Route exact path="/inventory" component={Inventory} />
                  <Route exact path="/reports" component={Reports} />
                  <Route exact path="/profile" component={Profile} />
                </Switch>
              </Main>
            ) : (
              <Redirect to="/sign-in" />
            )}

            <Route path="*" component={NotFound} /> 

          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
