import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import ShopProvider from './context/shopContext'

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import AllProduct from './pages/AllProducts'
import CollectionPage from './pages/CollectionPage'
import ThankYou from './pages/ThankYou';


const App = () => {
  return (
    <ShopProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route> 
            <Route  path="/products" exact>
              <AllProduct />
            </Route>
            <Route path="/product/:id" exact>
              <ProductPage />
            </Route>
            <Route path="/collection/:id" exact>
              <CollectionPage />
            </Route>
            <Route path="/thank-you" exact>
                <ThankYou />
            </Route>
          </Switch>
        </Router>
    </ShopProvider>
  );
}

export default App;
