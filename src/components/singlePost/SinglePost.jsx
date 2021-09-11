import "./singlepost.css"

export default function SinglePost() {
    return (
        <div className="singlePost" >
            <div className="singlePostWrapper">
                <img src="https://images.pexels.com/photos/1846608/pexels-photo-1846608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" className="singlePostImg" />
                <h1 className="singlePostTitle">Lorem ipsum dolor sit amet
                <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit"></i>
                <i className="singlePostIcon far fa-trash-alt"></i>
                </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor" >Author: <b>Sam P. </b></span>
                    <span className="singlePostDate" >Date: <b>1 hour ago </b></span>
                </div>
                <p className="singlePostDescription">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sapiente enim eaque quis illo itaque! Qui, quaerat! Dicta, laborum illo? Doloribus impedit officia rem optio non ipsam qui inventore ab!Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sapiente enim eaque quis illo itaque! Qui, quaerat! Dicta, laborum illo? Doloribus impedit officia rem optio non ipsam qui inventore ab!Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sapiente enim eaque quis illo itaque! Qui, quaerat! Dicta, laborum illo? Doloribus impedit officia rem optio non ipsam qui inventore ab!Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sapiente enim eaque quis illo itaque! Qui, quaerat! Dicta, laborum illo? Doloribus impedit officia rem optio non ipsam qui inventore ab!Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sapiente enim eaque quis illo itaque! Qui, quaerat! Dicta, laborum illo? Doloribus impedit officia rem optio non ipsam qui inventore ab!
                </p>

            </div>
        </div>
        
    )
}
