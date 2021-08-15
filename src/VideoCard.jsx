import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { firestore } from "./firebase";
import "./Home.css"
let VideoCard=(props)=>{

let [closeBtn,setCloseBtn]=useState(false);
let [playing,setPlay]=useState(false);
let [currentComment,setCurrentComment]=useState("");
let value=useContext(AuthContext);

let [allComments,setAllComments]=useState([]);

    useEffect(async ()=>{
       let arr=[];
         let allCommentId=props.data.comments;
        for(let i=0;i<allCommentId.length;i++){
          let  id=allCommentId[i];
            let doc= await firestore.collection("comments").doc(id).get();
            arr.push(doc.data());
        }
        setAllComments(arr);

    },[props])
    return(
        <div className="video-card">
            <video src={props.data.url} onClick={(e)=>{

                if(playing){
                    setPlay(false);
                    e.currentTarget.pause();
                }else{
                    setPlay(true);
                    e.currentTarget.play();
                }
            }}></video>
            <span className="material-icons like">favorite_border</span>
            <span className="material-icons comment" onClick={()=>{
                setCloseBtn(true);
            }}>chat_bubble</span>
            <p className="username"><b>{`@${props.data.name}`}</b></p>
                <p className="song">
                <span class="material-icons-outlined">music_note</span>
                   <marquee>Starboy(The Weeknd)</marquee></p>
                     

                     {closeBtn?<div className="comment-box">
                       <button className="comment-close-btn" onClick={()=>{
                             setCloseBtn(false);
                       }
                       }>close</button>
                       <div className="all-comments">

                           {

                               allComments.map((comment)=>{
                                   return <div className="comments">

                                        <img src={comment.pic}/>
                                        <div>
                                            <p><b>{comment.name}</b></p>
                                            <p>{comment.comment}</p>
                                        </div>

                                   </div>
                               })
                           }
                           {/* <div>
                               <img src={all} />
                           </div> */}
                       </div>
                       <div className="comment-form">
                           <input type="text" value={currentComment} onChange={(e)=>{
                               setCurrentComment(e.currentTarget.value);
                           }}/>
                           <button onClick={async ()=>{
                                
                                let docref= await firestore.collection("comments").add({
                                    comment:currentComment,
                                    name:value.displayName,
                                    pic:value.photoURL
                                })

                                let doc=await docref.get();

                                await firestore.collection("posts").doc(props.data.id).update({
                                    comments:[...props.data.comments,doc.id]
                                })

                                setCurrentComment("")

                           }}>Post</button>
                       </div>
                   </div>:""}
                   
        </div>
        
    );
}
export default VideoCard;