import { Route, Switch } from "react-router-dom";

import Users from "src/pages/Users";
import UserPosts from "src/pages/Posts";
import Home from "src/pages/Home";
import UserTodos from "src/pages/Todos";
import UserForm from "src/pages/UserForm";
import PostForm from "src/pages/PostForm";
import Layout from "src/Layout";

import "src/App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Layout header={true} component={Home} {...routeProps} />
          )}
        />
        <Route exact path="/users" children={<Users />} />
        <Route exact path="/users/:id/posts" children={<UserPosts />} />
        <Route exact path="/users/:id/todos" children={<UserTodos />} />
        <Route exact path="/users/:id" children={<UserForm edit={true} />} />
        <Route exact path="/createuser" children={<UserForm edit={false} />} />
        <Route exact path="/users/:id/new_post" children={<PostForm />} />
      </Switch>
    </div>
  );
}

export default App;
