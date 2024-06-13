import React, { useState } from 'react';
import { Task } from '../interfaces/Task';
import { User } from '../interfaces/User';

interface TaskFormProps {
    task: Task | null;
    onSave: (task: Task) => void;
    onClose: (value: boolean) => void;
    currentUser: User;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, currentUser, onClose }) => {
    const [title, setTitle] = useState(task?.title ?? '');
    const [description, setDescription] = useState(task?.description ?? '');
    const [endDate, setEndDate] = useState(task?.endDate ?? new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState<Task["status"]>('Pending');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: task ? task.id : String(Date.now()),
            title,
            description,
            endDate,
            status,
            ownerId: task ? task.ownerId : currentUser.id,
        };
        onSave(newTask);
        resetToDefault();
    };

    const resetToDefault = () => {
        setTitle('');
        setDescription('');
        setEndDate(new Date().toJSON().slice(0, 10));
        setStatus('Pending');
    };

    return (
        <div className='modalContainer' onClick={(e: React.MouseEvent<HTMLInputElement>) => { if ((e.target as Element).className === 'modalContainer') onClose(false) }}>
            <div className='modal'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label id='taskName'>Task Name</label>
                        <input aria-labelledby='taskName' value={title} placeholder='What is the name of the task?' required onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label id='description'>Description</label>
                        <input aria-labelledby='description' value={description} placeholder='Describe the task and include any information required' onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label id='endDate'>Task End Date</label>
                        <input aria-labelledby='endDate' type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                    {task?.status &&
                        <div>
                            <label id='status'>Status</label>
                            <select aria-labelledby='status' value={task?.status} onChange={e => setStatus(e.target.value as 'Pending' | 'Completed')}>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    }
                    <button className='buttonCreate' type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
