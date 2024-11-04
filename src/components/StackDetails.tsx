import { useState } from 'react';
import { useStackByIdQuery } from '../hooks/useStackByIdQuery';
import { useComponentsQuery } from '../hooks/useComponentsQuery';
import ComponentConfiguration from './ComponentsConfiguration';
import { StackComponent } from '../types';

interface StackDetailsProps {
    stackId: string;
    goBack: () => void;
}

const StackDetails = ({ stackId, goBack }: StackDetailsProps) => {
    const { data: stack, isLoading: isStackLoading, isError: isStackError, error: stackError } = useStackByIdQuery(stackId);
    const { data: components, isLoading: isComponentsLoading, isError: isComponentsError, error: componentsError } = useComponentsQuery();

    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

    if (isStackLoading || isComponentsLoading) return <p className="text-center text-gray-600">Loading stack details...</p>;
    if (isStackError) return <p className="text-center text-red-600">Error loading stack: {stackError.message}</p>;
    if (isComponentsError) return <p className="text-center text-red-600">Error loading components: {componentsError.message}</p>;

    // Filter components to only include those that match the IDs in `stack.components`
    const filteredComponentsByType = Object.entries(stack.components).reduce((acc, [type, componentIds]) => {
        const filteredComponents = (componentIds as string[]).map(
            (componentId) => components.find((comp: StackComponent) => comp.id === componentId)
        ).filter(Boolean);

        if (filteredComponents.length > 0) {
            acc[type] = filteredComponents;
        }
        return acc;
    }, {} as Record<string, StackComponent[]>);

    return (
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 gap-4">
            {/* Left Side: Stack Details (visible only when a component is not selected on small screens) */}
            <div className={`${selectedComponentId ? 'hidden lg:block' : 'block'} lg:w-1/2`}>
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">{stack.name}</h2>

                {Object.entries(filteredComponentsByType).map(([type, components]) => (
                    <div key={type} className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800">{type}</h3>
                        <div className="mt-2 space-y-4">
                            {components.map((component) => (
                                <div key={component.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                                    <div>
                                        <span className={`rounded-lg font-semibold my-3 text-white px-2 py-1 text-xs ${component.is_shared ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                            {component.is_shared ? 'Shared' : 'Private'}
                                        </span>
                                        <p className="text-gray-600">Name: {component.name}</p>
                                        <p className="text-purple-600">Flavor: {component.flavor}</p>
                                    </div>
                                    <button
                                        className="bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors focus-visible:outline-purple-700"
                                        onClick={() => setSelectedComponentId(component.id)}
                                    >
                                        Open
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="text-center mt-6">
                    <button
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                        onClick={goBack}
                    >
                        Back to Stack List
                    </button>
                </div>
            </div>

            {/* Right Side: Selected Component Configuration (full width on small screens) */}
            <div className={`${selectedComponentId ? 'block' : 'hidden lg:block'} lg:w-1/2`}>
                {selectedComponentId ? (
                    <div>
                        <button
                            className="lg:hidden text-purple-600 mb-4"
                            onClick={() => setSelectedComponentId(null)}
                        >
                            &larr; Back to Components
                        </button>
                        <ComponentConfiguration componentId={selectedComponentId} close={() => setSelectedComponentId(null)} />
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Select a component to view its configuration</p>
                )}
            </div>
        </div>
    );
};

export default StackDetails;
