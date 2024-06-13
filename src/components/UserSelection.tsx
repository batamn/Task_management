import React, { useState } from 'react';
import { User } from '../interfaces/User';

interface UserSelectionProps {
    onSelectUser: (user: User) => void;
}

const users: User[] = [{
    id: '1',
    name: 'John',
    role: 'owner'
}, {
    id: '2',
    name: 'Micheal',
    role: 'admin'
}, {
    id: '3',
    name: 'Dwight',
    role: 'owner'
}];

const UserSelection: React.FC<UserSelectionProps> = ({ onSelectUser }) => {
    const [selectedUserId, setSelectedUserId] = useState('1');

    const handleSelectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedUserId(event.target.value);
        const currentUser = users.find((user) => user.id === event.target.value);
        if (currentUser !== undefined) onSelectUser(currentUser);
    }

    return (
        <div className="userBox">
            <label>User:</label>
            <select value={selectedUserId} onChange={handleSelectChange}>
                {users.map((user: User) => <option key={user.id} value={user.id}>{user.name} - {user.role}</option>)}
            </select>
        </div >
    );
}

export default UserSelection;