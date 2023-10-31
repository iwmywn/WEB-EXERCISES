// const nums = [10, 20, 30];
// const string = ['hi', 'hello', 'good'];

// nums.splice(nums.length - 1, 1, 99);
// console.log(nums);

// function getLastValue(array) {
//   const lastValue = array[array.length - 1];
//   return lastValue;
// }

// function arraySwap(array) {
//   const firstValue = array[0];
//   const lastValue = array[array.length - 1];
//   array.splice(0, 1, lastValue);
//   array.splice(array.length - 1, 1, firstValue);
//   return array;
// }

// console.log(getLastValue(string));
// console.log(arraySwap(string));

//for loops
// for (let i = 0; i <= 10; i += 2) {
//   console.log(i);
// }

// for (let i = 5; i >= 0; i--) {
//   console.log(i);
// }

//while loops
// let i = 0;

// while(i <= 10) {
//   console.log(i);
//   i += 2;
// }

// let i = 5;

// while (i >= 0) {
//   console.log(i);
//   i--;
// }

// const nums2 = [];

// for (let i = 0; i < nums.length; i++) {
//   nums2[i] = nums[i] + 1;
// }

// console.log(nums2);

// function addOne(array) {
//   for (let i = 0; i < array.length; i++) {
//     array[i] = array[i] + 1;
//   }
//   return array;
// }

// console.log(addOne([-2, -1, 0, 99]));

// function addNum(array, num) {
//   for (let i = 0; i < array.length; i++) {
//     array[i] += num;
//   }
//   return array;
// }

// console.log(addNum([-2, -1, 0, 99], 2));

// function addArrays(array1, array2) {
//   const array = [];
//   for (let i = 0; i < array1.length; i++) {
//     array[i] = array1[i] + array2[i];
//   }
//   return array;
// }

// console.log(addArrays([1, 2, 3], [4, 5, 6]));

// function countPositiveNum(array) {
//   let num = 0;
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] > 0) {
//       num++;
//     }
//   }
//   return num;
// }

// console.log(countPositiveNum([-2, 3, -5, 7, 10]));

//1
// function minMax(array) {
//   const result = {
//     min: null,
//     max: null
//   }
//   for (let i = 0; i < array.length; i++) {
//     if (result.min === null || array[i] < result.min) {
//       result.min = array[i];
//     }
//     if (result.max === null || array[i] > result.max) {
//       result.max = array[i];
//     }
//   }
//   return result;
// }

// console.log(minMax([]));

//2
// function minMax(array) {
//   const result = {
//     min: array[0],
//     max: array[0]
//   }
//   if (array.length === 0) {
//     result.min = null;
//     result.max = null;
//     return result;
//   }
//   for (let i = 1; i < array.length; i++) {
//     if (array[i] < result.min) {
//       result.min = array[i];
//     }
//     if (array[i] > result.max) {
//       result.max = array[i];
//     }
//   }
//   return result;
// }

// console.log(minMax([]));

// function countWord(array) {
//   const result = {};
//   for (let i = 0; i < array.length; i++) {
//     const word = array[i];
//     if (!result[word]) {
//       result[word] = 1;
//     } else {
//       result[word]++;
//     }
//   }
//   return result;
// }

// console.log(countWord(['apple', 'grape', 'apple', 'apple']));

// 11o-p-q
// function searchIndex(array, word) {
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] === word) {
//       return i;
//     }
//   } 
//   return -1;
// }

// const array1 = ['hello', 'world', 'search', 'good'];
// const array2 = ['not', 'found'];
// console.log(searchIndex(array1, 'search'));

// 11r
// function removeEgg(foods) {
//   const newArray = [];
//   const reverseFoods = foods.slice().reverse();
//   let count = 0;
//   for (let i = 0; i < reverseFoods.length; i++) {
//     if (reverseFoods[i] === 'egg' && count < 2) {
//       count++;
//       continue;
//     }
//     newArray.push(reverseFoods[i]);
//   }
//   return newArray.reverse();
// }

// const foods1 = ['egg', 'apple', 'egg', 'egg', 'ham'];
// console.log(removeEgg(foods1));

// 11v
// const array = [];
// for (let i = 1; i <= 20; i++) {
//   if (i % 3 === 0 && i % 5 === 0) {
//     array.push('FizzBuzz');
//   } else if (i % 3 === 0 && i % 5 !== 0) {
//     array.push('Fizz');
//   } else if (i % 5 === 0 && i % 3 !== 0) {
//     array.push('Buzz');
//   } else {
//     array.push(i);
//   }
// }
// console.log(array);

// 11 w
// function findIndex(array, word) {
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] === word) {
//       return 1;
//     }
//   }
//   return 0;
// }

// function unique(array) {
//   const newArray = [];
//   for (let i = 0; i < array.length; i++) {
//     if (!findIndex(newArray, array[i])) {
//       newArray.push(array[i]);
//     }
//   }
//   return newArray;
// }

// console.log(unique(['red', 'green', 'green', 'red']));