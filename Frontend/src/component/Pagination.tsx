import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const maxButtonsToShow = 7;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
        startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber); // Call the parent component's callback
    };

    const renderPageButton = (pageNumber) => (
        <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`px-3 py-2 mx-1 rounded border border-gray-300 hover:bg-gray-200 ${
                pageNumber === currentPage ? 'bg-blue-500 text-white' : ''
            }`}
        >
            {pageNumber}
        </button>
    );

    const renderEllipsis = () => <span className="px-3 py-2 mx-1">...</span>;

    return (
        <div className="flex justify-center">
            {currentPage > 1 && (
                <button onClick={() => handlePageClick(currentPage - 1)} className="px-3 py-2 mx-1 rounded border border-gray-300 hover:bg-gray-200">
                    Previous
                </button>
            )}

            {startPage > 1 && (
                <>
                  {renderPageButton(1)}
                  {startPage > 2 && renderEllipsis()}
                </>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(renderPageButton)}

            {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && renderEllipsis()}
                  {renderPageButton(totalPages)}
                </>
            )}

            {currentPage < totalPages && (
                <button onClick={() => handlePageClick(currentPage + 1)} className="px-3 py-2 mx-1 rounded border border-gray-300 hover:bg-gray-200">
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
