import {useContext, useEffect} from "react";
import EditorContext from "../../../editor";

import {CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon} from "@heroicons/react/24/outline";


function NotificationHandler() {
    const {store} = useContext(EditorContext);

    useEffect(() => {
        if (store.notification) {
            setTimeout(() => {
                store.setNotification(null);
            }, 3000);
        }
    }, [store.notification]);

    if (!store.notification) return null;

    const notification = store.notification;

    function displayIcon() {
        const iconStyle = "h-6 w-6 mr-2";
        if (notification.type === "success") {
            return <CheckCircleIcon className={iconStyle} />
        } else if (notification.type === "error") {
            return <ExclamationTriangleIcon className={iconStyle} />
        } else if (notification.type === "info") {
            return <InformationCircleIcon className={iconStyle} />
        }
    }

    return (
        <div>
            <div id="toast-top-right"
                 className="
                    flex absolute z-[500] top-5 right-5 items-center p-4
                    space-x-2 text-gray-500 bg-white rounded-lg justify-end"
                 role="alert">
                {displayIcon()}
                <div className="text-sm font-normal m-0">{notification.message}</div>
            </div>
        </div>
    );

}

export default NotificationHandler;