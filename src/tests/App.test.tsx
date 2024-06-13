// src/App.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders App component correctly', () => {
    render(<App />);
    
    expect(screen.getByText(/task manager/i)).toBeInTheDocument();
  });

  it('allows creating a new task', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    
    fireEvent.change(screen.getByLabelText(/task name/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2023-12-31' } });
    fireEvent.click(screen.getByText(/save/i));
    
    expect(screen.getByText(/new task/i)).toBeInTheDocument();
    expect(screen.getByText(/new description/i)).toBeInTheDocument();
  });

  it('allows searching for tasks by title', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    
    fireEvent.change(screen.getByLabelText(/task name/i), { target: { value: 'Task 1' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description 1' } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2023-12-31' } });
    fireEvent.click(screen.getByText(/save/i));

    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'Task 1' } });
    
    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/task 2/i)).toBeNull();
  });

  it('allows sorting tasks', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/create task/i));

    fireEvent.change(screen.getByLabelText(/task name/i), { target: { value: 'Laundry 3' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description 1' } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2023-12-31' } });
    fireEvent.click(screen.getByText(/save/i));

    fireEvent.click(screen.getByText(/create task/i));
    fireEvent.change(screen.getByLabelText(/task name/i), { target: { value: 'Laundry 1' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description 2' } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2023-12-30' } });
    fireEvent.click(screen.getByText(/save/i));

    fireEvent.click(screen.getByText(/task name/i));
    const tasks = screen.getAllByText(/laundry/i);
    expect(tasks[0]).toHaveTextContent('Laundry 1');
    expect(tasks[1]).toHaveTextContent('Laundry 3');
  });
});
