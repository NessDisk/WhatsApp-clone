import React, { useEffect, useState } from 'react'
import "./SideBarChat.css"
import {Avatar} from "@material-ui/core"

// import { getDatabase, ref, set } from "firebase/database";
   import { getDatabase, ref, push, set } from "firebase/database";
import { Link } from 'react-router-dom';


   

function SideBarChat({id, name,addNewchat}) {
    const [seed , setSeed] = useState("");

    useEffect(
        ()=>{
            setSeed(Math.floor(Math.random()*5000))
        }
        ,[]
    );

    const createChat =()=>{
        const rooName = prompt("Please enter the name for chat")

        if(rooName){
           // do something database stuff
            const db = getDatabase();
            const postListRef = ref(db, 'posts');
            const newPostRef = push(postListRef);

            set(push(ref(db, 'rooms/')), {
                
                name:rooName
            });
           
          
        }

    };
 
  return ( !addNewchat?(
   <Link to={`/rooms/${id}`}> 
   <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='sidebarChat__info'>
            <h2>{name}</h2>
            <p>Last message...</p>
        </div>
    </div>
    </Link>
    ):( <div onClick={createChat}  className='sidebarChat'>
        <h2>Create chat</h2>



    </div>    
    )
    
    


  )
}

export default SideBarChat