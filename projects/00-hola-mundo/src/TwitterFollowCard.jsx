import "./App.css"
import {useState} from "react"
export function TwitterFollowCard ({formatUserName, userName, children, image}){
    const [isFollowing, setIsFollowing] = useState(false)
    const text = isFollowing ? "Siguiendo" : "Seguir";
    const buttonClassName = isFollowing 
    ? "md-followCard-button is-following"
    : "md-followCard-button"
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }
    return(
        <article className="md-twitter-follow-card">
        <header className="md-twitter-follow-card-header">
            <img 
            className="md-twitter-follow-card-avatar"
            alt="Avatar" 
            src={`https://unavatar.io/${image}`}/>
            <div className="md-twitter-follow-card-info">
                <strong>{children}</strong>
                <span>{formatUserName(userName)}</span>
            </div>
        </header>
        <aside>
            <button className={buttonClassName} onClick={handleClick}>{text}</button>
        </aside>
    </article>
    )
}