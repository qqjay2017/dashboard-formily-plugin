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