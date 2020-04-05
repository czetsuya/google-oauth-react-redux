import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as AuthorizationAction from "./framework/redux/module/Authorization";

const GoogleAuth = ({ dispatch, isSignedIn, userId }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const params = {
      clientId:
        "182128277062-auesgdhfb7catfbav18nhenfe8oigekt.apps.googleusercontent.com",
      scope: "email",
    };

    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(
        AuthorizationAction.signIn(
          window.gapi.auth2.getAuthInstance().currentUser.get().getId()
        )
      );
    } else {
      dispatch(AuthorizationAction.signOut());
    }
  };

  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <div>
          <span>{userId}</span>
          <button onClick={onSignOutClick}>Signout</button>
        </div>
      );
    } else {
      return <button onClick={onSignInClick}>Sign In with Google</button>;
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(GoogleAuth);
