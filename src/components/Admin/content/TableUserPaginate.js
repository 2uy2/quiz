import { useState } from "react";
import ReactPaginate from 'react-paginate';



const TableUserPaginate=(props)=>{

    const {listUser,pageCount} = props;
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(parseInt(event.selected) +1);
        props.setCurrentPage(parseInt(event.selected) +1)
        console.log(
        `User requested page number ${event.selected}`
        );

    };
    
    return(
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length>0 && listUser.map((item,index)=>{
                        return(
                             <tr key={`table-user-${index}`}>
                                <td scope="row">{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-secondary" onClick={()=>props.handleClickView(item)}>View</button>
                                    <button className="btn btn-warning mx-3" onClick={()=>props.handleClickBtnUpdate(item)}>Update</button>
                                    <button className="btn btn-danger"  onClick={()=>props.handleClickBtnDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    {listUser && listUser.length===0 && <tr><td colSpan={'5'}>Not found data</td></tr>}
                   
                  
                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}

                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    forcePage={props.currentPage-1}
                />
            </div>
             
            
        </>
    )
}
export default TableUserPaginate;