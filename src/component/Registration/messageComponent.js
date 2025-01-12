import React, {useEffect} from 'react'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MessageComponent(props) {
    useEffect(() => {
        notify();
        setTimeout(props.removeMessage,5000);
    })
    const notify = () => toast(
        props.message, 
        {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        }
    );
    return (
        <>
            <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </>
    );
}

export default MessageComponent;