import React from "react";
import { Switch } from "react-router-dom";

import Users from "src/pages/Users";
import UserPosts from "src/pages/Posts";
import Home from "src/pages/Home";
import UserTodos from "src/pages/Todos";
import UserForm from "src/pages/UserForm";
import PostForm from "src/pages/PostForm";
import Layout from "src/components/Layout";
import NotFound from "src/pages/404";

const App: React.FC = () => {
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
          render={() => <UserForm edit={true} />}
          exact
          path="/users/:id"
        />
        <Layout
          header={true}
          render={() => <UserForm edit={false} />}
          exact
          path="/createuser"
        />
        <Layout
          header={true}
          render={() => <PostForm />}
          exact
          path="/users/:id/new_post"
        />
        <Layout header={true} render={() => <NotFound />} path="*" />
      </Switch>
    </div>
  );
};

export default App;
