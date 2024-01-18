import {useEffect, useState} from 'react';
import {isAxiosError} from 'axios';
import {useLocation} from "react-router-dom";
import {CHANGE_THE_CRITERIA} from "../utils/constants";
import {Filter} from "../utils/types";

interface UseDataProps {
    defaultSize: number,
    getFunction: (page: number, size: number, filters: any) => Promise<any>,
    filters?:Filter;
}

const useDataHook = ({defaultSize, getFunction, filters}: UseDataProps) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElems, setTotalElems] = useState(0);
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    let currentPage = page ? parseInt(page) : 1
    const size = queryParams.get("size");
    const currentSize = size ? parseInt(size) : defaultSize
    const [error, setError] = useState('');
    const createFilter = () => {

    }
    const getData = async (page: number, size: number, filters: any) => {
        try {
            setError('');
            setIsLoading(true);

            const result = await getFunction(page, size, filters);

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
        setError("")
        getData(currentPage, currentSize, filters);

    }, [getFunction, currentPage, currentSize, location]);

    return {
        data,
        isLoading,
        totalPages,
        totalElems,
        currentPage,
        currentSize,
        error
    };
};

export default useDataHook;
