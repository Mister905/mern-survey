import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
/* Here are the requirements for our PrivateRoute component.

It has the same API as <Route />.
It renders a <Route /> and passes all the props through to it.
It checks if the user is authenticated, if they are, it renders the “component” prop. If not, it redirects the user to /login. */
const PrivateRoute = ({
  component: Component,
  auth: { current_user, loading_user },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !current_user && !loading_user ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
