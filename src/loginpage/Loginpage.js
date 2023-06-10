import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import dotImage from '../assets/media/dotchatlogo.png'
import submitBtn from '../assets/media/submitbtn.png'

import './loginpage.css'

export default function Loginpage() {
    const navigate = useNavigate();
    
    const resetInputValues = ()=>{
      document.getElementById("usernameid").value = "";
      document.getElementById("passwordid").value = "";
    }

    // Function to call after login
    const submitFn = ()=> {
      let username = document.getElementById("usernameid").value;
      let password = document.getElementById("passwordid").value;
      
      let data = {
        username,
        password
      }

      let context = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username,password})
      }

      fetch("https://nodejsdotchatbackend.onrender.com/login",context)
      // fetch("http://localhost:8081/login",context)
      .then(data=>data.json())
      .then(data=>{
        console.log("Login sucess ",data.loginSuccess)
        if(data.loginSuccess===true){
          navigate("/chat")
          localStorage.setItem('username',username)
        } else {
          resetInputValues()
        }
      })

    }

    useEffect(()=>{
        fetch('https://nodejsdotchatbackend.onrender.com/checklogin')
        // fetch('http://localhost:8081/checklogin')
        .then(data=>data.json())
        .then(data=>{ 
          if(data.loggedin == true){
            localStorage.setItem('username',data.username)
            navigate('/chat')
          }
         });
    },[])

  return (
    <div className="loginPage">
      <div className='upperLoginSection'>
        <div className="dotLogo">
          <img className="dotImage" src={dotImage} alt="Unable to load the image" />
        </div>
      </div>
      <div className='lowerLoginSection'>

        {/* Making the login box */}
        <div className="loginBox">
          <div className='inLoginBox'>
          <input id='usernameid' className='inputLoginField' type="text" />
          <input id='passwordid' className='inputLoginField' type="password" />
          <div className='loginBtnDiv'>
            <img className='submitBtn' onClick={()=>submitFn()} src={submitBtn} alt="Unable to load the image" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
