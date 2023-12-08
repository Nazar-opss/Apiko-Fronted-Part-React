export default function AppWrapper({title, children}){
    return (
    <div className="AppWrapper">
        <h1>{title}</h1>
        <div className="turtles">
            {children}
        </div>
    </div>
    )
}