import React, { useState, useMemo } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './interfaces/Task';
import { User } from './interfaces/User';
import UserSelection from './components/UserSelection';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'John',
    role: 'owner'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<'title' | 'endDate' | 'status'>('title');

  const saveTask = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map(eachTask => (eachTask.id === task.id ? task : eachTask)));
    } else {
      setTasks([...tasks, task]);
    }
    setEditingTask(null);
    setIsModal(false);
  };

  const createTask = () => {
    setEditingTask(null);
    setIsModal(true);
  }

  const editTask = (task: Task) => {
    if (currentUser.role === 'admin' || currentUser.id === task.ownerId) {
      setIsModal(true);
      setEditingTask(task);
    } else {
      alert('You do not have permission to edit this task.');
    }
  };

  const deleteTask = (id: string) => {
    if (currentUser.role === 'admin' || tasks.find(task => task.id === id)?.ownerId === currentUser.id) {
      setTasks(tasks.filter(task => task.id !== id));
    } else {
      alert('You do not have permission to delete this task.');
    }
  };

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria as 'title' | 'endDate' | 'status');
  };

  const filteredTasks = useMemo(() => tasks
    .map(task => {
      if (new Date(task.endDate) < new Date(new Date().setHours(0, 0, 0, 0)) && task.status !== 'Completed') {
        task.status = 'Overdue';
      }
      return task;
    })
    .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortCriteria === 'endDate') {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      } else {
        return a.status.localeCompare(b.status);
      }
    }), [tasks, sortCriteria, searchQuery]);

  return (
    <div>
      <h1>Task Manager</h1>
      <UserSelection onSelectUser={setCurrentUser} />
      <button onClick={() => createTask()}>Create Task</button>
      {isModal && <TaskForm task={editingTask} onSave={saveTask} currentUser={currentUser} onClose={setIsModal} />}
      <TaskList tasks={filteredTasks} onEdit={editTask} onDelete={deleteTask} searchQuery={searchQuery} currentUser={currentUser} onSort={handleSort} onSearch={setSearchQuery} />
    </div>
  );
};

export default App;
