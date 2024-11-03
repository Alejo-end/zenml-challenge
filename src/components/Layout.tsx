import React, { useState } from 'react';
import StackList from './StackList';
import StackDetails from './StackDetails';

const Layout: React.FC = () => {
    const [selectedStackId, setSelectedStackId] = useState<string | null>(null);

    const handleStackSelect = (stackId: string) => {
        setSelectedStackId(stackId);
    };

    const handleBackToStackList = () => {
        setSelectedStackId(null);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-6 bg-gray-50">
            {/* Stack List Panel */}
            <div className={`lg:w-1/3 ${selectedStackId ? 'hidden lg:block' : 'block'}`}>
                <StackList onSelectStack={handleStackSelect} />
            </div>

            {/* Stack Details Panel */}
            <div className="lg:w-2/3">
                {selectedStackId ? (
                    <StackDetails stackId={selectedStackId} goBack={handleBackToStackList} />
                ) : (
                    <div className="text-center text-gray-500 p-4">
                        Select a stack from the list to view its details
                    </div>
                )}
            </div>
        </div>
    );
};

export default Layout;
