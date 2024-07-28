import React from 'react'

// ----------------------------------------------------------------------------
// const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1)
// -----------------------------------------------------------------------------
// Array.from(): This is a method in JavaScript that creates a new, shallow-copied Array instance from an array-like 
// or iterable object. In this case, it's being used to generate an array based on the length specified and a mapping function.

// { length: totalPage }: This part specifies the length of the array to be created. It creates an array
//  with a length equal to the value of totalPage. The { length: totalPage } object is passed as the first argument to Array.from().

// (_, i) => i + 1: This is an arrow function used as a mapping function. It takes two parameters:
//     The first parameter _ is a placeholder for the current element value. Since we are only interested in the index and not the value, _ is used as a convention to indicate that the value is ignored.


const RoomPaginator = ({currentPage,totalPage,onPageChange}) => {

    const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1)

  return (
    <nav>
        <ul className='pagination , justify-content-center'>
            {/* It uses the pageNumber.map method to iterate over the pageNumber array and render a list item for each number. */}

            {pageNumbers.map((pageNumbr)=>(    
                <li
                 key={pageNumbr} 
                 className={`page-item ${currentPage === pageNumbr ? "active" : "" }`}>

                     {/* Each list item contains a button with the page number as its text. */}

                     {/* className='page-link': This sets the class of the button to 'page-link'. 
                     The class 'page-link' is typically used in Bootstrap for styling pagination buttons. 
                     It provides styling for pagination navigation links. */}


                    {/* onClick={() => onPageChange(pageNumbr)}: This sets up an event handler for the button's click event. 
                    When the button is clicked, the function onPageChange is called with pageNumbr as its argument.  */}


                <button className='page-link' onClick={()=>(
                    onPageChange(pageNumbr) )}>
                    {pageNumbr}
                </button>

                 </li>

            ))}
        </ul>

    </nav>
  )
}

export default RoomPaginator