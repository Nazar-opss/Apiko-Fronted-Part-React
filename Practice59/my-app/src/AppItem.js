// export default function AppItem({name, description, image}){
export default function AppItem(props){
    return(
        <>
            <h1>{props.name}</h1>
            <img src={props.image} alt=""></img>
            <p>{props.description}</p>
        </>
    )
}