import React, { useState, useContext, ReactNode } from 'react';
import { v4 } from 'uuid';
import Alerts from './components/Alerts';
import { Alert } from './interfaces/Alert.interface';

interface AlertContextType {
    alerts: Alert[];
    setAlert: (alert: Alert) => void;
    dismissAlert: (id: string) => void;
}

// Create the alert context
const AlertContext = React.createContext<AlertContextType | null>(null);

// Create the alert provider
export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const setAlert = ({ message, type = 'error', callback, timeout = 0 }: Alert) => {
        const id = v4();
        const newAlert: Alert = {
            id,
            message,
            type,
            dismiss: () => {
                dismissAlert(id);
            },
            callback,
        };
        setAlerts(old => [...old, newAlert]);
        // Auto-dismiss if delay > 0
        if (timeout > 0) {
            setTimeout(() => {
                dismissAlert(id);
            }, timeout);
        }
    };

    // Dismiss alert by its id
    const dismissAlert = (id: string) => {
        setAlerts(oldVal => oldVal.filter(a => a.id !== id));
    };

    return (
        <AlertContext.Provider value={{ alerts, setAlert, dismissAlert }}>
            {children}
            <Alerts alerts={alerts} />
        </AlertContext.Provider>
    );
};

// Create the useAlerts hook
export const useAlerts = () => {
    const { alerts, setAlert, dismissAlert } = useContext(AlertContext)!;

    return {
        alerts,
        setAlert,
        dismissAlert,
    };
};
