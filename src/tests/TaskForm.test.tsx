import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { User } from '../interfaces/User';
import { Task } from '../interfaces/Task';

const mockTask: Task = {
    id: '1',
    title: 'Task 1',
    description: 'Description for Task 1',
    endDate: '2022-12-31',
    status: 'Pending',
    ownerId: 'user1',
};

const mockUser: User = {
    id: 'user1',
    name: 'John Doe',
    role: 'owner',
};

describe('TaskForm Component', () => {
    it('renders form fields correctly', () => {
        const { getByLabelText, getByPlaceholderText } = render(
            <TaskForm task={null} onSave={jest.fn()} onClose={jest.fn()} currentUser={mockUser} />
        );

        expect(getByLabelText('Task Name')).toBeInTheDocument();
        expect(getByPlaceholderText('What is the name of the task?')).toBeInTheDocument();
        expect(getByLabelText('Description')).toBeInTheDocument();
        expect(getByPlaceholderText('Describe the task and include any information required')).toBeInTheDocument();
        expect(getByLabelText('Task End Date')).toBeInTheDocument(); 
        expect(screen.queryByLabelText('Status')).not.toBeInTheDocument(); // Status field should not be present for a new task
    
    });

    it('submits a new task correctly', () => {
        const onSave = jest.fn();
        const { getByLabelText, getByText } = render(
            <TaskForm task={null} onSave={onSave} onClose={jest.fn()} currentUser={mockUser} />
        );

        fireEvent.change(getByLabelText('Task Name'), { target: { value: 'New Task' } });
        fireEvent.change(getByLabelText('Description'), { target: { value: 'Description for New Task' } });
        fireEvent.change(getByLabelText('Task End Date'), { target: { value: '2022-12-31' } });
        fireEvent.submit(getByText('Save'));

        expect(onSave).toHaveBeenCalledWith({
            id: expect.any(String),
            title: 'New Task',
            description: 'Description for New Task',
            endDate: '2022-12-31',
            status: 'Pending',
            ownerId: 'user1',
        });
    });

    it('resets form fields after submission', () => {
        const { getByLabelText, getByText } = render(
            <TaskForm task={mockTask} onSave={jest.fn()} onClose={jest.fn()} currentUser={mockUser} />
        );

        fireEvent.change(getByLabelText('Task Name'), { target: { value: 'Updated Task Name' } });
        fireEvent.submit(getByText('Save'));

        expect(getByLabelText('Task Name')).toHaveValue('');
        expect(getByLabelText('Description')).toHaveValue('');
        expect(getByLabelText('Task End Date')).toHaveValue(new Date().toJSON().slice(0, 10));
    });

});