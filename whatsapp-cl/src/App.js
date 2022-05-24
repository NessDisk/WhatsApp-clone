
import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat.js"
import {BrowserRouter  as Router, Switch ,  Route } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';





function App() {

  // const [user, setUser] = useState(null)
  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
console.log(user)
  },[user])


  return (
    //Example BEM naming convention
    <div className="app">
      
{ !user?(

<Login/>

):(
  <div className='app__body'>
  <Router>
          <Sidebar/>
                <Switch>
          
              <Route path="/rooms/:roomId">
                    
              <Chat/>
              </Route>

              <Route path="/">
                    
                    <Chat/>
              </Route>

    </Switch>
    </Router>
  </div>
  
)
     
}
    </div>
  );
}

export default App;
