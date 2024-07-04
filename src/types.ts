export type FormItemComponentProps<V = any> = {
    onChange?: (v: V) => void;
    value?: V;
    onBlur?: any;
}

export interface ApiGroupItem {
    id: string;
    createdAt: string;
    name: string;
}

export interface SchemComponentQueryProps {
    query?: {
        quarterSelect?: {
            quarterId?: string;
            quarterName?: string;
        };
        projectSelect?: {
            projectId?: string;
            projectName?: string;
        }
    }
}