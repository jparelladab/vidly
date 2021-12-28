import React from 'react';



const Pagination = (props) => {
  const {onPageChange, currentPage} = props;
  const pages = Math.ceil(props.itemsCount / props.pageSize);
  const pagesArr = [];

  for (let i = 0; i < pages ; i++){
    pagesArr.push(i);
  }

  return(
    <nav className="mt-4" aria-label="Page navigation example">
      <ul className="pagination">
        { pagesArr.map (page =>
          <li key={ page }  className={ page === currentPage ? 'page-item active' : 'page-item' }><a href="#" onClick={ () => onPageChange(page) } className="page-link">{page}</a></li>
        )}
      </ul>
    </nav>
  );
}






export default Pagination;




