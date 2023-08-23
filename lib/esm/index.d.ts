import { ReactNode } from 'react';
import { Alert } from './interfaces/Alert.interface';
export declare const AlertProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export declare const useAlerts: () => {
    alerts: Alert[];
    setAlert: (alert: Alert) => void;
    dismissAlert: (id: string) => void;
};
