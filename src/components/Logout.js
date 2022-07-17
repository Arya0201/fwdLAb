import React from 'react'
import {GoogleLogout} from 'react-google-login';
const clientId='972436035058-fd3mgtem8jmgf2b259a7fdbe1ikgqdiq.apps.googleusercontent.com';
export default function Logout() {
   const logout=()=>{
    alert("logout successfully");
   }
  return (
    <div>
       <GoogleLogout
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
    </div>
  )
}
