import React, { useEffect, useState } from 'react'
import "./SideBarChat.css"
import {Avatar} from "@material-ui/core"

// import { getDatabase, ref, set } from "firebase/database";
import { getDatabase, ref, onValue, push, set} from "firebase/database";
import { Link } from 'react-router-dom';


   

function SideBarChat({id, name,addNewchat}) {
    const [seed , setSeed] = useState("");
    const [mensseges , setmensseges] = useState({});
    const [Lastmensseges , setLastmensseges] = useState("");
    useEffect(()=>{
        const db = getDatabase();
        const starCountRef = ref(db,"/rooms/"+id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if(data !== null){
       
           
           if(data.menssages)
            {setmensseges(data.menssages)           
            }
            
        }       
         });
    },[id])

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
       
             <p className='overflow-ellipsis'>{Object.entries(mensseges)[Object.keys(mensseges).length - 1]? Object.entries(mensseges)[Object.keys(mensseges).length - 1][1].menssage :""}</p> 
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