# Scope (범위)

- 변수가 살아남는 범위
- 변수를 찾아서 사용할 수 있는 범위

## 1. Scope 종류

- `전역` 스코프 : 코드에서 어디에서든 접근 및 사용가능 (`var`, let, const)
- `지역` 스코프 : `function` 또는 `{}`(블록) 안쪽에서만 사용가능
- `블록` 스코프 : `{}` 블록 안에서만 사용가능 (if, for 등에서 let, const)

## 2. 전역(글로벌) 스코프 간단예제

- 코드 어디서나 사용할 수 있는 범위

```js
let message = "안녕"; //전역스코프
function sayHello() {
  console.log(message);
}
sayHello();
```

```ts
let message: string = "안녕"; //전역스코프
function sayHello(): void {
  console.log(message);
}

//화살표 함수 변형
const sayHello = (): void => {
  console.log(message);
};
sayHello();
```

## 3. 지역(로컬) 스코프 간단예제

```js
function sayHello() {
  let meassge = "안녕";
  console.log(message);
}
sayHello();
```

```ts
function sayHello(): void {
  let meassge: string = "안녕";
  console.log(message);
}

// 화살표 함수
const sayHello = (): void => {
  let meassge: string = "안녕";
  console.log(message);
};
sayHello();
```

## 4. 전역과 지역 스코프 간단 예제

- 전역 스코프보다 지역스코프가 우선순위이다.

```js
let message = "안녕";
function sayHello() {
  let message = "Hi~";
  console.log(message);
}
sayHello(); //지역 스코프 범위인 "Hi~" 가 출력된다.
```

```ts
let message: string = "안녕";
function sayHello(): void {
  let message: string = "Hi~";
  console.log(message);
}
sayHello(); //지역 스코프 범위인 "Hi~" 가 출력된다.
```

## 5. 블록 스코프 간단 예제

- var가 스트레스를 준다.
- 옛날 코딩에 var를 사용했지만, 문제가 많음

```js
//  블록 스코프 예제 js
const age = 0;
{
  const age = 10;
  const subject = "공부";
}
conslos.log(age); /// 0 을 출력
conslos.log(subject); /// 오류, not defined..
```

```ts
//  블록 스코프 예제 ts
const age: number = 0;
{
  const age: number = 10;
  const subject: string = "공부";
}
conslos.log(age); /// 0 을 출력
conslos.log(subject); /// 오류, not defined..
```

```js
//  블록 스코프 예제 js
let age = 0;
{
  let age = 10;
  let subject = "공부";
}
conslos.log(age); /// 0 을 출력
conslos.log(subject); /// 오류, not defined..
```

```ts
//  블록 스코프 예제 ts
let age: number = 0;
{
  let age: number = 10;
  let subject: string = "공부";
}
conslos.log(age); /// 0 을 출력
conslos.log(subject); /// 오류, not defined..
```

- var는 Scope가 규칙적이지 않고, 무조건 전역으로 생성됨(안쓴느게 좋음)

```js
//  블록 스코프 예제 js
var age = 0;
{
  var age = 10;
  var subject = "공부";
}
conslos.log(age); /// 10 을 출력
conslos.log(subject); /// 공부 출력
```

```ts
//  블록 스코프 예제 ts
var age: number = 0;
{
  var age: number = 10;
  var subject: string = "공부";
}
conslos.log(age); /// 10 을 출력
conslos.log(subject); /// 공부 출력
```

- var 는 `{}`블록 스코프는 없고. function 지역스코프는 있다.

```js
var age = 0;
function showAge() {
  var age = 100;
}
console.log(age);
showAge();
console.log(age);
```

```ts
var age: number = 0;
function showAge(): void {
  var age: number = 100;
}
console.log(age); // 0
showAge();
console.log(age); // 0
```

## 6. 전체 스코프 정리

- let, const 는 `{}에 따라 스코프가 정리` 된다.

```js
let age = 0;

const job = "학생";
{
  let age = 100;
  let job = "개발자";
}
function showPerson() {
  let age = 400;
  let job = "요리사";
}
if (true) {
  let age = 800;
  let job = "직원";
}
```

- var 는 `function 에 따라 스코프가 정리` 된다.

```js
var age = 0;
var job = "학생";
{
  var age = 100;
  var job = "개발자";
}
function showPerson() {
  var age = 400;
  var job = "요리사";
  console.log(age); //400
}
console.log(age); //100

if (true) {
  var age = 800;
  var job = "직원";
}
```

## 7. 간단 문답

```js
if (true) {
  let age = 100;
}
console.log(age); // let은 {} 중괄호 안에 무시 Error
```

```js
if (true) {
  var age = 100;
}
console.log(age); // var은 {} 중괄호 안 값을 찾음 100
```

# 호이스팅의 이해 (변수에서)

- 만들지 않았는데 사용가능한 것(좋지않다..?)

## 1. 호이스팅이 일어나지 않는 경우

```js
console.log(age); //Error let~ 이 밑줄에 있기 때문. 만들지 않았는데 값을 내려함
let age = 10;
```

```js
let age = 10;
console.log(age); //10
```

```js
console.log(age); // error const~ 밑줄.
const age = 10;
```

```js
const age = 10;
console.log(age); //10
```

## 2. 호이스팅이 일어나는경우

