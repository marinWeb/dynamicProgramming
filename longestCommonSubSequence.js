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

//initialize entire array with -1
function initializeGlbArr(arrSize, weight){
    for(let i = 0; i <arrSize+1; i++){
        for(let j = 0; j < weight+1; j++){
            glbArr[i][j] = -1;
        }
    }
}

//initialize elements at 0th position on both axis with 0
function init00(n,m){
    for(let i = 0; i < n+1; i++){
        for(let j = 0; j < m+1; j++){
            if(i === 0 || j === 0){
                glbArr[i][j] = 0;
            }

            if(i > 0)   break;
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

function printLCS(x, y, n, m, result= ''){
    if(n <= 0 || m <= 0)    return result;

    if(x[n-1] == y[m-1]){
        result += x[n-1];
        // var removeMatch = y.split('');
        // removeMatch.splice(m-1, 1);
        // y = removeMatch.join('');
        // m--;
        return printLCS(x, y, n-1, m-1, result).split('').reverse().join('');
    }else{
        var result1 = printLCS(x, y, n-1, m, result);
        var result2 = printLCS(x, y,n, m-1, result);
        result1.length > result2.length ? result += result1 : result+= result2;
    }
    return result.split('').reverse().join('');
}

function printLCSNaive(x, y, n, m){
    let result = '';
    for(let j = 0; j < m; j++){
        for(let i = 0; i < n; i++){
            if(x[i] == y[j]){
                result += y[j];
                var removeMatch = x.split('');
                removeMatch.splice(i, 1);
                x = removeMatch.join('');
                n--;
                break;
            }
        }
    }

    return result;
}
//ABCDGH', 'AEDFHR'

function printLCSTD(x, y, n, m){
    
    //Create a 2d array with size n+1 m+1
    createGlbArr(n, m);

    init00(n, m);

    //So here we are calling lcsTopDown() which we defined earlier so that our glbArr get filled with relevent values.
    lcsTopDown(x, y, n, m);

    //Now we once the glbArr is filled with values after calling the lcsTopDown(), we will look at this glbArr and based on the condition1, which i will define in a bit, we will decide to go either of the two ways. 
    //So the condition1 is such that we look at the exteme right place viz glbArr[n][m], where the values say i,j = n,m
    //Now based on this i,j values we will look at x and y if elem at x[i-1] and y[j-1] if it is same, we willl move in direction1 else
    // we will move in direction2. Now if elem at x[i-1] y[j-1] is same, then direction1 will be, we will look at position in glbArr 
    //having index n-1 and m-1 we will get a new value for i,j and again we will perform the same task of seeing if elem at x[i-1] and y[j-1] is same or not. Now going back a step, if the elem at x[i-1] and y[j-1] is not the same, we will move in direction2. Direction2 is we will look at the value we have in glbArr[n][m] and compare it with glbArr[n-1][m] and glbArr[n][m-1], of this two position whose value will match with the one at glbArr[n][m] we will move in that direction, for example let say value at glbArr[n][m] matches with value at position glbArr[n][m-1] so i=n and j= m-1 then we will compare if elem at x[i] and y[j] matches or not. if it matches we will go in direction1 else direction 2. We will go on until either value of i or j becomes 0 at which point we will stop... SO lets start

    let lcsStr = '';
    while(n >0 && m >0){
        if(x[n-1] == y[m-1]){
            lcsStr += x[n-1];
            n--; 
            m--;
        }else{
            if(glbArr[n][m] == glbArr[n-1][m]){
                n--;
            }else{
                m--;
            }
        }
    }

    //So in the above while loop we have not used i and j but n-1 and m-1 and based on the equality condition we are decrementing n &m accordingly. However do remember, in the else we are the two elements i.e. glbArr[n-1][m] and glbArr[n][m-1] because in the lcsTopDown() we are getting value for glbArr[n][m] from max(glbArr[n-1][m], glbArr[n][m-1])
    lcsStr = lcsStr.split('').reverse().join('');
    console.log(lcsStr);

}
createGlbArr(arrSizeGlb, weightGlb);
initializeGlbArr(arrSizeGlb, weightGlb);
