import React, { useEffect } from 'react'
import './chatcss.css'
import profileImg from '../../assets/media/girlFirst.png' 

export default function InChatSection({sendMessage,otherUsername,allMessage}) {

  useEffect(()=>{
    var elementOther = Array.from(document.getElementsByClassName('msgIs'))
    var elementMy = Array.from(document.getElementsByClassName('msgIsCurrUser'))
    elementMy.map((element)=>{
      element.remove()
    })
    elementOther.map((element)=>{
      element.remove()
    })

    allMessage.map((arrElem)=>{
      console.log("We are inside the all message of the received message.")
      if(arrElem[0]===otherUsername){
        console.log("We have got a message from other user")
        if(arrElem[1]==="rec"){
          var outerDiv = document.createElement('div');
          var innDiv = document.createElement('div')
          innDiv.innerHTML = arrElem[2];
          outerDiv.className = 'msgIs'
          innDiv.className = 'inMsgIs'
          outerDiv.appendChild(innDiv);
          document.getElementById('midChatSec').appendChild(outerDiv);
        } else {
          var outerDiv = document.createElement('div');
          var innDiv = document.createElement('div')
          innDiv.innerHTML = arrElem[2];
          outerDiv.className = 'msgIsCurrUser'
          innDiv.className = 'inMsgIsCurrUser'
          outerDiv.appendChild(innDiv);
          document.getElementById('midChatSec').appendChild(outerDiv);
        }
      }
    })
  })

  return (
    <div className='InChatSection'>
        <div className='chatUserHeader'>
            {/* Image of other user profile and name etc */}
            <div className="userImageRightSection">
              <img src={profileImg} alt="" />
            </div>
            <h3 className='chatUsername'>{otherUsername}</h3>
        </div>
        <div id='midChatSec' className='midChatSection'>
            
        </div>
        <div className='inputTextSection'>
            <div className='boxForInputText'>
                <input id='inputedText' className='inputText' type="text" />
                <input className='submitText' type="submit" value={"Submit"} onClick={()=>sendMessage()}/>
            </div>
        </div>
    </div>
  )
}