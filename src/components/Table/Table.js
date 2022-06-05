import { useState,useEffect } from 'react';
import Cross from '../cross/Cross';
import Naught from '../naught/Naught';
import './Table.css'
import ReactDOM from 'react-dom';
import {check} from  '../../utils/game.js';
const Table = () => {
    console.log('rendering table')

    const [table,setTable] = useState([[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]])
    const [move,setMove] = useState(1);
    const [moves,setMoves] = useState(0)
    const [gameOver,setGameOver] = useState(false)
    const [result,setResult] = useState({
        winner: -1,
        type: '',
        index: -1
    })

    //renders the table
    useEffect(() => {
        console.log('in use effect')

        const moves = {"-1" : null , "0" : <Naught/>, "1" : <Cross/>}

        const diagonals = document.querySelectorAll('.diagonal')

        diagonals.forEach(diagonal => {
            const {winner,type,index} = result

            if(winner === -1)
                diagonal.style.display = "none"
            else
            {
                diagonal.style.display = "block"

                const side = diagonal.parentElement.offsetWidth / 3

                console.log(side)
                
                const rot = type === 'row' ? 0 : type === 'col' ? 90 : index * 45

                const scale = type === 'diagonal' ? 1.4 : 1

                const dir = index === -1 ? 'right' : 'left'

                let trans = type !== 'diagonal' ? (index+0.5) * side : 0

                if(type === 'col') 
                    trans = -1 * trans

                diagonal.style.transform = `rotate(${rot}deg) scale(${scale}) translate(0px,${trans}px)`
                diagonal.style.transformOrigin = 'top ' + dir
            }
            
        })

        const boxNodes = document.querySelectorAll('.box');

        boxNodes.forEach((boxNode,i)=>{
            boxNode.style.pointerEvents = move ? "all" : "none";

            const r = parseInt(i/3)
            const c = parseInt(i%3)

            // eslint-disable-next-line
            ReactDOM.render(moves[table[r][c]],boxNode)
        })

    }, [move,table,result]);

    //calls the computer move
    useEffect(()=>{
        console.log('in second use effect')
        if(!move){
            setTimeout(()=>{
                computerMove()
            },2000)
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
    },[move,table])

    const computerMove = ()=>{
        if(gameOver || moves === 9)
            return

        let n = Math.floor(Math.random() * 9)

        while(table[parseInt(n/3)][parseInt(n%3)] !== -1)
            n = Math.floor(Math.random() * 9)

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
            <div className='diagonal border bg-dark border-dark border-1'></div>
            <div className="row mx-0 h-30 border-bottom border-3 border-dark">
                <div data-boxnumber="0" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box" id="box">
                </div>
                <div data-boxnumber="1" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box"></div>
                <div data-boxnumber="2" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 box"></div>
            </div>
            <div className="row mx-0  h-30 border-bottom border-3 border-dark">
                <div data-boxnumber="3" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box"></div>
                <div data-boxnumber="4" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box"></div>
                <div data-boxnumber="5" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 box"></div>
            </div>
            <div className="row mx-0 h-30">
                <div data-boxnumber="6" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box"></div>
                <div data-boxnumber="7" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 border-end border-3 border-dark box"></div>
                <div data-boxnumber="8" onClick={(e)=>{ handleClick(e) }} className="col-4 p-0 box"></div>
            </div>
            <p>{!gameOver ? (move ? "your turn" : "computer's turn") : (result.winner !== -1 && result.winner)}</p>
        </div>
     );
}
 
export default Table;