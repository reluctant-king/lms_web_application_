import React from 'react'

const PaginationButton = ({ items, itemPerPage, setCurrentPage, currentPage }) => {
    let numberOfPage = []

    for (let i = 1; i <= Math.ceil(items.length / itemPerPage); i++) {
        // console.log(i)
        numberOfPage.push(i)
    }

    const handlePagination = (p) => {
        setCurrentPage(p)
    }

    let page = numberOfPage.map((p, i) => {
        return (
            
            <button className={p===currentPage? "border-none bg-blue-500 border-black text-white px-3 py-1 rounded ms-1":"border border-black text-black px-3 py-1 rounded ms-1"}
                key={i}
                onClick={() => handlePagination(p)}
            >
                {p}
            </button>
        )
    })
    return (
        <div className="text-center mt-3">
            {page}
        </div>
    )
}

export default PaginationButton