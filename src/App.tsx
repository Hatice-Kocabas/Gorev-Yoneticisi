import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskForm from './components/TaskForm';
import { Task } from './components/Task';
import './components/TaskTable.css';
import'./App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage] = useState<number>(15); // Belirlediğiniz sayfa başına görev sayısı

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Görevleri getirirken bir hata oluştu.');
      }
      const tasksData: Task[] = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error('Görevleri getirirken hata oluştu:', error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Görev silinirken bir hata oluştu.');
      }
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Görev silinirken hata oluştu:', error);
    }
  };

  const editTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (!response.ok) {
        throw new Error('Görev güncellenirken bir hata oluştu.');
      }
  
      const updatedTaskData: Task = await response.json();
      console.log('Güncellenen Görev:', updatedTaskData); // Güncellenen görevi kontrol etmek için
  
      const updatedTasks = tasks.map(task => (task.id === updatedTaskData.id ? updatedTaskData : task));
      setTasks(updatedTasks);
  
      setEditingTask(updatedTaskData); // Yeni güncellenen görevi set etmek
    } catch (error) {
      console.error('Görev güncellenirken hata oluştu:', error);
    }
  };
  
  

  const addTask = async (newTask: Task) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Görev eklenirken bir hata oluştu.');
      }
      const addedTask: Task = await response.json();
      // Eklenen görevi listenin başına eklemek için unshift kullanabilirsin
      setTasks([addedTask, ...tasks]);
      setShowTaskForm(false);
    } catch (error) {
      console.error('Görev eklenirken hata oluştu:', error);
    }
  };
  

  const handleEditSubmit = (editedTask: Task) => {
    editTask(editedTask);
  };
 // Mevcut sayfadaki görevleri döndüren fonksiyon
 const getCurrentTasks = (): Task[] => {
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  return tasks.slice(indexOfFirstTask, indexOfLastTask);
};

// Sayfa değiştirme fonksiyonu
const paginate = (pageNumber: number) => {
  setCurrentPage(pageNumber);
};

return (
  <div className="App">
    <h1>Görev Yöneticisi</h1>
    <button className='gorev_ekle_btn' onClick={() => setShowTaskForm(true)}>Görev Ekle</button>
    <h2>Görevler</h2>
    <TaskTable tasks={getCurrentTasks()} deleteTask={deleteTask} editTask={editTask} />

    {/* Görev Ekleme Formu Pop-up */}
    {showTaskForm && (
      <div className="task-form-popup">
        <div className="task-form-popup-inner">
          <span className="close" onClick={() => setShowTaskForm(false)}>
            &times;
          </span>
          <TaskForm onSubmit={addTask} />
        </div>
      </div>
    )}
    {editingTask && (
  <div className="task-form-popup">
    <div className="task-form-popup-inner">
      <span className="close" onClick={() => setEditingTask(null)}>
        &times;
      </span>
      <TaskForm task={editingTask} onSubmit={handleEditSubmit}/>
    </div>
  </div>
)}

    <div>
      {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, index) => (
        <button className='pagination_button' key={index} onClick={() => paginate(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
    
  </div>
);
};

export default App;

