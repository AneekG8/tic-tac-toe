import { useEffect, useRef } from 'react';
import './Cross.css'
const Cross = () => {

    const boxRef = useRef(null);
    const crossRef = useRef(null)

    useEffect(()=>{
        const box = boxRef.current
        const cross = crossRef.current

        cross.style.fontSize = box.offsetWidth * 0.8 + 'px';
    })
    
    return ( 
        <div className="h-100 w-100 p-2 d-flex justify-content-center align-items-center" ref={boxRef}>
            <i className="material-icons" style={{fontSize: "0"}} ref={crossRef}>close</i>
        </div>
     );
}
 
export default Cross;