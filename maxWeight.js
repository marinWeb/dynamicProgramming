// Problems
// 1. MaxWeight
// 2. SubSet Sum Problem
//3. Equal Sum Partition
//4. Count SubSet Problem
//5. Minimum Difference Subset Sum.
//6. SubSet Difference Count
//7. Target Sum


var glbArr;

function createGlbArr(arrLength, sum){
    glbArr = Array.from(Array(arrLength+1), () => new Array(sum+1));
}

// createGlbArr(3, 10);
//#region maxWeight Recursion,DP TopDown
// function maxWeight(values, weights, capacityWeight, arrLength){

//     if(capacityWeight === 0 || arrLength === 0) return 0;

//     if(arr2D[capacityWeight][arrLength] !== -1) return arr2D[capacityWeight][arrLength];

//     if(weights[arrLength-1] <= capacityWeight){
//         return arr2D[capacityWeight][arrLength] = Math.max(values[arrLength-1] + maxWeight(values, weights, capacityWeight-weights[arrLength-1], arrLength-1), maxWeight(values, weights, capacityWeight, arrLength-1));
//     }else{
//         return arr2D[capacityWeight][arrLength] = maxWeight(values, weights, capacityWeight, arrLength-1);
//     }
// }
// const w = 51, n = 4;

// var arr2D = Array.from(Array(w), () => Array(n));

// // for(let i = 0; i< arr2D.length; i++){
// //     for(let j = 0; j< arr2D[i].length; j++){
// //         arr2D[i][j] = -1;
// //     }
// // }

// function maxWeightTD(values, weights, capacityWeight, arrLength){

//     for(let i = 0; i< capacityWeight+1; i++){
//         for(let j = 0; j< arrLength+1; j++){
//             if(i == 0 || j === 0){
//                 arr2D[i][j] = 0;
//             }
//             if(i > 0 )  break;
//         }
//     }

//     for(let i = 1; i < capacityWeight+1; i++){
//         for(j = 1; j < arrLength+1; j++){
//             if(weights[j - 1] <= i){
//                 arr2D[i][j] = Math.max(values[j-1]+ arr2D[i-weights[j-1]][j -1], arr2D[i][j-1]);
//             }else{
//                 arr2D[i][j] = arr2D[i][j-1];
//             }
//         }
//     }

//     return arr2D[capacityWeight][arrLength];
// }

// console.log(maxWeightTD([60, 100, 120], [10, 20, 30], w-1, n-1));    //220 -> ANS

//#endregion


// #region SubsetSum Problem
const m = 11, n = 4
var subSetGlbArr = Array.from(Array(n), () => new Array(m));
function subsetSum(arr, sum, arrLength){
   

    for(let i = 0; i < arrLength+1; i++){
        for(j = 0; j < sum+1; j++){
            if(j === 0){
                subSetGlbArr[i][j] = true;
            }else{
                subSetGlbArr[i][j] = false;
            }
        }
    }

    for(let i = 1; i<arrLength+1; i++){
        for(j = 1; j< sum+1; j++){
            if(arr[i-1] <= sum){
                subSetGlbArr[i][j] = subSetGlbArr[i-1][j- arr[i-1]] || subSetGlbArr[i-1][j];
            }else{
                subSetGlbArr[i][j] = subSetGlbArr[i-1][j];
            }
        }
    }

    return subSetGlbArr[arrLength][sum];

}

function subsetSumR(arr, sum, arrLength){
    if(sum === 0)  return true;
    if(arrLength === 0) return false;

    if(subSetGlbArr[arrLength][sum] !== -1) return subSetGlbArr[arrLength][sum];
    if(arr[arrLength-1] <= sum){
        return subSetGlbArr[arrLength][sum] = subsetSumR(arr, sum - arr[arrLength-1], arrLength -1) || subsetSumR(arr, sum, arrLength-1);
    }else{
        return subSetGlbArr[arrLength][sum] = subsetSumR(arr, sum, arrLength-1);
    }
}

