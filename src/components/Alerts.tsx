import React from 'react'
import { v4 } from 'uuid'
import { AnimatePresence, motion } from 'framer-motion'

import alertsConfig from '../constants/alertsConfig'
import { IconClose } from './Icons'
import { Alert } from '../interfaces/Alert.interface'

export interface Alerts {
    alerts: Alert[];
}

export default function Alerts({ alerts }: Alerts) {
    if (!Array.isArray(alerts)) return null;

    const Alert = (props: Alert) => {
        const { type, message, dismiss, callback } = props;


        const handleCallback = () => {
            if (typeof dismiss === 'function') dismiss();
            if (typeof callback === 'function') callback();
        }


        return (
            <motion.div
                initial={{ opacity: 0, translateY: '50px' }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: '50px' }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                }}
                className={`flex ${alertsConfig.colors[type]} text-white [&>*]:my-auto p-2 h-[50px]`}
            >
                <div className="text-3xl mr-2">{alertsConfig.icons[type]}</div>
                <div className="w-full text-sm">
                    {message}
                    {
                        callback
                            ?
                            <> Please <button onClick={handleCallback} className="underline">Click Here</button></>
                            :
                            <></>
                    }
                </div>
                <button
                    className="text-3xl"
                    onClick={dismiss}
                >
                    <IconClose />
                </button>
            </motion.div>
        )
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 flex flex-col">
            <AnimatePresence>
                {
                    alerts.map(a => <Alert
                        key={v4()}
                        id={a.id}
                        type={a.type}
                        message={a.message}
                        dismiss={a.dismiss}
                        callback={a.callback}
                    />)
                }
            </AnimatePresence>
        </div>
    )
}
