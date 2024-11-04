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
        // Find components in `components` that match the IDs in `componentIds`
        const filteredComponents = (componentIds as string[]).map(
            (componentId) => components.find((comp: StackComponent) => comp.id === componentId)
        ).filter(Boolean); // Filter out any undefined values if an ID is not found

        if (filteredComponents.length > 0) {
            acc[type] = filteredComponents;
        }
        return acc;
    }, {} as Record<string, StackComponent[]>);

    return (
        <div className="flex max-w-6xl mx-auto p-4">
            {/* Left Side: Stack Details */}
            <div className="w-1/2 pr-10">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    {stack.name}
                </h2>
                {Object.entries(filteredComponentsByType).map(([type, components]) => (
                    <div key={type} className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800">{type}</h3>
                        <div className="mt-2 ">
                            {components.map((component) => (
                                <div key={component.id} className=" justify-between items-center p-2 bg-gray-50 rounded-md space-y-2">
                                    <span className={`rounded-lg font-semibold my-3 text-white px-2 py-1 text-xs ${component.is_shared ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                        {component.is_shared ? 'Shared' : 'Private'}
                                    </span>
                                    <p className="text-gray-600">name: {component.name}</p>
                                    <p className='text-purple-600'>flavor: {component.flavor}</p>
                                    <button
                                        className="bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                                        onClick={() => setSelectedComponentId(component.id)}
                                    >
                                        View Configuration
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

            {/* Right Side: Selected Component Configuration */}
            <div className="w-1/2 pl-4">
                {selectedComponentId ? (
                    <ComponentConfiguration componentId={selectedComponentId} close={() => setSelectedComponentId("")} />
                ) : (
                    <p className="text-center text-gray-500">Select a component to view its configuration</p>
                )}
            </div>
        </div>
    );
};

export default StackDetails;
