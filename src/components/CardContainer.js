import React, { useEffect, useState } from 'react';
import CALCULATOR from "../utils/calculator.svg";
import GITHUBLOGO from "../utils/github.svg";

function CardContainer() {
      const [data,setData] = useState([]);
      const ref = [{
            // image: CALCULATOR,
            tech1: 'reactJS',
            tech2: 'Rapid API',
            tech3: 'Material UI',
            tech4: 'Google Maps API',
            title: 'calculator',
            hostedLink: "https://sang-harsh.github.io/Calculator/",
            githubLink: "https://github.com/sang-harsh/Calculator/"
      },
      {
            // image: CALCULATOR,
            tech1: 'reactJS',
            tech2: 'Rapid API',
            tech3: 'Material UI',
            tech4: 'Google Maps API',
            title: 'calculator',
            hostedLink: "https://sang-harsh.github.io/Calculator/",
            githubLink: "https://github.com/sang-harsh/Calculator/"
      }]

      useEffect(()=>{
            setData(ref);
      },[])

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

      
      </div>
      )
}

export default CardContainer;