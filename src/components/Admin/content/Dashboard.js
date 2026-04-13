import { useEffect, useState } from "react";
import "./DashBoard.scss"
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import { getOverView } from "../../../services/apiServices";

const DashBoard = (props) =>{
    const [dataOverView,setDataOverView] =  useState({});
    const [dataChart,setDataChart]=useState([]);
    useEffect(()=>{
        fetchDataOverView();
        console.log(dataOverView)
    },[])
    const fetchDataOverView = async()=>{
        let res = await getOverView();
        console.log(res.DT)
        if(res && res.EC===0){
            
            setDataOverView(res.DT)
            setDataChart(res.DT.others)
            //process data chart
            let Qz,Qs,As = 0;
            Qz=res?.DT?.others?.countQuiz??0;
            Qs=res?.DT?.others?.countQuestions??0;
            As=res?.DT?.others?.countAnswers??0;
         
            const data = [
            {
                name: 'Quizzes',
                Qz: Qz
                
            },
            {
                name: 'Questions',
                Qs: Qs,
            
            },
            {
                name: 'Answers',
                As: As,
                
            },
            
            ];
            setDataChart(data)
          
        
        }
    }

    return (
        <div className="dashboard-container">
            <div className="title">
                Analytics DashBoard
            </div>
            <div className="content">
                <div className="c-left">
                    <div className="child">
                        <span className="text-1">Total users</span>
                        <span className="text-2">{dataOverView&&dataOverView.users&&dataOverView.users.total ? <>{dataOverView.users.total}</>:<>0</>}</span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Quizzes</span>
                        <span className="text-2">{dataOverView&&dataOverView.others&&dataOverView.others.countQuiz ? <>{dataOverView.others.countQuiz}</>:<>0</>}</span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Questions</span>
                        <span className="text-2">{dataOverView&&dataOverView.others&&dataOverView.others.countQuestions ? <>{dataOverView.others.countQuestions}</>:<>0</>}</span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Answers</span>
                        <span className="text-2">{dataOverView&&dataOverView.others&&dataOverView.others.countAnswers ? <>{dataOverView.others.countAnswers}</>:<>0</>}</span>
                    </div>
                </div>
                <div className="c-right">
                     <BarChart style={{ width: '100%', maxWidth: '600px', maxHeight: '60vh', aspectRatio: 1.618 }} responsive data={dataChart}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" />
                        <YAxis width="auto" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Qz" fill="#a8da21" isAnimationActive={true} />
                        <Bar dataKey="Qs" fill="#82ca9d" isAnimationActive={true} />
                        <Bar dataKey="As" fill="#3e32e6" isAnimationActive={true} />
                       
                    </BarChart>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;