import React, { useState } from 'react'
import './chatcss.css'
import UserContact from './UserContact'

export default function InContactSection({setOtherUsername}) {

  const [contactList, setContactList] = useState([{name:"pooja222",image:"../../assets/media/girlFirst.png"},{name:"gagneeshvimal101",image:"../../assets/media/girlOne.png"},{name:"gagneeshvimal",image:"../../assets/media/girlOne.png"},{name:"poojavimal10",image:"../../assets/media/girlOne.png"}]);
  const [prevDivId,setPrevId] = useState("");

  const setSelection =(theIndex)=>{
    if(prevDivId!==""){
        document.getElementById(prevDivId).style.backgroundColor = "#8F5E6B";
    }

    const idIs = `chatuser${theIndex}`;
    setPrevId(idIs);
    document.getElementById(idIs).style.backgroundColor = "#24012F";
  }

  return (
    <div className='InContactSection'>
        {
            contactList.map((elem,index)=>{
                return <UserContact setOtherUsername={setOtherUsername} setSelection={setSelection} userName={elem.name} userImage={elem.image} key={index} partIndex={index}/>
            })
        }
    </div>
  )
}
