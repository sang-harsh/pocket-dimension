import React,{useState}from "react";
import { collection,addDoc,serverTimestamp} from "firebase/firestore"; 
import{ db } from '../firebase';
import {storage} from "../firebase";
import {ref,uploadBytesResumable,getDownloadURL} from "@firebase/storage"



function Modal({ setOpenModal}) {
  const colRef = collection(db, 'allProjects');
  const [progress,setProgress]=useState(0);
  const [currentLink,setCurrentLink]=useState("");

  const formHandler=(e)=>{
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file); 
  }

  const uploadFiles = (file) =>{
    if(!file) return;
    const storageRef = ref(storage,`/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,file);
    uploadTask.on(
      "state_changed",
      (snapshot)=>{
      const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
      setProgress(prog);
       },
      (err)=>console.log(err),
      ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url=>setCurrentLink(url));
      }
    );
  }
 

  function addNewProject(){
    addDoc(colRef,{
          title: document.getElementById("title").value,
          tech1: document.getElementById("tech1").value,
          tech2: document.getElementById("tech2").value,
          tech3: document.getElementById("tech3").value,
          tech4: document.getElementById("tech4").value,
          githubLink: document.getElementById("githubLink").value,
          hostedLink: document.getElementById("hostedLink").value,
          projectImage: currentLink,
          createdAt: serverTimestamp(),
        }).then(()=>{
          console.log("Added");
        }).catch((err)=>console.log(err));
      setOpenModal(false);
  }

  

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="modalHeader">
          <div className="modalTitle">New Project</div>
          <button onClick={() => {setOpenModal(false)}}> X </button>
        </div>

        <div className="form1">
            <label>Title of Project</label><br/>
          <input type="text" id="title" placeholder="Title of Project" required/>
          <div className="techStack">
          <label>Tech Stack Used</label>
          </div>
          <input type="text" id="tech1" placeholder="tech1"required/>
          <input type="text" id="tech2" placeholder="tech2"required/>
          <input type="text" id="tech3" placeholder="tech3"required/>
          <input type="text" id="tech4" placeholder="tech4"required/><br/>
          <label>Links</label><br/>
          <input type="text" id="hostedLink" placeholder="Link of Hosted Site"required/>
          <input type="text" id="githubLink" placeholder="GitHub Link"required/><br/>

          <label>Project Image</label>
          <form className="form2" onSubmit={formHandler}>
          <input type="file" className="input"required/>
          <button type="submit">Upload</button><br/>
          {
            (progress===100)?"  Uploaded":<></>
          }
          </form>
          
        <div className="footer1">
          <button onClick={() => { setOpenModal(false); }} id="cancelBtn">Cancel </button>
          <button onClick={() => { addNewProject() }} >Add</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;