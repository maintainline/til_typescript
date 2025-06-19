# Reference 데이터 타입

- Primitive 데이터(기본형 데이터)

  - number, string, null, undefined, Symbol, boolean
  - any, unkown, never

- 기본형 데이터가 너무 많다면 묶어서 관리하자.
  - 이름 참조 타입, 즉 Reference 타입이라고 합니다.
  - Reference 타입을 객체라고 한다.

## 1. 배열(Array)

### 1.1. 배열이 필요한경우

- 사용자 정보를 관리한다.

```js
const user_1: string = "hong";
const user_2: string = "kim";
const user_3: string = "park";
```

- 사용자 정보가 너무 많으면 변수명을 짓기가 어렵고 관리가 어려움.
- 문법적으로 원시데이터를 모아서 관리하는 방안이 제시 -> 배열

```js
const userArr = ["hong", "kim", "park"];
userArr[0];
userArr[1];
userArr[2];
userArr.length;
```

```ts
// 배열 기호로 데이터 종류 표현하기
const userArr: string[] = ["hong", "kim", "park"];
const userAge: number[] = [1, 2, 3, 4];
const userInfo: (string | boolean | number)[] = ["kr", true, 53];

// 제네릭으로 데이터 표현하기
const userArrGeneric: Array<string> = ["hong", "kim", "park"];
const userAgeGeneric: Array<number> = [1, 2, 3, 4];
const userInfoArrGeneric: Array<string | boolean | number> = ["kr", true, 53];
```

- 중첩된 배열

```ts
// 배열 기호로 데이터 종류 표현하기
const doubleArr: number[][] = [
  [1, 2],
  [500, 300],
];

// 제네릭으로 데이터 표현하기
const doubleArrGeneric: Array<number[]> = [
  [1, 2],
  [500, 300],
];

const doubleArrGeneric2: Array<Array<number>> = [
  [1, 2],
  [500, 300],
];
```

### 1.2. 타입스크립트에만 있는 `튜플(Tuple)`

- 배열의 요소에 타입을 별도로 지정할 수 있다.
- 배열의 길이를 고정시킬 수 있다.
- 배열의 요소를 제거 또는 추가할 수 없다.

```ts
// 일반 배열
const ageArr: number[] = [1, 2, 3];

//Tuple (배열의 요소 순서대로, 갯수대로, 맞추어 넣기!)
const numTuple: [number, number, number] = [1, 2, 3];
const strTuple: [string, string] = ["a", "b"];
const userTuple: [number, string, boolean] = [1, "a", false];
const memberTuple: [string, number][] = [
  ["kim", 1],
  ["park", 2],
];
```

## 2. 객체(Object)

- `원시데이터를 묶어서 관리`한다.
- 데이터의 각 요소의 `이름, 즉 속성(property)를 정해서 관리`한다.
- 아래 문장을 `객체 리터럴 (객체 작성법)` 이라고 하며, 많이 중요!

```js
{
  이름 :  원시데이터,
  이름 :  원시데이터,
}
```

### 2.1. 객체의 이해

- 여러명의 사용자 정보를 관리한다.
- 만약 배열로 관리한다면?..

```js
const userName = ["hong", "park", "kim"];
userName[0];
const userAge = [20, 30, 10];
userAge[0];
```

- 만약 객체 리터럴(객체작성법)으로 관리한다면?..

```js
const hong = { name: "hong", age: 20 };
hong.name;
hong.age;

const park = { name: "park", age: 30 };
park["name"];
park["age"];

const kim = { name: "kim", age: 10 };
```

```ts
const hong: {
  name: string;
  age: number;
} = { name: "hong", age: 20 };
hong.name;
hong.age;

const park: {
  name: string;
  age: number;
} = { name: "park", age: 30 };
park["name"];
park["age"];

const kim: {
  name: string;
  age: number;
} = { name: "kim", age: 10 };
```

- 번외 (내가 만든 `객체 타입 정의`)

```ts
//  {name: string; age: number;}객체 타입을 Person 으로 정의 대문자로 시작
type Person = {
  name: string;
  age: number;
};

const hong: Person = { name: "hong", age: 20 };
hong.name;
hong.age;

const park: Person = { name: "park", age: 30 };
park["name"];
park["age"];

const kim: Person = { name: "kim", age: 10 };
```

- 번외 (내가 만든 데이터 `객체 인터페이스`)

```ts
interface Person {
  name: string;
  age: number;
}

const hong: Person = { name: "hong", age: 20 };
hong.name;
hong.age;

const park: Person = { name: "park", age: 30 };
park["name"];
park["age"];

const kim: Person = { name: "kim", age: 10 };
```

## 3. 객체와 배열 활용

```ts
type Good = { title: string; price: number; sale: boolean };

const goodArr: Good[] = [
  { title: "사과", price: 1000, sale: true },
  { title: "딸기", price: 5000, sale: false },
  { title: "메로나", price: 500, sale: true },
];
goodArr[0].title;

const goodArrGeneric: Array<Good> = [
  { title: "사과", price: 1000, sale: true },
  { title: "딸기", price: 5000, sale: false },
  { title: "메로나", price: 500, sale: true },
];
goodArrGeneric[0].title;
```
