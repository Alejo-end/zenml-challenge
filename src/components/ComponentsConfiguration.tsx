import React from 'react';
import { useComponentByIdQuery } from '../hooks/useComponentByIdQuery';

interface ComponentConfigurationProps {
  componentId: string;
  close: () => void;
}

const ComponentConfiguration: React.FC<ComponentConfigurationProps> = ({ componentId, close }) => {
  const { data: component, isLoading, isError, error } = useComponentByIdQuery(componentId);

  if (isLoading) return <p>Loading configuration...</p>;
  if (isError) return <p>Error loading configuration: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 border rounded">
      <h2 className="text-xl font-semibold text-center mb-4">CONFIGURATION: {component.name}</h2>
      <ul className="space-y-2">
        {Object.entries(component.configuration).map(([key, value]) => (
          <li key={key} className="flex justify-between">
            <span className="font-semibold">{key}:</span>
            <span>{String(value)}</span>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        onClick={close}
      >
        Close
      </button>
    </div>
  );
};

export default ComponentConfiguration;