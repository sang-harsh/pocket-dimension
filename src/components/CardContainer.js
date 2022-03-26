      import React, { useEffect, useState } from 'react';
      import CALCULATOR from "../utils/calculator.svg";
      import GITHUBLOGO from "../utils/github.svg";
      import PLUS from "../utils/plus.svg";
      import Modal from "../components/Modal";

      import { collection, getDocs,orderBy,query} from "firebase/firestore"; 
      import{ db } from '../firebase';


      function CardContainer() {
            const [data,setData] = useState([]);
            const [modalOpen, setModalOpen] = useState(false);
            const colRef = collection(db, 'allProjects');
            const q = query(colRef,orderBy('createdAt'));

            useEffect(()=>{
                  getData();
            },[]);
            
            function getData(){
                  let temp = [];
                  getDocs(q) 
                  .then(snapshot => {
                  snapshot.docs.forEach(element => {
                        console.log(element.data().task);
                        console.log();
                        temp.push({
                              tech1: element.data().tech1,
                              tech2: element.data().tech2,
                              tech3: element.data().tech3,
                              tech4: element.data().tech4,
                              title: element.data().title,
                              hostedLink: element.data().hostedLink,
                              githubLink: element.data().githubLink,
                              id: element.id,
                        });    
                  });
                  setData(temp);    
                  }).catch((error)=>console.error(error)) 
            }


            return (
            <div className="container">

            {     
      
                  data.map((element)=>
                        
                  
                        <div className="project-container">
                              <div className="main">
                              <div className="img-container">
                              <img src={CALCULATOR} className="projectImage" alt="not found"/>
                              </div>
                              <div className="tech-stack">
                                    <div className="stack">{element.tech1}</div>
                                    <div className="stack">{element.tech2}</div>
                                    <div className="stack">{element.tech3}</div>
                                    <div className="stack">{element.tech4}</div>
                              </div>
                              </div>

                              <div className="title">
                              <a href={element.hostedLink} target="_blank">{element.title}</a>
                              <a href={element.githubLink} target="_blank">
                                    <img src={GITHUBLOGO} alt="NF" className="github-icon"/>
                              </a>
                              </div>
                        </div>

                  )
            }
            

            <button id="modal-button" onClick={() => {setModalOpen(true);}}>
                  <div className="add-new-container" >
                  <img src={PLUS} alt="NF" className="plus-icon"/>  
                  </div>
            </button>

            {modalOpen && <Modal setOpenModal={setModalOpen} />}

            </div>
            )
      }

      export default CardContainer;