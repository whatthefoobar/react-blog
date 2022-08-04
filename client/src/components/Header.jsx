// import '../css/header.css';

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSmall">Title blog</span>
        <span className="headerTitleLarge">Blog</span>
      </div>
      <div className="headerImg">
        <img
          src="https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="nature"
        />
      </div>
    </div>
  );
}
