'use client'

import { useState, useRef } from 'react'
import logoIMG from '../assets/logo.png'
import clearIMG from '../assets/clear_button.png'
import { Selection } from './Selection'
import { Task } from './Task'
import './App.css'
import { removeEntry, addEntry, toggleComplete } from './page';

function App(props) {
  const [list, setList] = useState(props.initS1);
  const [otherList, setOtherList] = useState(props.initS2);
  const [isS1, setIsS1] = useState(true);
  const inputRef = useRef(null);

  function addTask(){
    const input = inputRef.current.value;
    if(!input) 
      return;
    const newTask = {
      id: list.length + otherList.length,
      name: input,
      isComplete: false,
    };
    addEntry(newTask.id, newTask.name, newTask.isComplete, isS1)
    setList(prev => [...prev, newTask]);
    inputRef.current.value = "";
    document.getElementById("emptyText").style.visibility = "visible";
  }
  function toggleTask(id){
    list.forEach((task) => {if(id===task.id) toggleComplete(id, task.isComplete)});
    setList(prev => prev.map(task =>
      task.id === id ? {...task, isComplete: !task.isComplete} : task
    ));
  }
  function deleteTask(id){
    setList(prev => prev.filter(task => task.id !== id));
    removeEntry(id);
  }
  function clearTasks(){
    list.forEach((task)=>{
      if(task.isComplete) 
        removeEntry(task.id);
    })
    setList(prev => prev.filter(task => !task.isComplete));
  }

  function togglePage(){
    setIsS1(!isS1);
    const tempList = list;
    setList(otherList);
    setOtherList(tempList);
  }

  return (
    <>
      <div id="header">
        <div id="logo">
          <img src={logoIMG.src} style={{height: "50%"}} />
        </div>
        <div id="selectionsContainer"> 
          <Selection name="Personal" isSelected={isS1} onToggle={togglePage}/>
          <Selection name="Professional" isSelected={!isS1} onToggle={togglePage}/>
        </div>
      </div>

      <div id="bodyContainer">
        <div id="entryContainer">
          <p id="emptyText">What do you need to do?</p>
            <input type="text" id="inputText" ref={inputRef}  onChange={() => {document.getElementById("emptyText").style.visibility = "hidden";}} />
            <button id="add" onClick={addTask}> ADD </button>
        </div>
        <div id="contentContainer">
          <div id="tasksContainer">
            {list.map(task => (
              <Task
                key={task.id}
                name={task.name}
                isComplete={task.isComplete}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </div>
          <img src={clearIMG.src} id="clearIMG"></img>
          <button id="clear" onClick={clearTasks}> Clear Completed</button>
        </div>
      </div>
    </>
  )
}

export default App