```js
console.log(age); // undefined 값이 나온 후-> 10 값 출력
var age = 10;
console.log(age); // 10
```

# 변수의 재정의

## 1. 재정의 불가능한 경우

- 불가능

```js
let age = 10;
let age = 100; //error

const job = "학생";
const job = "개발자"; //error
```

- 가능 `{}` 블록 스코프로 구분하면 사용가능

```js
let age = 10;
{
  let age = 100;
}

const job = "학생";
{
  const job = "개발자";
}
```

## 2. 막~~~~~ 재정의 하는경우

```js
var age = 10;
var age = 100;

var job = "학생";
var job = "개발자";
```

- var 는 `{}` 무시하기 때문에 위의 코드랑 같아짐

```js
var age = 10;
{
  var age = 100;
}

var job = "학생";
{
  var job = "개발자";
}
```

# 그렇다면 let, const, var, 중에 무엇을 우선으로 할까?...

## 1. 무조건 const 로 하기

- const 변하지 않는 값

```js
const age = 0;
```

## 2. 코딩을 하다보니 값이 변경이 되어야 한다면?

- const 로 작성후 진행중에 let 으로 수정하길 권장.
- let 변하는 값

```js
let age = 0;
age = 17;
```

# 함수에서의 스코프

## 1. 중첩 함수

- 데이터를 숨기고, 기능도 숨기고
- 안전한 코드가 구성된다.

```js
function 외부() {
  //(외부함수)
  const nickName = "홍길동";
  // 중첩 함수 (내부함수)
  function 내부() {
    console.log(nickName);
  }
  내부(); //(내부함수에 값이 없으므로 외부함수에서 값을 찾음)
}
console.log(nickName); //  Error
내부(); //Error

외부(); // 홍길동
```

```ts
function 외부(): void {
  //(외부함수)
  const nickName: string = "홍길동";
  // 중첩 함수 (내부함수)
  function 내부(): void {
    console.log(nickName);
  }
  내부(); //(내부함수에 값이 없으므로 외부함수에서 값을 찾음)
}
console.log(nickName); //  Error
내부(); //Error

외부(); // 홍길동
```

## 2. 함수 외부 변수 접근 제한

- 데이터를 숨긴다.(password)
- 원하는 동작만으로 데이터를 확인 시킨다. (내부 함수)

```js
function 외부() {
  const password = "1234";
  function 내부() {
    return password;
  }
  return 내부;
}

const 기능 = 외부(); // 1234
const result = 기능();
password; //오류
```

```ts
function 외부(): () => string {
  const password: string = "1234";
  function 내부(): string {
    return password;
  }
  return 내부;
}

const 기능 = 외부(); // 1234
const result = 기능();
password; //오류
```

```ts
type ReturnType = () => string;

function 외부(): ReturnType {
  const password: string = "1234";
  function 내부(): string {
    return password;
  }
  return 내부;
}

const 기능 = 외부(); // 1234
const result = 기능();
password; //오류
```

## 3. 클로저 (Closer)

- 함수는 실행하고 나면 함수 종료시 함수 내부의 변수는 제거됨.
- 그런데 함수를 실행하고 함수 종료 후에도 내부 변수를 유지하는 것을 클로저라한다.
- 일반적 함수는 데이터 유지를 못하고 사라진다

```js
function showAge() {
  const age = 10;
  console.log(age);
}
showAge(); //10
```

```ts
function showAge(): void {
  const age: number = 10;
  console.log(age);
}
showAge(); //10
```

- 클로저로 변수값 유지하기.

```js
function showAge() {
  let age = 10;

  return function () {
    age = age + 1;
    return age;
  };
}
const a = showAge(); //값 10   a = 내부함수 retutn이 담김
a(); // 11
a(); // 12
```

```ts
type ReturnType = () => number;
function showAge(): ReturnType {
  let age: number = 10;

  return function (): number {
    age = age + 1;
    return age;
  };
}
const a: ReturnType = showAge(); //값 10   a = 내부함수 retutn이 담김
a(); // 11
a(); // 12
```

- 클로저로 배열의 요소 관리하기

```js
function createList() {
  let itemArr = [];

  return {
    // add(재료) : 재료를 담으면 itemArr에 추가한다.
    add(item) {
      itemArr.push(item);
    },

    //show() : 전체 itemArr 보여주기
    show() {
      return itemArr;
    },
  };
}
// itemArr; // Error 스코프 위반
const myList = createList(); // mylist에 내부 함수return이 담김
myList.add("사과");
myList.add("딸기");
myList.show(); // ["사과","딸기"]
```

```ts
type ReturnType = { add: (item: string) => void; show: () => string[] };
function createList(): ReturnType {
  let itemArr: string[] = [];

  return {
    // add(재료) : 재료를 담으면 itemArr에 추가한다.
    add(item: string): void {
      itemArr.push(item);
    },

    //show() : 전체 itemArr 보여주기
    show(): string[] {
      return itemArr;
    },
  };
}
// itemArr; // Error 스코프 위반
const myList: ReturnType = createList(); // mylist에 내부 함수return이 담김
myList.add("사과");
myList.add("딸기");
myList.show(); // ["사과","딸기"]
```

- 클로저는 함수가 종료되더라도 `함수의 데이터를 유지한다.`
