/// <reference types="react" />
import { Alert } from '../interfaces/Alert.interface';
export interface Alerts {
    alerts: Alert[];
}
export default function Alerts({ alerts }: Alerts): JSX.Element | null;
