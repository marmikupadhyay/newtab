// Weird Js things Q1
// Question : What happens when you have an object with properties as objects
// and you Get any one of the properties of the object? and make any changes to it.
// Answer : It will reflect in the original object.

// Example : 

var myObject = {
    prop1: {
        name:"Gojo",
    },
    prop2: {
        name:"Satoru"
    }
};

console.log(myObject);
let currProp = myObject.prop1;
currProp.name = "Levi";
myObject.prop2 = currProp;
console.log(myObject);