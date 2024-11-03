
export type Stack = {
    id: string;
    created: string;
    updated: string;
    user: string;
    project: string;
    is_shared: boolean;
    name: string;
    description: string;
    components: {
        [key: string]: string[]; // Each key is a type (e.g., "orchestrator"), and the value is an array of component IDs
    };
};

export type StackComponent = {
    id: string;
    created: string;
    updated: string;
    user: string;
    project: string;
    is_shared: boolean;
    name: string;
    type: string;
    flavor: string; 
    configuration: Record<string, unknown>; // Dynamic configuration properties
};
