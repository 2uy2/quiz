import videoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
const HomepPage =(props)=>{
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account);


    return (
        <div className="homepage-container">
           <video autoPlay muted loop >
                <source src={videoHomePage}
                        type="video/mp4"
                />
           </video>
           <div className="homepage-content">
                <div className="title-1">There's a bettter way to ask</div>
                <div className="title-2">you don't want to make a boring form. And ypur audience won't answer one. Create a type form instead-and make everyone happy</div>
                <div className="title-3" >
                    <button>Get's started. It's free</button>
                </div>
           </div>
        </div>
    )
}
export default HomepPage;