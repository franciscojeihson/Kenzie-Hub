import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Profile } from "../Pages/Profile";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";

export const Routes = () => {
  const [name, setName] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@KenzieHub:token");

    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Login name={name} setName={setName} auth={auth} setAuth={setAuth} />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/profile/:user">
        <Profile setName={setName} auth={auth} setAuth={setAuth} />
      </Route>
    </Switch>
  );
};
