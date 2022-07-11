import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Setting() {

    const navigate = useNavigate();
    const [login, setLogin] = useState(""); 

    let {name} = useParams();

    const changeLogin = (e) => {
        e.preventDefault();
        if(login && login !== ""){
            navigate("/chat/" + login)
        }
        navigate("/chat/" + name)
    }

  return (
    <div>
        <form id="form" action="">
                <div>
                    <label htmlFor='login'>Change login : </label>
                    <input id="login" type="text" onChange={(event) => { setLogin(event.target.value); }} />
                </div>
                <div>
                    <button onClick={changeLogin}>Change login</button>
                </div>
            </form>
    </div>
  )
}
