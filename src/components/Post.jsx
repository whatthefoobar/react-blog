import "../css/post.css"


export default function Post(props) {

    return (
        <div className="post">
            <img className="postImg" src={props.image}  alt="autumn image" />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Art</span>
                    <span className="postCat">Sport</span>
                </div>
                <span className="postTitle">{props.title}</span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDescription">{props.description} </p>
        </div>
    )
}
