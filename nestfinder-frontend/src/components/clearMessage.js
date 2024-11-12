import { useEffect } from 'react';

const useClearError = (errorMessage, setErrorMessage, duration = 5000) => {
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, setErrorMessage, duration]);
};

export default useClearError;
