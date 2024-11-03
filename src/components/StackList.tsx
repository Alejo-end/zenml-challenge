import React, { useState } from 'react';
import { useStacksQuery } from '../hooks/useStacksQuery';
import StackDetails from './StackDetails';
import { Stack } from '../types';
const StackList: React.FC = () => {
    const { data: stacks, isLoading, isError, error } = useStacksQuery();
    const [search, setSearch] = useState('');
    const [selectedStack, setSelectedStack] = useState<string | null>(null);

    if (isLoading) return <p>Loading stacks...</p>;
    if (isError) return <p>Error loading stacks: {error.message}</p>;

    // Filter stacks based on search input
    const filteredStacks = stacks?.filter((stack: Stack) =>
        stack.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="max-w-2xl mx-auto p-4">
            {selectedStack ? (
                <StackDetails stackId={selectedStack} goBack={() => setSelectedStack(null)} />
            ) : (
                <div>
                    <div className="p-4 rounded bg-gray-300">
                        <h2 className="text-xl font-semibold text-center text-gray-900">STACK LIST</h2>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full mt-2 p-2 rounded border bg-gray-200 text-gray-900"
                        />
                    </div>
                    <div className="mt-4 space-y-4">
                        {filteredStacks?.map((stack: Stack) => (
                            <div key={stack.id} className="border p-4 rounded">
                                <h3 className="text-lg font-semibold">{stack.name}</h3>
                                <p>{stack.is_shared ? 'Shared' : 'Private'}</p>
                                <p>Components: [{Object.keys(stack.components).join(', ')}]</p>
                                <button
                                    className="mt-2 border-purple-600 text-white px-4 py-2 rounded hover:border-"
                                    onClick={() => setSelectedStack(stack.id)}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StackList;
