// src/components/StackList.tsx
import React from 'react';
import { useStacksQuery } from '../hooks/useStacksQuery';

const StackList: React.FC = () => {
    const { data: stacks, isLoading, isError, error } = useStacksQuery();

    if (isLoading) return <p>Loading stacks...</p>;
    if (isError) return <p>Error loading stacks: {error.message}</p>;

    return (
        <div>
            <h1>Stack List</h1>
            <ul>
                {stacks?.map((stack: any) => (
                    <li key={stack.id}>{stack.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default StackList;
