export interface Alert {
    id?: string;
    message: string;
    type: 'success' | 'warn' | 'error' | 'info';
    callback?: () => void;
    timeout?: number;
    dismiss?: () => void;
}