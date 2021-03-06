import React from 'react'
import "./Login.css"
import {Button} from "@material-ui/core"
import { provider} from "./firebase" ;
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionsType } from './reducer';

function Login() {
  const [{}, dispatch] = useStateValue();
  
const SignIn = ()=>{


  const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    console.log(result)
    dispatch({
      type: actionsType.SET_USER,
      user:  result.user,
    })
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

  return (
    <div className='login'>
        <div className='login___container'>
            <img src='https://cdn.icon-icons.com/icons2/840/PNG/512/Whatsapp_icon-icons.com_66931.png' alt=""/>
            <div className='login__text'>
              <h1> Registrate para WhatsApp</h1>            
            </div>


            <Button onClick={SignIn}>
              Registrate con Google
            </Button>
        </div>
    </div>
  )
}



export default Login