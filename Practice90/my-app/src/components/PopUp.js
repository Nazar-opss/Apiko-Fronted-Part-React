export const PopUp = ({ filmLink, closePopUp }) => {
    return(
        <div className="popUp">
            <div onClick={closePopUp} style={{cursor: 'pointer', color: 'red', border: '2px solid'}}>X</div>
            <div>Release Date: {filmLink}</div>
        </div>
    )
}
