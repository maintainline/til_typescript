# ts 심화 - Narrowin(내로잉)

- 타입을 점차적으로 구체화
- 타입 좁히기

```ts
// number 이거나 string 일수 있다.
let numString: number | string = "iu";
// 자동으로 number 를 제거하고 string으로 판단
// 이것을 Narrowin즉, 타입 좁히기 라고 합니다.
// let numString: string
numString;
// 위의 변수는 string 으로 판정이 되므로 아래 문장이 오류가 발생함.
numString.toFixed(2); // number타입이 아니라서 오류발생
```

## 타입 좁히기 8개 방안

### 1. Assingment Narrwing

- 유니온 타입에서 초기값을 셋팅해서 할당한다.

```ts
// 초기값으로 string 을 할당한다.
let numString: number | string = "iu";
numString; //string
```

### 2. typeof Narrwing

- `typeof 연산자`를 사용해서 타입을 좁혀줌

```ts
numString = Math.random() > 0.5 ? 500 : "아이유";
if (typeof numString === "string") {
  //글자에요.
  numString; // let numString: string
} else {
  // 숫자에요.
  numString; // let numString: number
}
```

### 3. Truthiness Narrwing

- null, 0 , undefined , "", NaN , false

```ts
let nullOrString: null | string[];
nullOrString = Math.random() > 0.5 ? null : ["iu"];
// if 로 참인 것을 거르고 처리
if (nullOrString) {
  // 글자 배열
  nullOrString; //nullOrString: string[]
} else {
  //null 이다.
  nullOrString; //let nullOrString: null
}
```

### 4. Equality Narrwing

- 비교 연산자를 이용한다.

```ts
let numOrString: number | string = Math.random() > 0.5 ? 100 : "iu";
let stringOrBoolean: string | boolean = Math.random() > 0.5 ? "iu" : true;

//js에서는 불가능 하지만, ts에서는 가능하다.
if (numOrString === stringOrBoolean) {
  // numOrString:string === stringOrBoolean:string
  numOrString; //let numOrString: string
  stringOrBoolean; //let stringOrBoolean: string
} else {
  numOrString; //let numOrString: string | number
  stringOrBoolean; //let stringOrBoolean: string | true
}
```

### 5. in Opertor Narrwing

- in 연산자를 이용하여 타입 좁히기
- 객체의 속성을 추출하는 용도
- 보통 많은 개발자가 `type` 이라는 속성을 많이 활용

```ts
interface Human {
  name: string;
  age: number;
}
interface Dog {
  name: string;
  type: string;
}
let h: Human = { name: "iu", age: 20 };
let d: Dog = { name: "poppy", type: "toypoodle" };

let result: Human | Dog = Math.random() > 0.5 ? h : d;
// in 연산자를 이용해서 타입을 구체화 , 즉 타입 좁히기를 실행하자.
// console.log("age" in result)
// console.log("name" in result)
// console.log("type" in result)

if ("type" in result) {
  result; //let result: Dog
} else {
  result; //let result: Human
}
```

### 6. instancof Narrwing

- new 클래스명()로 만들어진 변수를 인스턴스 변수라고 합니다.

```ts
let dateOrString: Date | string = Math.random() > 0.5 ? new Date() : "iu";
// new로 생성된 것만 가능하다.
if (dateOrString instanceof Date) {
  dateOrString; // let dateOrString: Date
} else {
  dateOrString; //let dateOrString: string
}
```

### 7. Discriminated Narrwing

- 차별된 유니온 내로잉
- 유니온 타입에서 `특정 속성을 사용`해서 타입좁히기
- 불완전하게 타입을 좁힌 경우

```ts
interface Animal {
  type: "dog" | "human";
  // 사람일때만 사용할 수 있다.
  height?: number;
  // 강아지일때만 사용할 수 있다.
  breed?: string;
}
let result: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : { type: "dog", breed: "뽀삐" };

// 상당히 좋지 않게 코드 분기를 하였습니다.
// 개선이 필요합니다.
if (result.type === "human") {
  result;
  result.height;
} else {
  result;
  result.breed;
}
```

- 개선한 코드

```ts
interface Human {
  type: "human";
  height: number;
}
interface Dog {
  type: "dog";
  breed: string;
}

type Animal = Human | Dog;

let result: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : { type: "dog", breed: "뽀삐" };

// 상당히 좋지 않게 코드 분기를 하였습니다.
// 개선이 필요합니다.
if (result.type === "human") {
  result; //let result: Human
  result.height;
} else {
  result; // let result: Dog
  result.breed;
}
```

### 8. Existential Narrwing

- 존재하는 값을 사용해서 타입 구체화, 즉 타입좁히기
- switch Case 문을 사용한다.

```ts
interface Human {
  type: "human";
  height: number;
}
interface Dog {
  type: "dog";
  breed: string;
}

interface Cat {
  type: "cat";
  koo: string;
}

type Animal = Human | Dog | Cat;

let result: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : Math.random() > 0.5
    ? { type: "dog", breed: "뽀삐" }
    : { type: "cat", koo: "꾹꾹이" };

// 개발자가 만든 type 속성을 이용해서 처리
switch (result.type) {
  case "human":
    result; // let result: Human
    break;
  case "dog":
    result; //let result: Dog
    break;
  case "cat":
    result; //let result: Dog
    break;
}
```
