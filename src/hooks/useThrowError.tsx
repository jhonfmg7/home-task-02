import * as React from 'react';

type Props = {
    inputValue: string
}

const useThrowError = (props: Props) => {

    // Props Extraction
    const { inputValue } = props;

    React.useEffect(() => {
        if (inputValue.length > 10) {
            throw new Error("I crashed!");
        }
    }, [inputValue]);

    return; 
}

export default useThrowError;