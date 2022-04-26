import { Route, Switch } from "react-router-dom";

import Users from "./pages/Users";
import UserPosts from "./pages/Posts";
import Home from "./pages/Home";
import UserTodos from "./pages/Todos";
import UserForm from "./pages/UserForm";
import PostForm from "./pages/PostForm";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Switch>
                <Route exact path="/" children={<Home />} />
                <Route exact path="/users" children={<Users />} />
                <Route exact path="/users/:id/posts" children={<UserPosts />} />
                <Route exact path="/users/:id/todos" children={<UserTodos />} />
                <Route
                    exact
                    path="/users/:id"
                    children={<UserForm edit={true} />}
                />
                <Route
                    exact
                    path="/createuser"
                    children={<UserForm edit={false} />}
                />
                <Route
                    exact
                    path="/users/:id/new_post"
                    children={<PostForm />}
                />
            </Switch>
        </div>
    );
}

export default App;
