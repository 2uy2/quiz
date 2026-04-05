import { useEffect, useState } from 'react';
import Select from 'react-select';
import "./Questions.scss";
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';
import __ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin,postCreateNewQuestionForQuiz,postCreateNewAnswerForQuestion } from "../../../../services/apiServices";
const Questions=(props)=>{
    
    const [selectedQuiz,setSelectedQuiz]=useState({});
     const [isPreviewImage,setIsPreviewImage] = useState(false);
     const [dataImagePreview, setDataImagePreview] = useState({
        title:'',
        url:''

     })
     const[ListQuiz,setListQuiz] = useState([]);
     useEffect(()=>{
        fetchQuiz();
    },[])
    const fetchQuiz=async()=>{
        let res = await getAllQuizForAdmin();
        if(res && res.EC===0){
            let newQuiz=res.DT.map(item =>{
                return {
                    value:item.id,
                    label:`${item.id} - ${item.description}` 
                }
            })
            setListQuiz(newQuiz)
        }
       
    }
    const [questions,setQuestions]=useState(
        [
            {
                id:uuidv4(),
                description:"",
                imageFile:"",
                imageName:'',
                answers:[
                    {   
                        id:uuidv4(),
                        description:"",
                        isCorrect:false
                    }
                ]
            }
        ]
    )
   
    const handleAddRemoveQuestion =(type,id)=>{
       if(type==="ADD"){
            const newQuestion = {
                id:uuidv4(),
                description:"",
                imageFile:"",
                imageName:'',
                answers:[
                    {   
                        id:uuidv4(),
                        description:"",
                        isCorrect:false
                    }
                ]
            }
            setQuestions([...questions,newQuestion])
       }
       if(type==="REMOVE"){
            let questionsClone = __.cloneDeep(questions);
            questionsClone =questionsClone.filter(item=>item.id !==id);
            setQuestions(questionsClone);
       }
    }
    const handleAddRemoveAnswer =(type,questionId,answerid)=>{
        let questionsClone = __.cloneDeep(questions)
        if(type==="ADD"){
            const newAnswer = 
                
                {   
                    id:uuidv4(),
                    description:"",
                    isCorrect:false
                }
            
            
            let index =questionsClone.findIndex(item=>item.id===questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone)
       }
       if(type==="REMOVE"){
            let index =questionsClone.findIndex(item=>item.id===questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item =>item.id !==answerid);
            setQuestions(questionsClone)
       }
    }
    const handleOnChange=(type,questionId,value)=>{
        if(type==="QUESTION"){
            let questionsClone= __.cloneDeep(questions);
            let index = questionsClone.findIndex(item=>item.id===questionId);
            if(index>-1){
                questionsClone[index].description=value
                setQuestions(questionsClone);
            }
        }
    }
    const handleOnChangeFileQuestion=(questionId,event)=>{
        let questionsClone= __.cloneDeep(questions);
            let index = questionsClone.findIndex(item=>item.id===questionId);
            if(index>-1 &&event.target&&event.target.files &&event.target.files[0]){
                questionsClone[index].imageFile=event.target.files[0];
               
                questionsClone[index].imageName=event.target.files[0].name;
                setQuestions(questionsClone);
            }
    }
    const handleAnswerQuestion=(type,answerId,questionId,value)=>{
        let questionsClone= __.cloneDeep(questions);
        let index = questionsClone.findIndex(item=>item.id===questionId);
            if(index>-1){
                questionsClone[index.answer]= questionsClone[index].answers.map(answer=>{
                    if(answer.id === answerId){
                        if(type==="CHECKBOX"){
                            answer.isCorrect=value;
                        }
                        if(type==="INPUT"){
                            answer.description=value
                        }
                        
                    }
                    return answer;
                })
                
                setQuestions(questionsClone);
            }
    }   
    
    const handlePreviewImage = (questionId)=>{
         let questionsClone= __.cloneDeep(questions);
        let index = questionsClone.findIndex(item=>item.id===questionId);
        if(index>-1){
            setDataImagePreview({
                url:URL.createObjectURL(questionsClone[index].imageFile),
                title:questionsClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }
    const handleSubmitQuestionForQuiz=async()=>{
        //todo
        //validate
        
         await Promise.all(questions.map(async(question)=>{
            //submit question 
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile);
            //submit answer
            await Promise.all( question.answers.map(async(answer)=>{
                await postCreateNewAnswerForQuestion(
                    answer.description,answer.isCorrect,q.DT.id)
            }))

          
        }));
      
      
        
    }
   
    return(
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr/>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>select quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={ListQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>Add question:</div>
                {questions && questions.length >0 &&
                questions.map((question,index)=>{
                    return(
                        <div className='q-main mb-4' key={question.id}>
                            <div className=' questions-content'>
                            
                                <div className="form-floating description">
                                    <input 
                                        type="type" 
                                        className="form-control"  
                                        placeholder="name@example.com" 
                                        value={question.description}
                                        onChange={(event)=>handleOnChange("QUESTION",question.id,event.target.value)}
                                    />
                                    <label >question's {index+1}description</label>
                                </div>
                                <div className='group-upload'>
                                    <label htmlFor={`${question.id}`}>
                                        <LuImagePlus className='label-up'></LuImagePlus>
                                    </label>
                                    <input 
                                        id={`${question.id}`}
                                        type='file' 
                                        hidden 
                                        onChange={(event)=>handleOnChangeFileQuestion(question.id,event)}    
                                        />
                                    <span>{question.imageName ? <span  style={{cursor:'pointer'}} onClick={()=> handlePreviewImage(question.id)}>{question.imageName}</span> : "0 file is uploaded"}</span>
                                </div>
                                <div className='btn-add'>
                                    <span onClick={()=>handleAddRemoveQuestion('ADD','')}><FaCirclePlus className='icon-add'/></span>
                                    {questions.length >1 && 
                                        <span onClick={()=>handleAddRemoveQuestion('REMOVE',question.id)}>  <FaMinusCircle className='icon-remove'/></span>}
                                    
                                    
                                </div>
                            
                            </div>
                            {question.answers && question.answers.length>0 && question.answers.map((answer,index)=>{
                                return(
                                    <div key={answer.id} className='answers-content'>
                                        <input 
                                            className="form-check-input iscorrect" 
                                            type="checkbox" 
                                            checked={answer.isCorrect}
                                            onChange={(event)=>handleAnswerQuestion("CHECKBOX",answer.id,question.id,event.target.checked)}  
                                        />
                                        <div className="form-floating answer-name">
                                            <input 
                                                type="text" 
                                                className="form-control"  
                                                placeholder="name@example.com" 
                                                value={answer.description}
                                                 onChange={(event)=>handleAnswerQuestion("INPUT",answer.id,question.id,event.target.value)} 

                                            />
                                            <label >answer {index+1}</label>
                                        </div>
                                        <div className='btn-group'>
                                            <span onClick={()=>handleAddRemoveAnswer("ADD",question.id)}><CiCirclePlus className='icon-add'/></span>
                                            {question.answers.length>1  && 
                                            <span onClick={()=>handleAddRemoveAnswer("REMOVE",question.id,answer.id)} ><CiCircleMinus className='icon-remove'/></span>}
                                            
                                                
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    )                    
                })}
                {questions &&questions.length>0 &&
                    <div>
                        <button
                             className='btn btn-warning'
                             onClick={()=>handleSubmitQuestionForQuiz()}
                             >save question</button>
                    </div>
                }
                {isPreviewImage===true &&
                 <Lightbox image={dataImagePreview.url} title={dataImagePreview.title} onClose={()=>setIsPreviewImage(false)}></Lightbox>
                }

            </div>
            
            
        </div>
    )
}

export default Questions;