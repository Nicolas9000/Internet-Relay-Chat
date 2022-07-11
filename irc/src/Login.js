import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
   
    const navigate = useNavigate();
    const [login, setLogin] = useState("");

    const submitLogin = (e) => {
        e.preventDefault();
        navigate("/chat/" + login)        
    }

    return (
        <div>
            <form id="form" action="">
                <div>
                    <label htmlFor='login'>Login : </label>
                    <input id="login" type="text" onChange={(event) => { setLogin(event.target.value); }} />
                </div>
                <div>
                    <button onClick={submitLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}
