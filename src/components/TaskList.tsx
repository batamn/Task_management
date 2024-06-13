import React, { useEffect } from 'react';
import { Task } from '../interfaces/Task';
import { User } from '../interfaces/User';
import { format } from 'date-fns';

interface TaskTableProps {
    currentUser: User;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onSort: (criteria: string) => void;
    onSearch: (searchQuery: string) => void;
    searchQuery: string;
    tasks: Task[];
}

const TaskList: React.FC<TaskTableProps> = ({ currentUser, onEdit, onDelete, onSort, onSearch, searchQuery, tasks }) => {

    return (
        <div className='taskList'>
            <h2>Task List</h2>
            <div className="searchBox">
                <label id='search'>Search</label>
                <input aria-labelledby='search' value={searchQuery} onChange={e => onSearch(e.target.value)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => onSort('title')}>Task name</th>
                        <th>Description</th>
                        <th onClick={() => onSort('endDate')}>End Date</th>
                        <th onClick={() => onSort('status')}>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} style={{ color: task.status === 'Overdue' ? 'red' : 'black' }}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{format(new Date(task.endDate), 'yyyy-MM-dd')}</td>
                            <td>{task.status}</td>
                            <td>
                                {currentUser.role === 'admin' || currentUser.id === task.ownerId ? (
                                    <>
                                        <button onClick={() => onEdit(task)}>Edit</button>
                                        <button className='buttonDelete' onClick={() => onDelete(task.id)}>Delete</button>
                                    </>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
