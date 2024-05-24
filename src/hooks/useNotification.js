import {notification} from "antd";

const useNotification = () => {
    return (type, message) => {
        notification[type]({
            message: message,
        });
    };
};

export default useNotification