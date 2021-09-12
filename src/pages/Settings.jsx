import Sidebar from "../components/Sidebar"
import "../css/settings.css"

export default function Settings() {
    return (
        <div className="settings">
            <div className="settingsWrapper">
               <div className="settingsTitle">
                   <span className="settingsUpdateTitle">Update your account</span>
                   <span className="settingsDeleteTitle">Delete your account</span>
               </div>
               <form className="settingsForm">
                   <label htmlFor="">Profile Picture</label>
                   <div className="settingsPP">
                       <img className="settingsImg" src="https://images.pexels.com/photos/969295/pexels-photo-969295.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                       <label htmlFor="fileInput">
                       <i className=" settingsPPIcon far fa-user-circle"></i>
                       </label>
                       <input type="file" id="fileInput" style={{display:"none"}}/>
                    </div>
                       <label >Username</label>
                       <input type="text" placeholder="Joseph" />
                       <label >Email</label>
                       <input type="email" placeholder="joseph@gmail.com" />
                       <label >Password</label>
                       <input type="password" />
                       <button className="settingsSubmit">Update</button>

                    
               </form>
            </div>
            <Sidebar/>
            
        </div>
    )
}
