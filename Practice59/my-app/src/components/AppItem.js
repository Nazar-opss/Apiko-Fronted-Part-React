export default function AppItem(props){
    return(
        <>
            <h2>{props.name}</h2>
            {props.image}
            {props.description}
        </>
    )
}