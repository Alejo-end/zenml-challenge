import { useState } from 'react';
import StackList from './StackList';
import StackDetails from './StackDetails';

const Layout = () => {
    const [selectedStackId, setSelectedStackId] = useState<string | null>(null);

    const handleStackSelect = (stackId: string) => {
        setSelectedStackId(stackId);
    };

    const handleBackToStackList = () => {
        setSelectedStackId(null);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 bg-gray-50 overflow-x-hidden min-h-screen">
            {/* Stack List Panel */}
            <div className={`${selectedStackId ? 'hidden lg:block' : 'block'} w-full lg:w-1/3`}>
                <div className="p-4 lg:overflow-y-auto max-h-screen">
                    <StackList onSelectStack={handleStackSelect} />
                </div>
            </div>

            {/* Stack Details Panel */}
            <div className={`${selectedStackId ? 'block' : 'hidden lg:block'} w-full lg:w-2/3`}>
                {selectedStackId ? (
                    <div className="rounded-md p-4">
                        <button
                            className="lg:hidden text-purple-600 mb-4"
                            onClick={handleBackToStackList}
                        >
                            &larr; Back to Stack List
                        </button>
                        <StackDetails stackId={selectedStackId} goBack={handleBackToStackList} />
                    </div>
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
