import { useEffect, useState } from "react";
import { useParams,useLocation} from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss"
import _ from "lodash";
import Question from "./Question";
const DetailQuiz = (props)=>{
    const params = useParams(); //lấy đc tham số trên đườn link URL
    const quizId= params.id;
    const [dataQuiz,setDataQuiz]=useState([]);
    const [index,setIndex] = useState(0);
    const location = useLocation();
    useEffect(()=>{
        fechQuestions();
    },[quizId])
    const fechQuestions = async()=>{
        const res = await getDataQuiz(quizId);
        if(res&&res.EC===0){
            let raw = res.DT;
             let data = _.chain(raw) //cú pháp cách thức khai báo(!impotant)
            // Group the elements of Array based on `color` property
            .groupBy(`id`) //gôp chung id
            // `key` is group's name (color), `value` is the array of objects
            .map((value, key) =>{ 
                
                let answer=[];
                let questionDescription,image = null;
                value.forEach((item,index)=>{
                    if(index===0){
                        questionDescription = item.description; //lấy description 1 lần cho câu hỏi(vì kiểu backend trả về ở answer đều trả décription giống nhau)
                        image = item.image; //tương tụ description
                    }
                    answer.push(item.answers) //bỏ các answer vào 1 mảng
                })
                
                return{ questionId: key, answer,questionDescription,image}}) //trả về dữ liệu đã xử lý
            .value();
            setDataQuiz(data);
           


        }
    }
    const handlePrev=()=>{
        if(index -1<0){
            return
        }
        setIndex(index-1)
        
    }
    const handleNext=()=>{
        if(dataQuiz && dataQuiz.length >index +1){
            setIndex(index+1)
        }
        

    }

    return(
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz: {quizId}{location?.state?.quizTitle}
                </div>
                <hr/>
                <div className="q-body">
                    <img/>
                </div>
                <div className="q-content">
                    <Question data={dataQuiz && dataQuiz.length>0  ? dataQuiz[index]:[]} index={index}/>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={()=>{handlePrev()}}>Previous</button>
                    <button className="btn btn-primary "  onClick={()=>{handleNext()}} >Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz;