
export const successToast = (messageApi, content) => {
    messageApi.open({
        type: 'success',
        content,
        className: 'custom-class',
        style: {
            margin: '10px 0px 0px 0px',
            display: 'flex',
            justifyContent: 'center'
        },
    });
};

export const errorToast = (messageApi, content) => {
    messageApi.open({
        type: 'error',
        content,
        className: 'custom-class',
        style: {
            margin: '10px 0px 0px 0px',
            display: 'flex',
            justifyContent: 'center'
        },
    });
};
