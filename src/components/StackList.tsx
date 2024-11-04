import { useState } from 'react';
import { useStacksQuery } from '../hooks/useStacksQuery';
import { Stack } from '../types';

interface StackListProps {
    onSelectStack: (stackId: string) => void;
}

const StackList = ({ onSelectStack }: StackListProps) => {
    const { data: stacks, isLoading, isError, error } = useStacksQuery();
    const [search, setSearch] = useState('');
    const [selectedStackId, setSelectedStackId] = useState('');

    if (isLoading) return <p>Loading stacks...</p>;
    if (isError) return <p>Error loading stacks: {error.message}</p>;

    // Filter stacks based on search input
    const filteredStacks = stacks?.filter((stack: Stack) =>
        stack.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleStackSelect = (stackId: string) => {
        setSelectedStackId(stackId);
        onSelectStack(stackId);
    };

    return (
        <div className="">
            {/* Sticky Search Bar */}
            <div className="sticky top-0 bg-gray-200 p-4 rounded z-10">
                <h2 className="text-2xl font-semibold text-center text-purple-700">STACK LIST</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mt-2 p-2 rounded border bg-gray-50 text-gray-800 hover:border-purple-700 focus-visible:outline-purple-400"
                />
            </div>

            {/* Stack Items */}
            <div className="mt-4 space-y-4">
                {filteredStacks?.map((stack: Stack) => (
                    <div
                        key={stack.id}
                        className={`border p-4 rounded-lg shadow-sm bg-white cursor-pointer ${selectedStackId === stack.id ? 'border-purple-700' : 'border-gray-200'}`}
                        onClick={() => handleStackSelect(stack.id)}
                    >
                        <div className='flex'>
                            <h3 className="flex-auto text-lg font-semibold text-purple-600 text-start">{stack.name}</h3>
                            <span className={`rounded-lg font-semibold my-3 text-white px-2 py-1 text-xs ${stack.is_shared ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                {stack.is_shared ? 'Shared' : 'Private'}
                            </span>
                        </div>
                        <p className="text-gray-600"><b className='text-purple-700'>Components: </b>{Object.keys(stack.components).join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StackList;
