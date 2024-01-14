import {useEffect, useState} from 'react';
import {isAxiosError} from 'axios';
import {useLocation} from "react-router-dom";

interface UseDataProps {
    getFunction: (page: number, size: number) => Promise<any>;
}

const useDataHook = ({getFunction}: UseDataProps) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElems, setTotalElems] = useState(0);
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    let currentPage = page ? parseInt(page) : 1
    const size = queryParams.get("size");
    const currentSize = size ? parseInt(size) : Math.floor((window.innerWidth * 0.8) / 300) * 2
    const [error, setError] = useState('');
    const getData = async (page: number, size: number) => {
        try {
            setError('');
            setIsLoading(true);

            const result = await getFunction(page, size);

            setTotalPages(result.totalPages);
            setTotalElems(result.totalElements);

            result.content.length > 0
                ? setData(result.content)
                : setError(CHANGE_THE_CRITERIA);
        } catch (e) {
            if (isAxiosError(e) && e.response) setError(e.response.data.detail);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData(currentPage, currentSize);
    }, [getFunction, currentPage, currentSize, location]);

    return {
        data,
        isLoading,
        totalPages,
        totalElems,
        currentPage,
        currentSize,
        error,
    };
};

export default useDataHook;
