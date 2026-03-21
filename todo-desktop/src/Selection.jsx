export function Selection(props) {
    let b = props.isSelected; 
    const style1 = {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F3F3",
        fontSize: "large",
        letterSpacing: "2px",
    };
    const style2 = {
        width: "100%",
        height: "5px",
        backgroundColor: "#D98326",
    };
    const style3 = {
        width: "50%",
        height: "7%",
        position: "absolute",
        backgroundColor: "transparent",
        border: "0px"
    };
    
    if(b)
        return(
            <>
                <div style={style1}>
                    <p>{props.name}</p>
                    <div style={style2}></div>
                </div>
            </>
        )
    return(
        <>
            <div style={style1}>
                <button style={style3} onClick={()=> {
                    console.log("Second page unimplemented for now");
                }}/>
                <p style={{color: "#969696"}}>{props.name}</p>
            </div>
        </>
    )
}