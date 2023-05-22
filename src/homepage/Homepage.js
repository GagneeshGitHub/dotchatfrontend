import React from 'react'
import './home.css'
import InChatSection from './chatsection/InChatSection'
import InContactSection from './chatsection/InContactSection'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { io } from 'socket.io-client'
import dotChatLogo from '../assets/media/dotchatlogo.png'

let mySocket;

export default function Homepage() {

  const [allMessage,setAllMessage] = useState([]);

  // Setup the socket
  useEffect(()=>{
    mySocket = io("https://nodejsdotchatbackend.onrender.com")
    console.log(mySocket)
    var myUsername = localStorage.getItem('username')
    mySocket.on(myUsername,(data)=>{
      addMessage(data,"rec");
    })
  },[])

  //Adding the messag to the state
  const addMessage = (data,status)=>{
    let username = data.username
    let message = data.message
    let toAddMessage = [username,status,message]
    setAllMessage([...allMessage,toAddMessage])
    console.log("we are adding the recevied message.")
  }

  // State for storing the other username
  const [otherUsername, setOtherUsername] = useState("pooja222");

  //State for seding message using socket io

  const sendMessage = ()=>{
    console.log("SENT MESSAGE IS: ");
    var message = document.getElementById('inputedText').value;
    mySocket.emit("sendMessage",{
      otherUser: otherUsername,
      message
    })

    let toAddMsg = [otherUsername,"sent",message]

    setAllMessage([...allMessage,toAddMsg])
  }


  const navigate = useNavigate();

  // Exit the page if the ip is not saved in the server
  useEffect(()=>{
    console.log("We entered the login page");
    fetch('https://nodejsdotchatbackend.onrender.com/checklogin')
    .then(data=>data.json())
    .then(data=>{ 
      if(data.loggedin === false){
        navigate('/')
      }
     });
},[])

  const logoutPrompt = ()=>{
    let response = window.confirm("Do you really want to logout");
    if(response){
      fetch("https://nodejsdotchatbackend.onrender.com/logoutme").then(data=>navigate("/"));
    }
  }


  return (
    <div className='wholePageDiv'>
        <div className='upSection'>
          <div className='leftImageLogoSection'>
            <img className='dotChatLogo' src={dotChatLogo} alt="No Logo Yet!!" />
          </div>
          <div className='rightImageLogoSection'>
            <button id='logoutButton' onClick={()=>logoutPrompt()}>
              Logout
            </button>
          </div>
        </div>
        <div className='lowSection'>
            <div className='leftChatSection'>
                <InContactSection setOtherUsername={setOtherUsername}/>
                {/* Seding otherusername prop here */}
            </div>
            <div className='rightChatSection'>
                <InChatSection otherUsername={otherUsername} allMessage={allMessage} sendMessage={sendMessage} setAllMessage={setAllMessage}/>
            </div>
        </div>
    </div>
  )
}
