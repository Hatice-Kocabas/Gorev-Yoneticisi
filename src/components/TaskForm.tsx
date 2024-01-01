import React, { useState } from 'react';
import { Task } from './Task';
import './style.css';


interface TaskFormProps {
  task?: Task; 
  onSubmit: (newTask: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  const [newTask, setNewTask] = useState<Task>({
    id: task ? task.id : Math.floor(Math.random() * 1000),
    title: task ? task.title : '',
    userId: task ? task.userId : 0,
    completed: task ? task.completed : false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value; 
  
    setNewTask({ ...newTask, [name]: newValue });
  };
  
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newTask);
    setNewTask({ id: Math.floor(Math.random() * 1000), title: '', userId: 0, completed: false }); 
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className='task_input_msg'>Görev başlığı ekleyin:</div>
      <input className='task-form input'type="text" name="title" value={newTask.title} onChange={handleInputChange} placeholder="Title" />
      <div className='task_input_msg'>Kullanıcı ID'sini girin:</div>
      <input className='task-form input' type="number" name="userId" value={newTask.userId} onChange={handleInputChange} placeholder="User ID" />
      <div className='task_input_msg'>Görev tamamlanma durumu:</div>
      <input className='task-completed' type="checkbox" name="completed" checked={newTask.completed} onChange={handleInputChange} />
      <button className='task-form input ekle_btn' type="submit">Görevi Ekle</button>
    </form>
  );
};

export default TaskForm;
