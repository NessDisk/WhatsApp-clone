import React, { useEffect, useState } from 'react'
import "./Chat.css"
import {Avatar , IconButton} from "@material-ui/core"

import { AttachFile , InsertEmoticon, MoreVert, SearchOutlined} from '@material-ui/icons' 
import MicIcon  from "@material-ui/icons/Mic"
import { useParams } from 'react-router-dom'
import { getDatabase, ref, onValue, push, set} from "firebase/database";

import { updateDoc, serverTimestamp } from "firebase/firestore";
import { useStateValue } from './StateProvider'





function Chat() {

    const [input  , setInput] = useState("");
    const [seed , setSeed] = useState("");
    let {roomId} = useParams();
    const [roomName , setRoomName] = useState();
    const [mensseges , setmensseges] = useState({});
    const [lastSeen , setLastSeen] = useState("");
    const[{user}, dispatch] = useStateValue();

    useEffect(()=>{

if(roomId){
    const db = getDatabase();
    const starCountRef = ref(db,"/rooms/"+roomId);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if(data !== null){
        // value = Object.keys(data);
        // data.doc
        // console.log( Object.entries(data.menssages)[Object.keys(data.menssages).length - 1][1].timestamp);
       
        setRoomName(data.name)
        setmensseges(data.menssages)
        if(data.menssages)
        setLastSeen(Object.entries(data.menssages)[Object.keys(data.menssages).length - 1][1].timestamp)
    }       
     });
}}
    ,[roomId])


    //ramdon avatar
    useEffect(        
        ()=>{
              
            setSeed(Math.floor(Math.random()*5000))

            if(!mensseges)
            setmensseges( Object.entries(mensseges)[Object.keys(mensseges).length - 1][1].timestamp)
        }
        ,[]
    );

    const SendMessage =(e) =>{      
e.preventDefault()
console.log("Hola mundo tu esctiro es >>> "+ input)
// console.log(mensseges.length )

const db = getDatabase();
const postListRef = ref(db, 'posts');
const newPostRef = push(postListRef);

var today = new Date()

// const name = user.displayName;

set(push(ref(db, `rooms/${roomId}/menssages/`)), {
    
    
         name: user.displayName,
         menssage:input,
         timestamp: today.getHours() + ':' +  today.getUTCMinutes()
  
});

// console.log(Object.entries(mensseges)[Object.keys(mensseges).length - 1][1].timestamp)

// if( mensseges !== undefined ){
//     // console.log(Object.entries(mensseges)[Object.keys(mensseges).length - 1][1].timestamp)
//     setLastSeen(Object.entries(mensseges)[Object.keys(mensseges).length - 1][1].timestamp)
// }


setInput("")
    }

  return (
      
    <div className='chat'>

        <div className='chat__header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        
        <div className='chat__headerInfo'>
                <h3>{roomName}</h3>
                {/* {Object.entries(mensseges)[Object.keys(mensseges).length - 1][1]?.timestamp} */}
                {/* <p> { Object.entries(mensseges)[Object.keys(mensseges).length - 1]}</p> */}
               <p>  {mensseges? "last seen "+ lastSeen : "last seen at..."} </p>
          
        </div>
        <div className='chat__headerRight'>
                <IconButton>
                < SearchOutlined/>
                </IconButton>
                
                <IconButton>
                    <AttachFile />
                </IconButton>
                
                <IconButton>
                    < MoreVert/>                   
                </IconButton>
        </div>

            </div>

    <div className='chat__body'>
        
     
        { mensseges?   Object.entries(mensseges).map((msg, i) => {
            // console.log(msg[1]);
           
               
                // return <SideBarChat  key={room[0]} id={room[0]} name={room[1].name}/>
            //   return <div><h1>{msg[1].menssage}</h1> </div>
          return <div>  <p className={`chat__message ${
               msg[1].name === user.displayName
              && "chat__reciever"}`}> 
        <span className='chat__name'>{msg[1].name}</span>
      
       {msg[1].menssage}
        <span className='chat__timestamp'>{msg[1].timestamp}</span>
        </p> 
        <br/>
        </div>
                         
            }) :<></>
        }
         
        {/* <p className={`chat__message ${true && "chat__reciever"}`}> 
        <span className='chat__name'>Nestor</span>
        Hey Guys 
        <span className='chat__timestamp'>3:30pm</span>
        </p> */}
    </div>
    
    <div className='chat__footer'>
        <InsertEmoticon/>
        <form>
            <input value={input}
            onChange={(e)=> setInput(e.target.value)
            }
            type="text"  placeholder='Escribe tu mensaje'/>
            <button onClick={SendMessage} type="submit">Envia un mensaje</button>
        </form>
        <MicIcon/>

    </div>

    <div></div>

    </div>

  )
  
}

export default Chat