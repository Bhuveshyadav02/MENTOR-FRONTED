import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import HomeComponent from './component/HomeComponent';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useEffect } from 'react';
const store = ConfigureStore();

function App() {
  useEffect(() => {
    // Trigger a toast notification as soon as the page loads
    toast.success('Credentials')
    toast.success('STUDENT ID-en22cs301280 PASSWORD 12345678')
    toast.success('FACULTY ID-abcdef PASSWORD 123456789' )
      // Toast will stay for 10 seconds
    
  }, []); 
  return (   
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <HomeComponent/>
          <ToastContainer
                  position="top-right"           // Position of the toast
                  autoClose={5000}               // Time in ms before auto-close
                  hideProgressBar={false}        // Show or hide progress bar
                  newestOnTop={false}            // Show newest toast on top
                     closeOnClick                   // Close on click
                   rtl={false}                    // Right-to-left layout
                  pauseOnFocusLoss               // Pause auto-close on focus loss
                draggable                      // Allow to drag toasts
               pauseOnHover                   // Pause on hover
                   theme="colored"                // Theme: 'light', 'dark', 'colored'
/>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
