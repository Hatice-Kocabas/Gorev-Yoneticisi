import React from 'react';
import { Task } from './Task';
import './TaskTable.css'; 

interface TaskTableProps {
  tasks: Task[];
  deleteTask: (taskId: number) => void;
  editTask: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, deleteTask, editTask }) => {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th className="table-header">ID</th>
          <th className="table-header">Görev Adı</th>
          <th className="table-header">Kullanıcı ID</th>
          <th className="table-header">Tamamlanma Durumu</th>
          <th className="table-header">Aksiyonlar</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.userId}</td>
            <td>{task.completed ? 'Evet' : 'Hayır'}</td>
            <td>
              <button className="edit-button" onClick={() => editTask(task)}>Düzenle</button>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Sil</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
