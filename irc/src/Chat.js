import React from 'react'
import './App.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Chat({ socket }) {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [receive, setReceive] = useState("");
    const [room, setRoom] = useState("général");

    const [tab, setTab] = useState("");

    let { name } = useParams();

    const [realName, setRealName] = useState("");

    let input = document.getElementById("inputs");


    const remove = (e) => {
        e.preventDefault()

        // console.log(document.querySelectorAll("#ulliste button"));

        document.querySelectorAll("#ulliste li").forEach((tab) => {
            tab.addEventListener("click", function () {

                let g = document.querySelector('[data-room="général"]')

                console.log(this.dataset.room);

                if (this.dataset.room !== "général") {

                    if (this.classList.contains("active")) {

                        g.classList.add("active")
                    }
                    this.style.display = "none"

                }

            });
        });
    }

    const modifRoom = (e) => {
        e.preventDefault()

        let ul = document.querySelector("#ulliste")

        // console.log(document.querySelector("#ulliste"));
        
        let nRoom = prompt("New room name:");

        if(nRoom){
            let li = document.createElement('li');
            let button = document.createElement('button')

            button.setAttribute("id", nRoom)
            // button.setAttribute("OnClick", )
            button.innerHTML = "X"
            button.onclick = remove

            li.setAttribute("data-room", nRoom)
            li.innerHTML = nRoom

            ul.appendChild(li)
            li.appendChild(button)



            document.querySelectorAll("#ulliste li").forEach((tab) => {
                console.log(tab.dataset.room);
                setTab(tab)

            });
        }
    }
    
    const navP = (e) => {
        e.preventDefault()
        navigate("/chat/" + name + "/setting")
    }

    const sendMessage = async (e) => {
        e.preventDefault()

        if (message && message !== "") {
            const Smessage = document.querySelector('#messages');
            let li = document.createElement('li');
            li.textContent = name + " : " + message
            Smessage.appendChild(li);
        }

        if (input.value) {
            const msg = {
                room: room,
                message: message,
                name: name
            }
            await socket.emit("send", msg)
            input.value = ""
        }
    }

    useEffect(() => {

        if (name) {
            socket.emit("enter_room", "général");
        }

    }, [name, socket])

    useEffect(() => {

        if (room) {
            const Smessage = document.querySelector('#messages');
            let li = document.createElement('li');
            li.textContent = "User " + name + " joined room : " + room;
            Smessage.appendChild(li);
        }

    }, [room, name])



    useEffect(() => {
        socket.on("receive", (msg) => {
            setReceive(msg.message)
            setRealName(msg.name)
        })
    }, [socket])


    useEffect(() => {
        if (receive) {
            const Smessage = document.querySelector('#messages');
            let li = document.createElement('li');
            li.textContent = realName + " : " + receive
            Smessage.appendChild(li);
        }
    }, [receive, realName])

    
    useEffect(() => {

        document.querySelectorAll("#ulliste li").forEach((tab) => {
            tab.addEventListener("click", function () {

                if (!this.classList.contains("active")) {

                    const actif = document.querySelector("#ulliste li.active");
                    actif.classList.remove("active");
                    this.classList.add("active");

                    const room = document.querySelector("#ulliste li.active").dataset.room

                    //   console.log(room);

                    setRoom(room);

                    socket.emit("leave_room", actif.dataset.room);

                    socket.emit("enter_room", this.dataset.room);

                }
            });
        });

    }, [socket, tab])

    return (
        <div id="body">

            <div id="divlist">
                <ul id="ulliste">
                    <li className="active" data-room="général">Général<button id='général' onClick={remove}>X</button></li>
                    <li data-room="activité">Activité <button id='activité' onClick={remove}>X</button></li>
                    <li data-room="questions">Questions<button id='questions' onClick={remove}>X</button></li>
                    <li data-room="ressources">Ressources<button id='ressources' onClick={remove}>X</button></li>
                </ul>

            </div>

            <div id="change">
                <button onClick={modifRoom}>Add room</button>
            </div>

            <ul id="messages"></ul>

            <form id="forme" action="">
                <button onClick={navP}>Setting</button><input id="inputs" autoComplete="off" onChange={(event) => { setMessage(event.target.value) }} /><button onClick={sendMessage}>Send</button>
            </form>

        </div>
    )
}
