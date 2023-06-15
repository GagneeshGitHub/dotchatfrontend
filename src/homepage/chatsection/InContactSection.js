import React, { useEffect, useState } from 'react'
import './chatcss.css'
import UserContact from './UserContact'

export default function InContactSection({setOtherUsername}) {

  const [contactList, setContactList] = useState([])
  const [prevDivId,setPrevId] = useState("");

  const setSelection =(theIndex)=>{
    if(prevDivId!==""){
        document.getElementById(prevDivId).style.backgroundColor = "#8F5E6B";
    }

    const idIs = `chatuser${theIndex}`;
    setPrevId(idIs);
    document.getElementById(idIs).style.backgroundColor = "#24012F";
  }

  useEffect(()=>{
    // fetch("https://nodejsdotchatbackend.onrender.com/getContactList")
    fetch("http://localhost:8081/getContactList")
    .then(data=>data.json()).then(data=>{
      setContactList(data)
      setOtherUsername(data[0])
    })
  },[])

  return (
    <div className='InContactSection'>
        {
            contactList.map((elem,index)=>{
                return <UserContact setOtherUsername={setOtherUsername} setSelection={setSelection} userName={elem} userImage={"../../assets/media/girlOne.png"} key={index} partIndex={index}/>
            })
        }
    </div>
  )
}