// for(let i =0; i < 5; i++){
//     for(let j = 0; j< 12; j++){
//         subSetGlbArr[i][j] = -1;
//     }
// }
// console.log(subsetSumR([2,3,8,10], 11, 4))

// #endregion

// #region Equal Sum Partition
function equalSumPartition(arr){
    if(arr.length === 0)    return;

    var sum = arr.reduce((acc, curr) => acc+curr, 0);

    if(sum%2 !== 0) return false;

    return subsetSumR(arr, sum/2,arr.length);
}

// console.log(equalSumPartition([1,5,5,7]));

// #endregion

//#region Count SubSet Problem
function countSubset(arr, sum){

    createGlbArr(arr.length, sum);
    for(let i = 0; i < arr.length+1; i++){
        for(let j = 0; j < sum+1; j++){
            if(j == 0)  glbArr[i][j] = 1;
            else if(i == 0) glbArr[i][j] = 0;
            else break;
        }
    }
    for(let i = 1; i< arr.length+1; i++){
        for(let j = 1; j < sum+1; j++){
            if(arr[i-1] <= sum){
                glbArr[i][j] = ((glbArr[i-1][j-arr[i-1]] !== undefined) ? glbArr[i-1][j-arr[i-1]] : 0) + ((glbArr[i-1][j] != undefined)? glbArr[i-1][j] : 0) ;
            }else{
                glbArr[i][j] = glbArr[i-1][j] !== undefined ? glbArr[i-1][j] : 0;
            }
        }
    }

    return glbArr[arr.length][sum];
    
}

function countSubSetR(arr, sum, arrLength){

    if(sum === 0)   return 1;
    if(arrLength == 0) return 0;
    if(countSubSetArr[arrLength][sum])  return countSubSetArr[arrLength][sum];
    if(arr[arrLength -1] <= sum){
        return countSubSetArr[arrLength][sum] =  countSubSetR(arr, sum - arr[arrLength -1], arrLength-1) + countSubSetR(arr, sum, arrLength-1);
    }else{
        return countSubSetArr[arrLength][sum] = countSubSetR(arr, sum, arrLength -1);
    }
}
var arr = [1,1,2,3];
var sum = 4;
var countSubSetArr = Array.from(Array(arr.length+1), () => Array(sum+1));

//initializing Arr
for(let i = 0; i < arr.length+1; i++){
    for(let j = 0; j< sum+1; j++){
        if(j == 0){
            countSubSetArr[i][j] = 1;
        }else if(i == 0){
            countSubSetArr[i][j] = 0;
        }else{
            break;
        }
    }
}
// console.log(countSubset(arr, sum));
// console.log(countSubSetR(arr, sum, arr.length));

//#endregion

// #region Minimum Difference Subset sum
function minDifference(arr){

    var sum = arr.reduce((acc, curr) =>acc+curr, 0);
    subsetSum(arr, sum, arr.length);
    var candidateArr = [];

    subSetGlbArr[arr.length].forEach((itm, idx)=>{
        if(itm){
            candidateArr.push(idx);
        }
    });

    console.log(candidateArr);

    var minDifferenceVal  = Infinity;
    for(let i = 0; i < candidateArr.length/2; i++){
        minDifferenceVal = Math.min(minDifferenceVal, sum - (2*candidateArr[i]));
    }

    return minDifferenceVal;
}

// console.log(minDifference([1,2,7]));


//#endregion


// #region SubSet count with given difference
function subSetDiffCount(arr, diff){

    var totalSum = arr.reduce((acc, curr)=> acc+curr, 0);
    var subSetOneSum = (diff+ totalSum)/2;

    // return countSubSetR(arr, subSetOneSum, arr.length);
    return countSubset(arr, subSetOneSum);
}
//#endregion

//#region Target Sum Problem
function targetSum(arr, sumTarget){
    
}

//#endregion
