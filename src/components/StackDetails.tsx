import React, { useState } from 'react';
import { useStackByIdQuery } from '../hooks/useStackByIdQuery';
import ComponentConfiguration from './ComponentsConfiguration';
import { useComponentByIdQuery } from '../hooks/useComponentByIdQuery';
interface StackDetailsProps {
    stackId: string;
    goBack: () => void;
}

const StackDetails: React.FC<StackDetailsProps> = ({ stackId, goBack }) => {
    const { data: stack, isLoading: isStackLoading, isError: isStackError, error: stackError } = useStackByIdQuery(stackId);
    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
    const { data: component, isLoading: isComponentLoading, isError: isComponentError, error: componentError } =
        useComponentByIdQuery(selectedComponentId,  {},{ enabled: !!selectedComponentId }); // Only fetch when ID is selected

    if (isStackLoading) return <p>Loading stack details...</p>;
    if (isStackError) return <p>Error loading stack: {stackError.message}</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            {selectedComponentId && component ? (
                <ComponentConfiguration component={component} close={() => setSelectedComponentId(null)} />
            ) : (
                <div>
                    <h2 className="text-xl font-semibold text-center mb-4">STACK DETAILS: {stack.name}</h2>
                    {Object.entries(stack.components).map(([type, componentIds]) => (
                        <div key={type} className="border p-4 rounded mb-4">
                            <h3 className="font-semibold">Component: {type}</h3>
                            {componentIds.map((componentId) => (
                                <div key={componentId} className="ml-4 mt-2">
                                    <p>- ID: {componentId}</p>
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                                        onClick={() => setSelectedComponentId(componentId)}
                                    >
                                        View Configuration
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={goBack}
                    >
                        Back to Stack List
                    </button>
                </div>
            )}

            {selectedComponentId && isComponentLoading && <p>Loading component configuration...</p>}
            {selectedComponentId && isComponentError && (
                <p>Error loading component: {componentError?.message}</p>
            )}
        </div>
    );
};

export default StackDetails;
