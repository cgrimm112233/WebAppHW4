import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const tasksContainerRef1 = useRef(null);
  const tasksContainerRef2 = useRef(null);
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
      newTask.children[0].classList.add("taskCheck");
      newTask.children[1].classList.add("taskP");

      function handleClick(){
        newTask.children[0].classList.toggle("taskChecked");
        newTask.children[0].classList.toggle("taskCheck");
        newTask.children[1].classList.toggle("taskPChecked"); 
        newTask.children[1].classList.toggle("taskP");
      }
      newTask.children[0].addEventListener('click', handleClick);

      //random select category for now
      if(Math.random() < 0.5)
        tasksContainerRef1.current.appendChild(newTask);
      else
        tasksContainerRef2.current.appendChild(newTask);
  }

  return (
    <>
      <h1>Today</h1>
      <div id="tasksContainer">
        <p class="categoryName">CATEGORY 1</p>
        <div class="categoryContainer" ref={tasksContainerRef1}></div>
        <p class="categoryName">CATEGORY 2</p>
        <div class="categoryContainer" ref={tasksContainerRef2}></div>
      </div>
      <div id="entryContainer">
        <p id="emptyText">Write a task...</p>
        <input type="text" id="inputText" ref={inputRef}  onChange={() => {document.getElementById("emptyText").style.visibility = "hidden";}} />
        <div style={{width: "40px", height: '100%'}}></div>
        <button id="add" onClick={addTask}> Add </button>
      </div>
    </>
  )
}

export default App
