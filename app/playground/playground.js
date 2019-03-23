//Experiment with spread operator
 /* var objOne= {
   name: 'Debanjan',
   location: 'Bangalore'
 };

var objTwo= {
   age: '30',
   ...objOne
 };

console.log(objTwo);

var person = ['Andrew', 25];
var personTwo = ['Jen',29];

var printGreeting = (name, age)=>{
    console.log("Hi "+name+", you are "+age+" years old.");
}
printGreeting(...person);
printGreeting(...personTwo);

var names=['Mike','Ben'];
var final=['Andrew'];
var final=['Andrew',...names];
final.forEach((name)=>{
    console.log("Hi "+name);
}); */


/* var todosFireB = {
	"-LYwY1Ijcw7Ob98J1IuT": {
		"completed":true,
		"text":"Do Something",
		"createdAt":1550425268,
		"completedAt":null,
		"isCompleted":1550425273
	}
};

let todos = [];
var todoKeys = Object.keys(todosFireB);
for(let todoKey of todoKeys){
  debugger;
  let todoFireB = todosFireB[todoKey];
  todos = [
    ...todos,
    {
      ...todoFireB,
      "id": todoKey
    }
  ]
}

console.log("Todos", todos); */