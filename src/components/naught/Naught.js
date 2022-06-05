import { useEffect,useRef } from "react";

const Naught = () => {

    const boxRef = useRef(null);
    const naughtRef = useRef(null)

    useEffect(()=>{
        const box = boxRef.current
        const naught = naughtRef.current

        naught.style.fontSize = box.offsetWidth * 0.8 + 'px';
    })

    return ( 
        <div className="h-100 w-100 p-2 d-flex justify-content-center align-items-center" ref={boxRef}>
            <i className="material-icons naught" style={{fontSize: "0"}} ref={naughtRef}>lens</i>
        </div>
    );
}
 
export default Naught;