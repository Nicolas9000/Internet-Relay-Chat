import React from 'react';
import io from 'socket.io-client';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";
import Chat from './Chat';
import Login from './Login';
import Setting from './Setting';

const socket = io.connect("http://localhost:3001")

function App() {
  
  return (
    <>
      <div>

        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/chat/:name" exact element={<Chat socket={socket}/>} />
            <Route path="/chat/:name/setting" exact element={<Setting />} />
          </Routes>
        </BrowserRouter>


      </div>


    </>

  );
}

export default App;
