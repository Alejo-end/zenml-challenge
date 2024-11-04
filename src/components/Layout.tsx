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
        <div className="flex flex-col lg:flex-row gap-4 bg-gray-50 overflow-x-hidden">
            {/* Stack List Panel */}
            <div className={`lg:w-1/3 ${selectedStackId ? 'hidden lg:block' : 'block'}`}>
                <div className="p-4">
                    <StackList onSelectStack={handleStackSelect} />
                </div>
            </div>

            {/* Stack Details Panel */}
            <div className="lg:w-2/3">
                {selectedStackId ? (
                    <div className=" rounded-md p-4">
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
