import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { firestore } from "./firebase";
import "./profile.css"
let Profile=()=>{
let [totalPosts,setTotalPosts]=useState(0);
let userData=useContext(AuthContext);
  useEffect( async ()=>{
      
  let querySnapshot=await firestore.collection("posts").where("name","==",userData.displayName).get();
    
     setTotalPosts(querySnapshot.size);
  },[])
    return(
        <>
       
           <div id="profile"><img src={userData.photoURL}/>
           <p id="username">{userData.displayName}</p>
           <p className="ttpost">Total Posts-{totalPosts}</p></div> 
          
        </>
    );
}

export default Profile;