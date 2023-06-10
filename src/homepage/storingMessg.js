
var allMessages = []

export const setStoredMessage = (stat,message)=>{
    if(stat==="get"){
        return allMessages
    } else if(stat==="set"){
        allMessages = [...allMessages,message]
    }
}

