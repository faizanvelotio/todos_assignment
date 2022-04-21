import { Route, Switch } from "react-router-dom";

import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Home from "./pages/Home";

import "./App.css";
import UserTodos from "./pages/Todos";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:id/posts">
          <Posts />
        </Route>
      </Switch>
      <Route exact path="/users/:id/todos">
        <UserTodos />
      </Route>
    </div>
  );
}

export default App;
