import { Switch, Route } from "react-router-dom";
import Login from "./Auth/Login";
// import Dashboard from "./Pages/Dashboard";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Drawer from "./components/Drawer";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("LocalToken") ? <Drawer /> : <Login />
          }
        />
        <Route exact path="/dashboard" component={Drawer} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
