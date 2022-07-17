import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script';
import './Logincss.css';
import Form from './Form';
export default function Login() {
  const [user, setUser] = useState(null);
  const apiKey=process.env.REACT_APP_API;
  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(gapi,apiKey, '')
      if (auth2.isSignedIn.get()) {
          updateUser(auth2.currentUser.get())
      } else {
          attachSignin(document.getElementById('customBtn'), auth2);
      }
    }
    setAuth2();
  }, []);

  useEffect(() => {
    if (!user) {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(gapi,apiKey, '')
        attachSignin(document.getElementById('customBtn'), auth2);
      }
      setAuth2();
    }
  }, [user])

  const updateUser = (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    setUser({
      name: name,
      profileImg: profileImg,
    });
  };
   
  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        updateUser(googleUser);
      }, (error) => {
      console.log(JSON.stringify(error))
    });
  };
  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      console.log('User signed out.');
    });
  }
   
  if(user) {
    return (
      <div className="container">
        <div id="navbar" className="logout" onClick={signOut}>
          {user.name}
        </div>
        <Form/>
      </div>
    );
  }
  return (
    <div className="container">
    <div id="customBtn" className="btn login">

      Login
    </div>
  </div>
  )
}
