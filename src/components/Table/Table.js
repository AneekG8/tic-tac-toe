import { useState,useEffect } from 'react';
import Cross from '../cross/Cross';
import Naught from '../naught/Naught';
import './Table.css'
import {check,bestMove} from  '../../utils/game.js';
const Table = () => {
    console.log('rendering table')

    const options = {"-1" : null , "0" : <Naught/>, "1" : <Cross/>}

    const [table,setTable] = useState([[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]])
    const [move,setMove] = useState(1);
    const [moves,setMoves] = useState(0)
    const [gameOver,setGameOver] = useState(false)
    const [result,setResult] = useState({
        winner: -1,
        type: '',
        index: -1
    })

    //renders the cut line
    useEffect(() => {
        console.log('in use effect')

        const cut = document.querySelector('#cut')

        const {winner,type,index} = result

        if(winner === -1)
            cut.style.display = "none"
        else
        {
            cut.style.display = "block"

            const side = cut.parentElement.offsetWidth / 3

            const rot = type === 'row' ? 0 : type === 'col' ? 90 : index * 45

            const scale = type === 'diagonal' ? 1.4 : 1

            const dir = index === -1 ? 'right' : 'left'

            let trans = type !== 'diagonal' ? (index+0.5) * side : 0

            if(type === 'col') 
                trans = -1 * trans

            cut.style.transform = `rotate(${rot}deg) scale(${scale}) translate(0px,${trans}px)`
            cut.style.transformOrigin = 'top ' + dir
        }
    }, [result]);

    //calls the computer move
    useEffect(()=>{
        console.log('in second use effect')
        if(!move){
            setTimeout(()=>{
                computerMove()
            },1500)
        }
    })

    //checks for result
    useEffect(()=>{
        console.log('in third use Effect')

        const prevMove = move ? 0 : 1

        const res = check(table,prevMove)

        if(res){
            console.log(res)
            setGameOver(true)
            setResult(res)
        }
        else if(moves === 9){
            setGameOver(true)
        }
    },[move,table,moves])

    const computerMove = ()=>{
        if(gameOver || moves === 9)
            return

        const m = bestMove(table,moves)

        const n = m.row * 3 + m.col

        document.querySelectorAll('.box')[n].click()

    }

    const handleClick = (e)=>{
        if(gameOver)
            return 

        const i = e.target.dataset.boxnumber
        const r = parseInt(i/3)
        const c = parseInt(i%3)

        if(table[r][c] !== -1)
            return

        setTable((prevTable)=>{
            const newTable = [...prevTable]
            newTable[r][c] = move
            return newTable
        })

        setMove(prevMove => prevMove ? 0 : 1)

        setMoves(moves => moves+1)
    }
    

    return ( 
        <div className="h-100 w-100">
            <div className='border bg-dark border-dark border-1' id="cut"></div>
            <div className="row mx-0 h-30 border-bottom border-3 border-dark">
                <div data-boxnumber="0" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box" id="box">
                    {options[table[0][0]]}
                </div>
                <div data-boxnumber="1" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box">
                    {options[table[0][1]]}
                </div>
                <div data-boxnumber="2" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 box">
                    {options[table[0][2]]}
                </div>
            </div>
            <div className="row mx-0  h-30 border-bottom border-3 border-dark">
                <div data-boxnumber="3" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box">
                    {options[table[1][0]]}
                </div>
                <div data-boxnumber="4" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box">
                    {options[table[1][1]]}
                </div>
                <div data-boxnumber="5" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 box">
                    {options[table[1][2]]}
                </div>
            </div>
            <div className="row mx-0 h-30">
                <div data-boxnumber="6" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box">
                    {options[table[2][0]]}
                </div>
                <div data-boxnumber="7" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box">
                    {options[table[2][1]]}
                </div>
                <div data-boxnumber="8" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 box">
                    {options[table[2][2]]}
                </div>
            </div>
            <p>{!gameOver ? (move ? "your turn" : "computer's turn") : result.winner}</p>
        </div>
     );
}
 
export default Table;