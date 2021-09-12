import "../css/post.css"

export default function Post() {
    return (
        <div className="post" >
            <img 
            className="postImg" 
            src="https://images.pexels.com/photos/3159499/pexels-photo-3159499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="autumn image" />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Art</span>
                    <span className="postCat">Sport</span>
                </div>
                <span className="postTitle">Lorem ipsum dolor sit </span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDescription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod expedita totam quisquam reiciendis doloremque, quam molestiae corrupti explicabo beatae esse maxime eos eveniet, deleniti itaque adipisci iste exercitationem nobis harum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod expedita totam quisquam reiciendis doloremque, quam molestiae corrupti explicabo beatae esse maxime eos eveniet, deleniti itaque adipisci iste exercitationem nobis harum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod expedita totam quisquam reiciendis doloremque, quam molestiae corrupti explicabo beatae esse maxime eos eveniet, deleniti itaque adipisci iste exercitationem nobis harum.
            </p>
        </div>
    )
}
