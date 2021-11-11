
const a = 2;

---------------------------------------------------------

const sayHi = (name, gender, age) => {
  console.log(`Hello, ${name}! You are ${gender}, age of ${age}.`)
}

sayHi("john", 29, "male");


----------------------------------------------------------

class Human {
  public name: string;
  public gender: string;
  public age: number;
  constructor(name: string, gender: string, age: number) {
    this.name = name; 
    this.gender = gender;
    this.age = age;
  }
}

const Park = new Human("Park", "male", 29);

const sayHi = (person:Human) => {
  return (`Hello, ${}! You are ${}}, age of ${}.`)
}

console.log(sayHi(Park));
// export {};
// export {}로 이 파일이 컴파일 될거라는 걸 알려주는것. 안그러면 lib.dom.d.ts 파일에 선언되어 있다고 const name 못함