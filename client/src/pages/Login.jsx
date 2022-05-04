import { Link } from "react-router-dom"
import "../css/login.css"

export default function Login() {
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm">
                <label >Email</label>
                <input type="text" className="loginInput" placeholder="Enter your email"/>
                <label >Password</label>
                <input type="password" className="loginInput" placeholder="Enter your password"/>
                <button className="loginButton">
                    <Link to ="./login" className="link">Login</Link>
                </button>
                <button className="loginRegisterButton">
                    <Link to ="./register" className="link">Register</Link>
                </button>
            </form>
        </div>
    )
}
