import React, { useEffect, useState } from 'react'
import "./Chat.css"
import {Avatar , IconButton} from "@material-ui/core"

import { AttachFile , InsertEmoticon, MoreVert, SearchOutlined} from '@material-ui/icons' 
import MicIcon  from "@material-ui/icons/Mic"


function Chat() {

    const [input  , setInput] = useState("");
    const [seed , setSeed] = useState("");

    useEffect(
        ()=>{
            setSeed(Math.floor(Math.random()*5000))
        }
        ,[]
    );

    const SendMessage =(e) =>{      
e.preventDefault()
console.log("Hola mundo tu esctiro es >>> "+ input)
console.log()
    }

  return (
      
    <div className='chat'>

        <div className='chat__header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        
        <div className='chat__headerInfo'>
                <h3>Room name</h3>
                <p> last seen  at...</p>
          
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
        
        <p className={`chat__message ${true && "chat__reciever"}`}> 
        <span className='chat__name'>Nestor</span>
        Hey Guys 
        <span className='chat__timestamp'>3:30pm</span>
        </p>
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