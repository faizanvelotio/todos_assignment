import { Switch } from "react-router-dom";

import Users from "src/pages/Users";
import UserPosts from "src/pages/Posts";
import Home from "src/pages/Home";
import UserTodos from "src/pages/Todos";
import UserForm from "src/pages/UserForm";
import PostForm from "src/pages/PostForm";
import Layout from "src/components/Layout";

import "src/App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Layout header={true} render={() => <Home />} exact path="/" />
        <Layout header={true} render={() => <Users />} exact path="/users" />
        <Layout
          header={true}
          render={() => <UserPosts />}
          exact
          path="/users/:id/posts"
        />
        <Layout
          header={true}
          render={() => <UserTodos />}
          exact
          path="/users/:id/todos"
        />
        <Layout
          header={true}
          render={() => <UserForm edit={false} />}
          exact
          path="/users/:id"
        />
        <Layout
          header={true}
          render={() => <UserForm edit={true} />}
          exact
          path="/createuser"
        />
        <Layout
          header={true}
          render={() => <PostForm />}
          exact
          path="/users/:id/new_post"
        />
      </Switch>
    </div>
  );
}

export default App;
