import React,{useState} from 'react';
import LOGINICON from '../utils/login.svg'
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut  } from "firebase/auth";


function Navbar() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState();


  function signInWithGoogle(){
    signInWithPopup(auth, provider)
    .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    setCurrentUser(user);
    console.log(user);
    localStorage.setItem("pic", user.photoURL);
    })
  }

  function logout(){
    setCurrentUser();
    return signOut(auth).then(() => {
          localStorage.clear();
          alert("Signed Out");
          
        }).catch((error) => {
          alert("Error");
        });
  }

  
  return (
    <div className='navbar'>
      <h1>POCKET  DIMENSION</h1>
      {
        !currentUser?(
        <div onClick={signInWithGoogle} className="login-button">
        <img src={LOGINICON} alt="Not found" className='login-icon'/>
        </div>
        ):(<div onClick={logout} className="login-button">
        <img src={localStorage.pic} alt="Not found" className='login-icon'/>
        </div>)
      }
      
      
    </div>
  )
}

export default Navbar;
