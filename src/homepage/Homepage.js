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
    // mySocket = io("https://nodejsdotchatbackend.onrender.com")
    mySocket = io("http://localhost:8081")
    // console.log(mySocket)
    mySocket.on(localStorage.getItem('username'),(data)=>{
      // if(data.username===otherUsername){
      //     var outerDiv = document.createElement('div');
      //     var innDiv = document.createElement('div')
      //     innDiv.innerHTML = data.message;
      //     outerDiv.className = 'msgIs'
      //     innDiv.className = 'inMsgIs'
      //     outerDiv.appendChild(innDiv);
      //     document.getElementById('midChatSec').appendChild(outerDiv);
      // }
      addMessage(data,"rec");
    })
  },[])

  //Adding the message to the state
  const addMessage = (data,status)=>{
    // console.log("Before changing the value of array, array is: ", allMessage)
    let username = data.username
    let message = data.message
    let toAddMessage = [username,status,message]
    let prevArray = allMessage
    // console.log("Prev array is: ", allMessage)
    setAllMessage([...prevArray,toAddMessage]);
  }

  // useEffect(()=>{
  //   console.log("allMessage is changed.....");
  //   console.log(allMessage)
  // },[allMessage])

  // State for storing the other username
  const [otherUsername, setOtherUsername] = useState("pooja222");

  //State for seding message using socket io

  const sendMessage = ()=>{

    // console.log("SENT MESSAGE IS: ");
    var message = document.getElementById('inputedText').value;
    if(message===""){
      return;
    }
    mySocket.emit("sendMessage",{
      otherUser: otherUsername,
      message
    })
    // console.log("Sent message is: ", message)

    let toAddMsg = [otherUsername,"sent",message]

    setAllMessage([...allMessage,toAddMsg])
    document.getElementById('inputedText').value = "";
  }


  // Print allMessage function every 2 seconds to see where it is going wrong.
  // const disAllMess = setInterval(()=>{
  //   console.log("Every 2 seconds value of allMessage is: ", allMessage)
  // },2*1000)


  const navigate = useNavigate();

  //Remove previous message if any

  // Exit the page if the ip is not saved in the server
  useEffect(()=>{
    // console.log("We entered the login page");
    // fetch('https://nodejsdotchatbackend.onrender.com/checklogin')
    fetch('http://localhost:8081/checklogin')
    .then(data=>data.json())
    .then(data=>{ 
      if(data.loggedin === false){
        navigate('/')
      } else {
        localStorage.setItem('username',data.username);
      }
     });
},[])

  const logoutPrompt = ()=>{
    let response = window.confirm("Do you really want to logout");
    if(response){
      // fetch("https://nodejsdotchatbackend.onrender.com/logoutme")
      fetch("http://localhost:8081/logoutme")
      .then(data=>navigate("/"));
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
