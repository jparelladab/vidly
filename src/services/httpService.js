import axios from 'axios';

//if it's a export default, you can rename it here
import logger from './logService';

// interceptors work with success and error. here we just focus on the error
axios.interceptors.response.use(null, error => {
    console.log('INTERCEPTOR');
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    // At the try/catch we only handle the expected errors
    // Here we handle all unexpected errors
    if(! expectedError){
        logger.log(error);
        // Sentry.captureMessage('An unexpected error occurred'); // friendly message
      // there's no use in console.log because this happens in the client and we don't have access to it
    } 
      return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};