var glbArr;
let arrSizeGlb = 6, weightGlb= 6;
function createGlbArr(arrSize, weight){
    glbArr = Array.from(Array(arrSize+1), ()=> Array(weight+1));
}

function initializeGlbArr(arrSize, weight){
    for(let i = 0; i <arrSize+1; i++){
        for(let j = 0; j < weight+1; j++){
            glbArr[i][j] = -1;
        }
    }
}

function longestCommonSubSequence(x, y, n ,m){
    if(n == 0 || m == 0)    return 0;

    if(x[n-1] == y[m-1]){
        return 1+longestCommonSubSequence(x,y, n-1, m-1);
    }else{
        return Math.max(longestCommonSubSequence(x, y, n-1, m), longestCommonSubSequence(x,y, n, m-1));
    }
}

function lcsMemoize(x, y, n, m){
    if(n == 0 || m == 0)    return 0;

    if(glbArr[n][m] !== -1) return glbArr[n][m];

    if(x[n-1] == y[m-1]){
        return glbArr[n][m] = 1+lcsRecursive(x, y, n-1, m-1);
    }else{
        return glbArr[n][m] = Math.max(lcsRecursive(x, y, n-1, m), lcsRecursive(x, y, n, m-1))
    }
}

createGlbArr(arrSizeGlb, weightGlb);
initializeGlbArr(arrSizeGlb, weightGlb);
