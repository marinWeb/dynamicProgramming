// Unbounded Knapsack

var glbArr;

function createGlbArr(arrlength, weight){
    glbArr = Array.from(Array(arrlength+1), ()=> new Array(weight+1));
}

function unboundedKnapsack(values, weights, weight){

    //create globalArray
    createGlbArr(values.length, weight);

    //initialize the global array
    let outerBound = values.length+1,
        innerBound = weight+1;
    for(let i = 0; i < outerBound; i++){
        for(let j = 0; j < innerBound; j++){
            if(i == 0 || j ==0){
                glbArr[i][j] = 0;
            }
            
            if(i>0) break;
        }
    }

    for(let i = 1; i < outerBound; i++){
        for(let j = 1; j < innerBound; j++){
            if(weights[i-1] <= j){
                glbArr[i][j] = Math.max(values[i-1]+glbArr[i][j- weights[i-1]], glbArr[i-1][j]);
            }else{
                glbArr[i][j] = glbArr[i-1][j];
            }
        }
    }

    return glbArr[values.length][weight];
}

function rodCutting(prices, n){
    createGlbArr(prices.length, n);

    let length = [];
    for(let i = 1; i <= n; i++) length.push(i);

    console.log(length);
    let outerBound = prices.length+1;
    let innerBound = n+1;

    for(let i = 0; i< outerBound; i++){
        for(let j = 0; j < innerBound; j++){
            if(i == 0 || j == 0){
                glbArr[i][j] = 0;
            }

            if(i > 0)   break;
        }
    }

    for(let i = 1; i < outerBound; i++){
        for(let j = 1; j < innerBound; j++){
            if(length[i-1]<= j){
                glbArr[i][j] = Math.max(prices[i-1] + glbArr[i][j - length[i-1]], glbArr[i-1][j]);
            }else{
                glbArr[i][j] = glbArr[i-1][j];
            }
        }
    }

    return glbArr[prices.length][n];
}

//#region coinChange Maximum ways
function maxCoinChange(coins, sum){
    createGlbArr(coins.length, sum);

    for(let i = 0; i < glbArr.length; i++){
        for(let j = 0; j < glbArr[i].length; j++){
           if(j == 0 ){
               glbArr[i][j] = 1;
           }else{
               glbArr[i][j] = 0;
           }

           if(i > 0) break;
        }
    }

    for(let i = 1; i < glbArr.length; i++){
        for(let j = 1; j < glbArr[0].length; j++){
            if(coins[i-1] <= j){
                glbArr[i][j] = glbArr[i][j - coins[i-1]] + glbArr[i-1][j];
            }else{
                glbArr[i][j] = glbArr[i-1][j];
            }
        }
    }

    return glbArr[coins.length][sum];
}

function coinChangeMin(coinArr, sum){
    createGlbArr(coinArr.length, sum);

    //Initiliazation in min coin has to be done such that
    // 1. if the array is empty and the sum is greater or equal to 0. Then all such matrix positions are initialized with Infinity-1. 
    // 2. If the sum is 0 and the array size is greater than 0, then all the positions in matrix will be 0
    let i, j;

    for(i = 0; i <= coinArr.length; i++){
        for(j = 0; j <= sum; j++){
            // console.log(`iterating for i = ${i} and j = ${j}`);
            if(i == 0){
                glbArr[i][j] = Number.MAX_VALUE-1;
            }else if(j == 0){
                glbArr[i][j] = 0;
                break;
            }
        }
    }
    
    //So that was the first initialization we had of out matrix which is a global 2d arrray. But for this particular problem we need to initialize the remaining elements of the second row aswell. 
    for(i = 1, j = 1; j <= sum; j++){
        if(j % coinArr[0] == 0){
            glbArr[i][j] = 1;
        }else{
            glbArr[i][j] = Number.MAX_VALUE-1;
        }
    }

    //So we are done with initialization. Now we need to write the actual code variation that is there for this problem as compared 
    // to unbounded knapsack the standard one
    
    for(i = 2; i<=coinArr.length; i++){
        for(j = 1; j <= sum; j++){
            if(coinArr[i-1] <= j){
                glbArr[i][j] = Math.min(glbArr[i][j-coinArr[i-1]] + 1, glbArr[i-1][j]);
            }else{
                glbArr[i][j] = glbArr[i-1][j];
            }
        }
    }

    return glbArr[coinArr.length][sum];
}

var denominations = [1, 5, 10, 25];

//#endregion
