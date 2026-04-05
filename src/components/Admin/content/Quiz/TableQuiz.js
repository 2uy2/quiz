import {useState,useEffect} from "react"
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdatQuiz from "./ModalUpdateQuiz";

const TableQuiz = ()=>{
    const [listQuiz,setListQuiz] = useState([]);
    const [isShowModalUpdate,setIsShowModalUpdate] = useState(false);
    const [isShowModalDelete,setIsShowModalDelete] = useState(false);
    const[dataUpdate,setDataUpdate] = useState({});
    const[dataDelete,setDataDelete] = useState({});

    useEffect(()=>{
        fetchQuiz();
    },[])
    const fetchQuiz=async()=>{
        setDataDelete({});
        setDataUpdate({});
        let res = await getAllQuizForAdmin();
        if(res && res.EC===0){
            setListQuiz(res.DT)
        }
       
    }
    const handleClickBtnUpdate =(user)=>{
        setIsShowModalUpdate(true);
        setDataUpdate(user)
    }
    const handleClickBtnDelete =(user)=>{
        setIsShowModalDelete(true);
        setDataDelete(user)
    }
    const resetUpdateData = ()=>{
        setDataUpdate({});
    }
    return(
        <>  
            <div>List quizz</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item,index)=>{
                        return(
                            <tr key={`table-quiz-${index}`}>
                                <td >{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{display:"flex", gap:"15px"}}>
                                    <button className="btn btn-warning" onClick={()=>{handleClickBtnUpdate(item)}}>Edit</button>
                                    <button className="btn btn-danger" onClick={()=>{handleClickBtnDelete(item)}}>Delete</button>
                                </td>
                            </tr>

                        )
                    })}

                </tbody>
                <ModalUpdatQuiz show={isShowModalUpdate} setShow={setIsShowModalUpdate} dataUpdate={dataUpdate}  fetchQuiz={fetchQuiz}  resetUpdateData={resetUpdateData}/>
                <ModalDeleteQuiz show={isShowModalDelete} setShow={setIsShowModalDelete} dataDelete={dataDelete} fetchQuiz={fetchQuiz}/>
                
            </table>
        </>
        
    )
}
export default TableQuiz;