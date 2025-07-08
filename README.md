# Type 키워드

## 1. type 키워드를 왜 사용하는가?

- 길게 작성되는 타입을 `짧게 줄여서 사용`하기위해사용한다.

```ts
// 길게 작성된 경우.
const user: { name: string; age: number; job: string } = {
  name: "아이유",
  age: 25,
  job: "가수",
};
```

```ts
// type 이라는 키워드를 만들어서 관리
type User = { name: string; age: number; job: string };

const user: User = {
  name: "아이유",
  age: 25,
  job: "가수",
};
```

- 코드를 더 간편하게 읽게 하기 위해(`가독성`을 높여줌)

```ts
type Subject = "국어" | "영어" | "수학";
const test: Subject = "수학";

type Score = number;
const aaa: Score = 95;
```

- `재활용` 하기위해

```ts
type Student = {
  name: string;
  age: number;
  major: string;
};

const iu: Student = { name: "아이유", age: 28, major: "노래" };
const jimin: Student = { name: "지민", age: 30, major: "노래" };
```

- 코드에 대한 실수를 방지하려고

```ts
type Gender = "남자" | "여자";

const g: Gender = "남자";
console.log(g);
```

## 2. Type 키워드로 정의하는법

### 2.1. `기본타입`을 type 으로 정의하기

```ts
//기본타입 사용해도 괜찮지만. 타입을 정의하고 사용해야
// 정확성과 의미전달이 높아짐

//기본타입 const name: string = "아이유";

type UserName = string;
const name: UserName = "아이유";

//기본타입 const age: number = 24;
type UserAge = number;
const age: UserAge = 24;

//기본타입 const isMember: boolean = true;
type isMember = boolean;
const isMember: isMember = true;
```

- 추후 진행시 Type 의 대한 정의를 먼저 고민해보는게 좋음.

```ts
// type 정의 후 위쪽에 따로 모아두고 사용하는게 좋음
type UserName = string;
type UserAge = number;
type IsMember = boolean;

const name: UserName = "아이유";
const age: UserAge = 24;
const isMember: IsMember = true;
```

### 2.2. `객체`는 type 으로 정의하기

- `{속성명:속성값, 속성명:속성값}`처럼 여러개를 묶어둔 형태

```ts
type Student = {
  name: string;
  age: number;
  major: string;
};
const iu: Student = { age: 28, name: "아이유", major: "가수" };
```

### 2.3 `확장`이 가능하다.(기존의 type을 확장해서 또 다른 type 작성)

```ts
type Person = { name: string; age: number };
// 확장을 하지 않은경우
type Developer = { name: string; age: number; job: string };
// 확장을 하는경우
type Teacher = Person & { major: string };
const kim: Teacher = { age: 20, major: "과학", name: "kim" };
```

### 2.4 유니온(`|`) 문법도 제공한다.

- `여러개 중 하나`

```ts
type Select = "ok" | "no" | "cancel";

let userSelect: Select = "ok";
userSelect = "cancel";
userSelect = "no";

userSelect = "싫어요."; // 코딩 오류 발생
```

### 2.5. 인터셉션(`&`) 문법 제공함

- `모두 만족해야함`

```ts
type Animal = {
  eye: number;
};
type Cat = {
  mustash: boolean;
};
//인터셉션으로 모두 만족해야함
type MyPet = Animal & Cat;
const cat: MyPet = { eye: 2, mustash: true };
```

## 2.6. Optional Property (`?`)

- 선택적 옵션속성

```ts
type Person = {
  name: string;
  age: number;
  // 선택적 옵션
  gender?: string;
};
const iu: Person = { name: "아이유", age: 28 }; // gender? 선택적옵션
```

### 2.7. Readonly

- 읽기 전용(`readonly`)
- 단 한번의 값 세팅, 이후 변경 불가

```ts
type Person = {
  name: string;
  age: number;
  // 읽기 전용
  readonly job: string;
};

const iu: Person = { name: "아이유", age: 28, job: "가수" };
iu.age = 29; // 값 변경 가능
iu.name = "내사랑아이유"; // 값 변경 가능
iu.job = "연기자"; // readonly = 읽기 전용 속성, 오류발생 값 변경 불가
```

### 2.8. type 안에 type

```ts
type Geo = { lng: number; lat: number };
type Address = {
  city: string;
  zipCode: string;
  //   geo: { lng: number; lat: number };
  geo: Geo;
};

const user: Address = {
  city: "대구",
  zipCode: "053",
  geo: { lat: 20.454, lng: 52.1535 },
};
```

### 2.9. 인덱스 시그니처

- type 객체 정의에서 `속성명을 모를때 미리 지정 하지 않기`

```ts
// type ScoreType = {
//   과학: number;
//   수학: number;
//   영어: number;
// };

type ScoreType = {
  [subject: string]: number;
};

const score: ScoreType = {
  과학: 30,
  수학: 40,
  영어: 20,
};

const Myscore: ScoreType = {
  국어: 33,
  미술: "우수", // 오류 string 이므로 number형식에 맞지않음
};
```

### 2.10. 객체 배열 타입 정의

```ts
type Person = {
  name: string;
  age: number;
};

const human: Person[] = [
  { name: "hong", age: 10 },
  { name: "park", age: 14 },
  { name: "kim", age: 16 },
  { name: "kim", age: 16, job: "가수" }, //job오류, 타입 정의에 job없음
];
```

### 2.11. 함수 타입 정의

- 입력값, 리턴값 모두 타입을 정의할 수 있다.
- `type 타입명: (매개변수:타입) => 리턴값 타입`

```ts
type Add = (a: number, b: number) => number;
```

- 기본형 : 매개변수 없고, 리턴도 없다.

```ts
// 1단계
const hello = () => {
  console.log("안녕");
};

// 2단계
const hello1: () => void = () => {
  console.log("안녕");
};

// 3단계
type SayHello = () => void;
const hello2: SayHello = () => {
  console.log("안녕");
};
```

- 매개 변수가 있는경우

```ts
const hello = (msg: string) => {
  console.log(msg);
};

type SayHello = (msg: string) => void;
const hello2: SayHello = (msg: string) => {
  console.log(msg);
};
```

- 매개 변수도 있고, 리턴도 있는경우

```ts
const hello = (msg: string, word: string): string => {
  return msg + word;
};

type SayHello = (msg: string, word: string) => string;
const hello2: SayHello = (msg: string, word: string): string => {
  return msg + word;
};

const hello3: SayHello = (msg, word) => {
  return msg + word;
};
```

- 선택적 매개변수

```ts
const hello = (msg: string, word?: string): void => {};

type SayHello = (msg: string, word?: string) => void;
const hello3: SayHello = (msg, word) => {};
```

- 타입객체에 함수 정의하기

```ts
type Calculator = {
  name: string;
  add: (a: number, b: number) => number;
  minus: (a: number, b: number) => number;
  multi: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
};

const calc: Calculator = {
  name: "계산기",
  add: (a, b) => a + b,
  minus: (a, b) => a - b,
  multi: (a, b) => a * b,
  divide: (a, b) => a / b,
};
calc.name;
calc.add(5, 6);
````
