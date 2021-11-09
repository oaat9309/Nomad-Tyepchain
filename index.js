"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name = "John", age = 29, gender = "male";
const sayHi = (name, age, gender) => {
    console.log(`Hi, ${name}! You are ${gender}, age of ${age}`);
};
sayHi(name, age, gender);
// export {}로 이 파일이 컴파일 될거라는 걸 알려주는것. 안그러면 lib.dom.d.ts 파일에 선언되어 있다고 const name 못함
//# sourceMappingURL=index.js.map