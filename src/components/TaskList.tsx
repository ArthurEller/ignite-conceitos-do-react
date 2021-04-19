import { useCallback, useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const localTasks = localStorage.getItem("@todoTasks");

  useEffect(() => {
    if (localTasks) {
      setTasks(JSON.parse(localTasks))
    } 
  }, [])

  useEffect(() => {
    localStorage.setItem("@todoTasks", JSON.stringify(tasks))
  }, [tasks]);
  
  function handleCreateNewTask() {
    if (newTaskTitle) {
      const task = {
        id: Math.floor((Math.random() * 99) + 1),
        title: newTaskTitle,
        isComplete: false
      }
  
      setTasks([...tasks, task])
    } else {
      console.log("Error")
    }
  
  }

  function handleToggleTaskCompletion(id: number) {
    const task = tasks
    const newArray = task.findIndex(item => item.id === id)

    if (task[newArray].isComplete === true) {
      task[newArray].isComplete = false;
    } else {
      task[newArray].isComplete = true;

    }

    setTasks([...task])
  }

  function handleRemoveTask(id: number) {
    let filtredArray = tasks.filter(item => item.id !== id)

    setTasks(filtredArray)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => 
              setNewTaskTitle(e.target.value) 
            }
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}