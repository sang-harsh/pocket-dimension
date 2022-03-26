import React from "react";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false)}}> X </button>
        </div>

        <form className="form1">
            <label>Title of Project</label><br/>
          <input type="text" id="title" placeholder="Title of Project"/>
          <div className="techStack">
          <label>Tech Stack Used</label>
          </div>
          <input type="text" id="tech1" placeholder="tech1"/>
          <input type="text" id="tech2" placeholder="tech2"/>
          <input type="text" id="tech3" placeholder="tech3"/>
          <input type="text" id="tech4" placeholder="tech4"/><br/>
          <label>Links</label><br/>
          <input type="text" id="hostedLink" placeholder="Link of Hosted Site"/>
          <input type="text" id="githubLink" placeholder="GitHub"/>
        </form>


        <div className="footer1">
          <button onClick={() => { setOpenModal(false); }} id="cancelBtn">Cancel </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;