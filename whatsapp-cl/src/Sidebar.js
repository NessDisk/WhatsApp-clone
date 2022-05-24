import React, { useEffect, useState } from 'react'
import {Avatar, IconButton } from "@material-ui/core"
import DonutLargeIcon  from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {Room, SearchOutlined} from "@material-ui/icons"
import  "./Sidebar.css"
import SideBarChat from './SideBarChat'
import database from './firebase'
// import db from './firebase'

import { getDatabase, ref, onValue} from "firebase/database";
import { useStateValue } from './StateProvider'
// import { getDatabase } from "firebase/database";



function Sidebar() {

const [rooms, setRooms] = useState([]);
const [{user}, dispatch] = useStateValue();

useEffect(() =>{
// db.collection("rooms").onSnapshot(onSnapshot => (
//     setRooms(onSnapshot.doc.map(doc=>({
//         id:doc.id,
//         data: doc.data(),
//     })))
// ))

// console.log(user?.photoURL)
// let value ;
const db = getDatabase();
const starCountRef = ref(db,"/rooms");
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    if(data !== null){
    // value = Object.keys(data);
    // data.doc

    setRooms(data)
}
   
});

},[])

  return (
    <div className='sidebar'>
    <div className='sidebar__header'>
   {user?   <Avatar src={user.photoURL} />:
            <Avatar />}
<div className='sidebar__headerRight'>

    <IconButton>
           <DonutLargeIcon/>
    </IconButton>
    <IconButton>
          <ChatIcon/>
    </IconButton>
    <IconButton>
          <MoreVertIcon/>
    </IconButton>
</div>

    </div>

    <div className='sidebar__search' >
<div className='sidebar__searchContainer'>
    <SearchOutlined/>
    <input placeholder='Busca o inicia nevo chat ' type="text"/>
</div>

    </div>

    <div className='sidebar__chats' >
    <SideBarChat addNewchat/>

    {/* {console.log(rooms)} */}
    {
        Object.entries(rooms).map((room, i) => {
            // console.log(room[1]);
           
            return <SideBarChat  key={room[0]} id={room[0]} name={room[1].name}/>
        })
    }
    </div>
    </div>

  )
}



export default Sidebar
