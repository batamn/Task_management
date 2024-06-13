// src/components/TaskTable.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { Task } from '../interfaces/Task';
import { User } from '../interfaces/User';

const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', description: 'Description 1', endDate: '2023-12-31', status: 'Pending', ownerId: '1' },
    { id: '2', title: 'Task 2', description: 'Description 2', endDate: '2023-11-30', status: 'Pending', ownerId: '2' },
];

const mockEditTask = jest.fn();
const mockDeleteTask = jest.fn();
const mockCurrentUser: User = { id: '1', role: 'admin', name: 'John Doe' };

describe('TaskTable', () => {
    it('renders tasks correctly', () => {
        render(<TaskList tasks={mockTasks} onEdit={mockEditTask} onDelete={mockDeleteTask} currentUser={mockCurrentUser} onSort={() => { }} onSearch={() => { }} searchQuery='' />);

        expect(screen.getByText(/task 1/i)).toBeInTheDocument();
        expect(screen.getByText(/description 1/i)).toBeInTheDocument();
        expect(screen.getByText(/task 2/i)).toBeInTheDocument();
        expect(screen.getByText(/description 2/i)).toBeInTheDocument();
    });

    it('calls onEdit and onDelete correctly', () => {
        render(<TaskList tasks={mockTasks} onEdit={mockEditTask} onDelete={mockDeleteTask} currentUser={mockCurrentUser} onSort={() => { }} onSearch={() => { }} searchQuery='' />);

        fireEvent.click(screen.getAllByText(/edit/i)[0]);
        fireEvent.click(screen.getAllByText(/delete/i)[0]);

        expect(mockEditTask).toHaveBeenCalledWith(mockTasks[0]);
        expect(mockDeleteTask).toHaveBeenCalledWith(mockTasks[0].id);
    });

    it('sorts tasks correctly when header is clicked', () => {
        const mockSort = jest.fn();
        render(<TaskList tasks={mockTasks} onEdit={mockEditTask} onDelete={mockDeleteTask} currentUser={mockCurrentUser} onSort={mockSort} onSearch={() => { }} searchQuery='' />);

        fireEvent.click(screen.getByText(/Task name/i));
        expect(mockSort).toHaveBeenCalledWith('title');

        fireEvent.click(screen.getByText(/end date/i));
        expect(mockSort).toHaveBeenCalledWith('endDate');

        fireEvent.click(screen.getByText(/status/i));
        expect(mockSort).toHaveBeenCalledWith('status');
    });
});
