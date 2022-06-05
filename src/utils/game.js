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

