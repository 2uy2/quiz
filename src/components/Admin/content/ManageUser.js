import ModalCreateUser from "./ModelCreateUser";



const ManageUser = (props) =>{
    return (
        <div className="manage-user-container"> 
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div>
                    <button>add new user</button>
                </div>
                <div>
                    table users 
                    <ModalCreateUser/>
                </div>
            </div>
        </div>
    )
}
export default ManageUser;