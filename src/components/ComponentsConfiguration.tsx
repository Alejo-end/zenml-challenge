import { useComponentByIdQuery } from '../hooks/useComponentByIdQuery';

interface ComponentConfigurationProps {
  componentId: string;
  close: () => void;
}

const ComponentConfiguration = ({ componentId, close }: ComponentConfigurationProps) => {
  const { data: component, isLoading, isError, error } = useComponentByIdQuery(componentId);

  if (isLoading) return <p className="text-center text-gray-600">Loading configuration...</p>;
  if (isError) return <p className="text-center text-red-600">Error loading configuration: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded">
      <h2 className="text-xl font-semibold text-center mb-4 text-purple-700">CONFIGURATION: {component.name}</h2>
      <ul className="space-y-2">
        {Object.entries(component.configuration).map(([key, value]) => (
          <li key={key} className="flex justify-between">
            <span className="font-semibold">{key}:</span>
            <span>{String(value)}</span>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-gray-200 rounded"
        onClick={close}
      >
        Close
      </button>
    </div>
  );
};

export default ComponentConfiguration;
