import { auth, firestore, storage } from "./firebase";
import { Link, Redirect } from "react-router-dom";
import {AuthContext} from "./AuthProvider"
import { useContext, useEffect, useState } from "react";
import "./Home.css"
import VideoCard from "./VideoCard";
function Home(){
    let userData=useContext(AuthContext);
     let [userPosts,SetUserPosts]=useState([]);
      
     useEffect(()=>{
        
       let unsub= firestore.collection("posts").onSnapshot((querySnapshot)=>{
             let arr=[];
            querySnapshot.forEach((doc)=>{
               arr.push({...doc.data(),id:doc.id});
            })

            SetUserPosts(arr);
        })

        return ()=>{
            unsub();
        }

     },[])
    return(
        <div>
         {userData?<>
            <div className="post-container">
            
            {
                userPosts.map((e)=>{
                  return  <VideoCard key={e.url} data={e}/>
                })
            }
            
            </div>
         
         <Link to="/profile"><button className="profile-btn" >Profile</button></Link>
            <button className="logout-btn" onClick={()=>{
          auth.signOut();
            }}>Logout</button>

            <input className="upload-btn" type="file" onChange={(e)=>{
               
               if(!e.currentTarget.files[0]) return;
            let {name,size,type}=e.currentTarget.files[0];
            let file=e.currentTarget.files[0];
            type=type.split("/")[0];
             size=size/1000000;
            
            if(type!="video") alert("wrong type")
            else if(size>10) alert("size limit exceeded ")
           else{
               let f1=(snapshot)=>{
               }
               let f2=(error)=>{

               }
               let f3=()=>{
                   let p=uploadTask.snapshot.ref.getDownloadURL();
                   p.then((url)=>{
                     firestore.collection("posts").add({
                         name:userData.displayName,
                        url,
                    like:0,
                comments:[]})
                   })
               }
                let uploadTask=storage.ref(`/posts/${userData.uid}/${Date.now()+name}`).put(file);
                uploadTask.on("state_changed",f1,f2,f3);
            

            }
            e.currentTarget.value="";
            }} />
            </>:<Redirect to="/"/>}
           
        </div>
    );
}
export default Home