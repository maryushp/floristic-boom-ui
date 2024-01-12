import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "reactstrap";

interface PaginationListProps {
    currentPage: number,
    currentSize: number,
    totalPages: number,
    totalElems: number
}

const PaginationList: React.FC<PaginationListProps> = ({totalPages, currentPage, currentSize, totalElems}) => {
    const navigate = useNavigate()
    const handlePageChange = (newPage: number) => {
        const queryParameters = new URLSearchParams(window.location.search);
        queryParameters.set('page', newPage.toString());
        queryParameters.set('size', currentSize.toString());

        const updatedQuery = queryParameters.toString();
        navigate(`?${updatedQuery}`, {replace: false});
    };
    const handleSizeChange = (newSize: number) => {
        const queryParameters = new URLSearchParams(window.location.search);
        queryParameters.set('page', "1");
        queryParameters.set('size', newSize.toString());

        const updatedQuery = queryParameters.toString();
        navigate(`?${updatedQuery}`, {replace: false});
    };

    const sizeSelect = totalPages > currentPage && <div className="px-2">
        <select className="form-select bg-success border-info shadow text-white text-" value={currentSize}
                onChange={(e) => handleSizeChange(parseInt(e.target.value))}>
            {totalElems >= 4 && <option>4</option>}
            {totalElems >= 8 && <option>8</option>}
            {totalElems >= 12 && <option>12</option>}
            {totalElems >= 16 && <option>16</option>}
            {totalElems >= 20 && <option>20</option>}

        </select>
    </div>

    return <div className="w-100 d-flex justify-content-center align-items-center py-3">
        {totalPages > 1 ?
            <ul className="pagination text-white">
                {currentPage !== 1 && <Button className="btn btn-success shadow " onClick={() => handlePageChange(1)}>
                    <span>1</span>
                </Button>}
                {currentPage > 4 && <Button className="btn btn-success border-dark disabled ">
                    <span>...</span>
                </Button>}
                {currentPage > 3 &&
                    <Button className="btn btn-success shadow" onClick={() => handlePageChange(currentPage - 2)}>
                        <span>{currentPage - 2}</span>
                    </Button>
                }
                {currentPage > 2 &&
                    <Button className="btn btn-success shadow" onClick={() => handlePageChange(currentPage - 1)}>
                        <span>{currentPage - 1}</span>
                    </Button>}
                <Button className="btn btn-success border-dark disabled">
                    <span>{currentPage}</span>
                </Button>

                {totalPages - currentPage > 1 &&
                    <Button className="btn btn-success shadow" onClick={() => handlePageChange(currentPage + 1)}>
                        <span>{currentPage + 1}</span>
                    </Button>}
                {totalPages - currentPage >= 3 &&
                    <Button className="btn btn-success shadow" onClick={() => handlePageChange(currentPage + 2)}>
                        <span>{currentPage + 2}</span>
                    </Button>}
                {totalPages - currentPage >= 4 &&
                    <Button className="btn btn-success border-dark disabled">
                        <span>...</span>
                    </Button>
                }
                {currentPage !== totalPages &&
                    <Button className="btn btn-success shadow" onClick={() => handlePageChange(totalPages)}>
                        <span> {totalPages}</span>
                    </Button>}
                {sizeSelect}
            </ul>
            :
            <>{sizeSelect}</>
        }
    </div>
};

export default PaginationList;