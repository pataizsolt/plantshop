import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Profile from "./components/profile/profile.component";
import User from "./components/profile/user.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helper/history";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Knowledgefactory
            </Link>
            <div className="navbar-nav mr-auto">

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    Resource
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link"
                    onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route exact path={["/", "/register"]} component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/user" component={User} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
