import { useEffect, useState } from "react";
import { useParams,useLocation} from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss"
import _ from "lodash";
import Question from "./Question";
import ModalResult from "./ModalResult";
import { set } from "nprogress";
import RightContent from "./Content/RightContent";

const DetailQuiz = (props)=>{
    const params = useParams(); //lấy đc tham số trên đườn link URL
    const quizId= params.id;
    const [dataQuiz,setDataQuiz]=useState([]);
    const [index,setIndex] = useState(0);
    const location = useLocation();
    const [isShowModalResult,setIsShowModalResult] = useState(false);
    const [dataModalResult,setDataModalResult]=useState({})
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
                
                let answers=[];
                let questionDescription,image = null;
                value.forEach((item,index)=>{
                    if(index===0){
                        questionDescription = item.description; //lấy description 1 lần cho câu hỏi(vì kiểu backend trả về ở answer đều trả décription giống nhau)
                        image = item.image; //tương tụ description
                    }
                    item.answers.isSelected = false;
                    answers.push(item.answers) //bỏ các answer vào 1 mảng
                })
                answers = _.orderBy(answers,['id'],['asc']);
                
                return{ questionId: key, answers,questionDescription,image}}) //trả về dữ liệu đã xử lý
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
    const handleCheckbox = (answerId,questionId)=>{
        
        let dataQuizClone = _.cloneDeep(dataQuiz);
        
        let question = dataQuizClone.find(item => +item.questionId === +questionId )
       
        
        if(question && question.answers){
            

            let b =question.answers.map(item =>{
                if(+item.id === +answerId){
                    item.isSelected=!item.isSelected
                   
                }
                return item;
            })
            question.answers=b;
        }
        let index = dataQuizClone.findIndex(item=>+item.questionId ===+questionId )
        if(index > -1){
            dataQuizClone[index]=question;
            setDataQuiz(dataQuizClone);
            
        }
        

    }
    
    const handleFinishQuiz=async()=>{
        let payload={
            quizId:+quizId,
            answers:[]
        };
        let answers = [];
        if(dataQuiz &&dataQuiz.length>0){
            dataQuiz.forEach(question=>{
                
                let questionId=question.questionId;
                let userAnswerId = [];
                question.answer.forEach((item)=>{
                    if(item.isSelected===true){
                        userAnswerId.push(item.id)
                    }

                })
                answers.push({
                    questionId:+questionId,
                    userAnswerId:userAnswerId
                })
            })
            payload.answers=answers;
            
        }
        console.log(payload);
        let res=await postSubmitQuiz(payload);
        if(res && res.EC ===0){
            setDataModalResult({
                countCorrect :res.DT.countCorrect,
                countTotal:res.DT.countTotal,
                quizData:res.DT.quizData
            })
            setIsShowModalResult(true);

        }
        else {
            alert("some thing wrong")
        }

    }
    console.log(dataQuiz)

    return(
        <>  
            
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
                        <Question data={dataQuiz && dataQuiz.length>0  ? dataQuiz[index]:[]} index={index} handleCheckbox={handleCheckbox}/>
                    </div>
                    <div className="footer">
                        <button className="btn btn-secondary" onClick={()=>{handlePrev()}}>Previous</button>
                        <button className="btn btn-primary "  onClick={()=>{handleNext()}} >Next</button>
                        <button className="btn btn-warning "  onClick={()=>{handleFinishQuiz()}} >Finish</button>
                    </div>
                </div>
                <div className="right-content">
                    <RightContent dataQuiz={dataQuiz} handleFinishQuiz={handleFinishQuiz} setIndex={setIndex}/>
                </div>
                <ModalResult show={isShowModalResult} setShow={setIsShowModalResult} dataModalResult={dataModalResult}></ModalResult>
            </div>
        </>
        
    )
}
export default DetailQuiz;