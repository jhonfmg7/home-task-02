import * as React from 'react';
import { useSelector } from 'react-redux';

// Interface
import { RootState } from '../types/redux.interface';

type ErrorType = {
    error: string
}

const useThrowError = () => {

    // Redux State Extraction
    const { error } = useSelector<RootState, ErrorType>( state => state.movies );

    React.useEffect(() => {
        if (error) {
            throw new Error(error);
        }
    }, [error]);

    return; 
}

export default useThrowError;