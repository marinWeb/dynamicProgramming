//Consists of problems
//1. Longest Common Subsequence (Recursive).
//2. Longest Common SubSequence (Recursive + Memoized)
//3. Longest Common Subsequence (TopDown)
//4. Longest Common

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

function lcsTopDown(x, y, n ,m){
    createGlbArr(n, m);
    
    //initializing the globalArray
    for(let i = 0; i < n+1; i++){
        for(let j = 0; j < m+1; j++){
            if(i == 0 || j == 0){
                glbArr[i][j] = 0;
            }
            if(i > 0)   break;
        }
    }

    for(let i = 1; i < n+1; i++){
        for(let j = 1; j < m+1; j++){
            if(x[i-1] == y[j-1]){
                glbArr[i][j] = 1+ glbArr[i-1][j-1]; 
            }else{
                glbArr[i][j] = Math.max(glbArr[i-1][j], glbArr[i][j-1]);
            }
        }
    }

    return glbArr[n][m];
}

function longestCommonSubString(x, y, n, m){
    let count = 0;
    let tempCount = 0;
    for(let i = 0; i < n; i++){
        tempCount = 0;
        for(let j = 0; j < m; j++){
            if(x[i] == y[j]){
                let tempi = i;
                while(x[tempi] == y[j]){
                    tempCount++;
                    tempi++;
                    j++;
                }

                if(count < tempCount){
                    count = tempCount;
                    tempCount = 0;
                }
            }
        }
        if(count < tempCount)  {
            count = tempCount;
            tempCount = 0;
        } 
    }

    return count;
}

function longestCommonSubStringRec(x, y, n, m, count = 0){
    if(n == 0 || m == 0){
        return count;
    }

    if(x[n-1] == y[m-1]){
        count = longestCommonSubStringRec(x, y, n-1, m-1, ++count);
    }
    else{
        count =  Math.max(count, Math.max(longestCommonSubStringRec(x, y, n-1,m, 0), longestCommonSubStringRec(x, y, n, m-1, 0)));
    }
    

    return count;
}

function lcSubStrTD(x, y, n, m){
    createGlbArr(n, m);
    initializeGlbArr(n, m);
    let result = 0;
    for(let i = 1; i < n+1; i++){
        for(let j = 0; j < m+1; j++){
            if(i == 0 || j == 0){
                glbArr[i][j] = 0
            }else if(x[i-1] == y[j-1]){
                glbArr[i][j] = glbArr[i-1][j-1] +1;
                result = Math.max(result, glbArr[i][j])
            }else{
                // glbArr[i][j] = Math.max(glbArr[i][j-1], glbArr[i-1][j]);
                glbArr[i][j] = 0;
            }
        }
    }

    return result;
}





createGlbArr(arrSizeGlb, weightGlb);
initializeGlbArr(arrSizeGlb, weightGlb);
