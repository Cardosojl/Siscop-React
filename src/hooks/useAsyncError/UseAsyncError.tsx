import React, { useCallback, useState } from 'react';

const useAsyncError = () => {
    const [, setError] = useState();
    return useCallback(
        (e: Error) => {
            setError(() => {
                throw e;
            });
        },
        [setError]
    );
};

export default useAsyncError;
