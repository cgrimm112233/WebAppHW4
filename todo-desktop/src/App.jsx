import { useState, useRef } from 'react'
import logoIMG from './assets/logo.png'
import clearIMG from './assets/clear_button.png'
import { Selection } from './Selection'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [isS1, setIsS1] = useState(true);
  const [isS2, setIsS2] = useState(false);
  const tasksContainerRef = useRef(null);
  const inputRef = useRef(null);

  function addTask(){
    const input = inputRef.current.value;
    if(!input) 
      return;
    const newList = [...list, input];
    setList(newList);
    updateTasks(newList);
    inputRef.current.value = "";
    document.getElementById("emptyText").style.visibility = "visible";
  }
  function updateTasks(newList){
      const newTask = document.createElement("div");
      newTask.className = "task";
      newTask.appendChild(document.createElement("button"));
      newTask.appendChild(document.createElement("p")).textContent = newList[newList.length - 1];
      newTask.appendChild(document.createElement("button"));
      newTask.children[0].classList.add("taskCheck");
      newTask.children[1].classList.add("taskP");
      newTask.children[2].classList.add("taskDelete");

      function handleClickCheck(){
        newTask.children[0].classList.toggle("taskChecked");
        newTask.children[0].classList.toggle("taskCheck");
        newTask.children[1].classList.toggle("taskPChecked"); 
        newTask.children[1].classList.toggle("taskP");
      }
      newTask.children[0].addEventListener('click', handleClickCheck);
      function handleClickDel(){
        newTask.remove();
        setList(list.filter(item => item !== newTask.children[1].textContent));
      }
      newTask.children[2].addEventListener('click', handleClickDel);

      tasksContainerRef.current.appendChild(newTask);
  }

  
  function clearTasks(){
    const tasks = tasksContainerRef.current.children;
    for(let i = tasks.length - 1; i >= 0; i--)
      if(tasks[i].children[0].classList.contains("taskChecked")){
        tasks[i].remove();
        setList(list.filter(item => item !== tasks[i].children[1].textContent));
      }
  }

  return (
    <>
      <div id="header">
        <div id="logo">
          <img src={logoIMG} style={{height: "50%"}} />
        </div>
        <Selection name="Personal" isSelected={isS1} />
        <Selection name="Professional" isSelected={isS2} />
      </div>

      <div id="bodyContainer">
        <div id="entryContainer">
          <p id="emptyText">What do you need to do?</p>
            <input type="text" id="inputText" ref={inputRef}  onChange={() => {document.getElementById("emptyText").style.visibility = "hidden";}} />
            <button id="add" onClick={addTask}> ADD </button>
        </div>
        <div id="contentContainer">
          <div id="tasksContainer" ref={tasksContainerRef} />
          <img src={clearIMG} id="clearIMG"></img>
          <button id="clear" onClick={clearTasks}> Clear Completed</button>
        </div>
      </div>
    </>
  )
}

export default App
