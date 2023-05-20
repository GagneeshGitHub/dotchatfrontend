import React from 'react'
import './chatcss.css'
// import avatar from '../../assets/media/Avatar.js'
import firstImage from '../../assets/media/girlFirst.png'

export default function UserContact({userName,userImage,partIndex,setSelection,setOtherUsername}) { 

  const setSelUser = ()=>{
    setSelection(0);
    if(partIndex===0){
      setOtherUsername(userName)
    }
  }

  return (

    // Things we need for this component
    // username, userphoto, last message and color of last message

    <div onLoad={()=>{setSelUser()}} id={`chatuser${partIndex}`} className='userContactBox' onClick={()=>{setSelection(partIndex);setOtherUsername(userName)}}>
        <div className="uphotoname">
            <div className='userImage'>
                <img className='userImgCtSec' src={firstImage} alt="No Image Yet" />
            </div>
            <div className='nmsg'>
                <p className='usernameRight'>{userName}</p>
                <p className='lastmsgRight'> Last message here </p>
            </div>
        </div>
    </div>
  )
}
