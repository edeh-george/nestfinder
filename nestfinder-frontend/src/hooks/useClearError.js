import { useEffect } from "react";

const useClearError = (errorMessage, setErrorMessage, delay = 5000) => {
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(''), delay);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, setErrorMessage, delay]);
};
