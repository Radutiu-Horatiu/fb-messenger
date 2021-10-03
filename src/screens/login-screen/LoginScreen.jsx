import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";

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
      console.log(error);
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
      console.log(error);
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
    <div>
      <p>Login Screen</p>

      <div>
        <p>Email</p>
        <input ref={email} />
      </div>

      <div>
        <p>Password</p>
        <input type="password" ref={password} />
      </div>

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}
