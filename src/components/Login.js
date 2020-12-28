import React, { useState } from "react";
import "./Login.css";

import { useStateValue } from "../StateProvider";
import { auth, provider } from "../firebase";

import { Button } from "@material-ui/core";
import { actionTypes } from "../reducer";

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login_container">
                <img
                    src="https://whatsappbrand.com/wp-content/themes/whatsapp-brc/images/WhatsApp_Logo_6.png"
                    alt=""
                />
                <div className="login_text">
                    <h1>Sign In to WhatsApp-clone</h1>
                </div>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    );
}

export default Login;
