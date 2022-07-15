//Single Type
// let age:number = 10;
// if(age<50){
//     age+=10;
// }
// console.log(age);

// function print(doc){
//     console.log(doc);
// }

//Array
// let number:number[] = []
// number.forEach(n=>n.)

// Tuples
// let user:[number,String]=[1,'john'];
// user.push(1);
// user.push(1);
// console.log(user);

//enum
// const enum Size {Small=1,Medium,Large};
// let mySize:Size = Size.Large;
// console.log(mySize);

//Functions
// function cal(income: number, year = 2022): number {
//   if (year < 2022) {
//     return income * 1.2;
//   }
//   return income * 1.3;
// }
// console.log(cal(10_000, 2023));

//Objects
// let employee: {
//   readonly id: number;
//   name: String;
//   retire: (date: Date) => void;
// } = {
//   id: 1,
//   name: "abc",
//   retire: (date: Date) => {
//     console.log(date);
//   },
// };

//blue print
// type Employee = {
//   readonly id: number;
//   name: String;
//   retire: (date: Date) => void;
// };

// let employee: Employee = {
//   id: 1,
//   name: "abc",
//   retire: (date: Date) => {
//     console.log(date);
//   },
// };

//union type
// function kgToLbs(weight: number | string): number {
//   if (typeof weight === "number") return weight * 2.2;
//   else return parseInt(weight) * 2.2;
// }
// console.log(kgToLbs(10));
// console.log(kgToLbs("10kg"));

//Intersection
// type Dragggable = {
//   drag: () => void;
// };

// type Resizable = {
//   resize: () => void;
// };

// type UIWidget = Dragggable & Resizable;

// let text: UIWidget = {
//   drag: () => {},
//   resize: () => {},
// };

//Literal types
// type Quantity = 50 | 100;

// let quantity: Quantity = 100;

// type metric = "cm" | "inch";

//Nullable types
// function greet(name: string | null | undefined) {
//   if (name) console.log(name.toUpperCase());
//   else console.log("error");
// }
// greet(undefined);

//optional chaining
// type Customer = {
//   birthdate?: Date;
// };

// function getCustomer(id: number): Customer | null | undefined {
//   return id === 0 ? null : { birthdate: new Date() };
// }
// let customer = getCustomer(1);
// //optional property access operator
// console.log(customer?.birthdate?.getFullYear());
interface User {
  name?: string;
  id: number;
  getName(): string;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
  getName(): string {
    return this.name;
  }
}

const user: User = new UserAccount("Murphy", 1);
console.log(user.getName());
