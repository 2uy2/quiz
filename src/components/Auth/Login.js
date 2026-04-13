import { useState } from "react";
import  "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux" 
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner6 } from "react-icons/im";
import Language from "../Header/Language";
const Login = (props)=>{

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    const disPatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    const handleLogin=async()=>{
        //validate
        const isValidateEmail = validateEmail(email);
        if(!isValidateEmail){
            toast.error("invalid email");
            return;
        }
        if(!password){
            toast.error("invalid password");
            return;
        }
        setIsLoading(true);
        //submit api
        let data = await postLogin(email,password);
      
        if(data&& data.EC===0){
            disPatch(doLogin(data))
            toast.success(data.EM);
            setIsLoading(false) // phải để trc navigate vì nếu để sau thì k còn component login nữa(unmount) nên sẽ gây ra bug
            navigate("/")
            
           
          }
          if(data&& data.EC!==0){
            toast.error(data.EM);
            setIsLoading(false)
            
          }
    }
    //xử lý khi nhân enter để đăng nhập
    const handleKeyDown = (event)=>{
        if(event.key==="Enter"){
            handleLogin();
        }
    }
    return (
        <div className="login-center">
            <div className="header">
                <span>Dont' have an account yet ?</span>
                <button onClick={()=>navigate("/register")}>sign up</button>
                <Language/>
            </div>
            <div className="title col-4 mx-auto">Quý đz</div>
            <div className="welcome col-4 mx-auto">
                Who is this ?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input type={"email"} className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type={"password"} className="form-control " value={password} onChange={(e)=>setPassword(e.target.value)} onKeyDown={(event)=>handleKeyDown(event)}/>
                </div>
                <span className="forgot-password">Forgot password ?</span>
                <div>
                    <button className="btn-submit" onClick={()=>handleLogin()} disabled={isLoading}> {isLoading===true? <ImSpinner6 className="loaderIcon"/> : ""}<span>login</span></button>
                </div>
                <div className="text-center">
                    <span className="back" onClick={()=>navigate("/")}> &#60;&#60; go to HomepPage</span>
                </div>
                
            </div>
            
        </div>
    )
}
export default Login;