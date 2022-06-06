const checkRow = (table,r,p)=>{
    for(let i=0;i<3;i++)
        if(table[r][i] !== p)
            return false;
    return true;
}

const checkCol = (table,c,p)=>{
    for(let i=0;i<3;i++)
        if(table[i][c] !== p)
            return false;
    return true;
}

//checks if the board has a winner
export const check = (table,p)=>{

    for(let i=0;i<3;i++)
        if(checkRow(table,i,p))   return {winner: p,type: 'row',index: i};

    for(let i=0;i<3;i++)
        if(checkCol(table,i,p))   return {winner: p,type: 'col',index: i};

    //1st diagonal
    let f = true;

    f = f && table[0][0] === p && table[1][1] === p && table[2][2] === p

    if(f)
        return {winner: p,type: 'diagonal',index: 1};
    
    else
        f = true;

    //2nd diagonal
    f = f && table[2][0] === p && table[1][1] === p && table[0][2] === p

    return f ? {winner: p,type: 'diagonal',index: -1} : null;
}

//================ AI logic with minmax algorithm ============================

const evalualte = (table)=>{

    //player
    if(check(table,1))
        return 10;

    if(check(table,0))
        return -10;

    return 0;
}

//minmax algo
//isMax says the current player is maximizer: player or minimizer: computer
const minimax = (table,moves,depth,isMax) => {
    const score = evalualte(table)

    if(score === 10)
        return score - depth;

    if(score === -10)
        return score + depth;

    if(moves === 9)
        return 0;

    if(isMax){
        let best = -Infinity

        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(table[i][j] === -1)
                {
                    table[i][j] = 1
                    best = Math.max(best,minimax(table,moves+1,depth+1,!isMax))
                    table[i][j] = -1
                }
            }
        }

        return best
    }
    else{
        let best = Infinity

        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(table[i][j] === -1)
                {
                    table[i][j] = 0
                    best = Math.min(best,minimax(table,moves+1,depth+1,!isMax))
                    table[i][j] = -1
                }
            }
        }

        return best
    }
}

//best computer move
export const bestMove = (table,moves) => {
    const  m = {row: -1,col: -1}
    let bestVal = Infinity

    for(let i=0;i<3;i++)
    {
        for(let j=0;j<3;j++)
        {
            if(table[i][j] === -1)
            {
                table[i][j] = 0
                const moveVal = minimax(table,moves+1,0,true)
                table[i][j] = -1

                if(moveVal < bestVal){
                    m.row = i
                    m.col = j
                    bestVal = moveVal
                }
            }
        }
    }

    return m
}
