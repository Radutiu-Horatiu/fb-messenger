import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";
import "./login-screen.css";

export default function LoginScreen({ setUser }) {
  let history = useHistory();

  const email = useRef(null);
  const password = useRef(null);

  const register = async () => {
    const myEmail = email.current.value;
    const myPassword = password.current.value;

    try {
      const responseFromAuth = await createUserWithEmailAndPassword(
        auth,
        myEmail,
        myPassword
      );

      const userId = responseFromAuth.user.uid;

      // saving to firestore
      await addDoc(collection(db, "users"), {
        email: myEmail,
        uid: userId,
      });

      // save user to localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: myEmail,
          uid: userId,
        })
      );

      // set user as active in app
      setUser({
        email: myEmail,
        uid: userId,
      });

      history.push("/chat");
    } catch (error) {
      alert(error);
    }
  };

  const login = async () => {
    const myEmail = email.current.value;
    const myPassword = password.current.value;

    try {
      const responseFromAuth = await signInWithEmailAndPassword(
        auth,
        myEmail,
        myPassword
      );

      const userId = responseFromAuth.user.uid;

      // save user to localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: myEmail,
          uid: userId,
        })
      );

      // set user as active in app
      setUser({
        email: myEmail,
        uid: userId,
      });

      history.push("/chat");
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    // get user from localstorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
      history.push("/chat");
    }
  }, [history, setUser]);

  return (
    <div className="login-screen-container">
      <p className="login-title">Welcome!</p>

      <div>
        <p>Email</p>
        <input placeholder="your.email@example.com" ref={email} />
      </div>

      <div>
        <p>Password</p>
        <input type="password" placeholder="Strong passowrd" ref={password} />
      </div>

      <button onClick={register} className="register-button">Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}
