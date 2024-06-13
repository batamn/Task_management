export interface Task {
    id: string;
    description: string;
    endDate: string;
    ownerId: string;
    status: 'Pending' | 'Completed' | 'Overdue';
    title: string;
}