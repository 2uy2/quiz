import { BrowserRouter ,Route, Routes } from "react-router-dom"; //giúp điề hướng trang;
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import HomepPage from './components/Home/HomePage';
import ManageUser from './components/Admin/content/ManageUser';
import DashBoard from './components/Admin/content/Dashboard';
import Login from './components/Auth/Login';
import { ToastContainer ,Bounce} from 'react-toastify';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/content/Quiz/ManageQuiz";
const NotFound = ()=>{
    return (
        <div className="container mt-3 alert alert-danger">
            404 Not found data with your current URl
        </div>
    )
}
const Layout = (props)=>{
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomepPage />} />
                    <Route path="/users" element={ <ListQuiz/>} />              
                </Route>
                <Route path="/quiz/:id" element={ <DetailQuiz/>} />
                <Route path="admins" element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser/>}/>
                    <Route path='manage-quizzes' element={<ManageQuiz/>}/>

                </Route>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<NotFound/>}/>
                

                
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </>
    )
}
export default Layout;