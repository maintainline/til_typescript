# ts 심화 - 함수 정의하기

- ts 에서는 아래처럼 함수를 생성하지 말자.
- 함수에서는 `매개변수` name에 대해 `타입추론 안해줌.`
- 일반 변수는 타입추론 지원해줌.

```ts
// 매개변수 name 에 대해서 타입추론을 개발자에게 양도함.
function showName(name) {
  console.log(name);
}
```

- ts 에서는 최소 `매개변수에 대해서는 타입 직접 지정`

```ts
// 개발자가 정의
function showName(name: string) {
  console.log(name);
}
```

- 반환값에 대해서는 VSCode가 타입추론 해줌.(명시해주지 않고 보자.)

## 함수의 옵셔널(?) 매개 변수

- 옵셔널을 사용하면 매개 변수가 필수 값이 아니다.
- 선택적으로 활용할 수 있다.
- `옵셔널을 활용`하면 `undefined 를 허용`하겠다.

```ts
function showName(name: string, age?: number) {
  console.log(name);
  if (age) {
    console.log(age);
  }
}

const result = showName("iu");
const result2 = showName("jin", 20);
```

## 함수의 매개변수 기본값(Default Value)

- 사용자가 만약에 값을 넣지않는다면 기본값 처리

```ts
function showName(name: string, country: string = "한국") {
  console.log(name);
  console.log(country); // 한국
}

const result = showName("iu");
const result2 = showName("jin");
const result3 = showName("jon", "korea");
```

## 함수의 매개변수 나머지 처리(...)

- Rest Parameter
- 매개변수 갯수를 모를때 활용(라이브러리에 자주보임)

```ts
function showMember(...args: string[]) {
  console.log(args);
}
showMember("a", "b", "c"); //["a","b","c"]
showMember("a", "b", "c", "d"); //["a","b""c","d"]
showMember("a"); //["a"]
```

```ts
// first 사용시.
function showMember(first:string...args: string[]) {
  console.log(first);
  console.log(args);
}
showMember("a", "b", "c"); //"a",["b","c"]
showMember("a", "b", "c", "d"); //"a"["b""c","d"]
showMember("a"); //"a"
```

## 함수의 리턴타입에 대한 처리

- 기본적으로 타입추론을 보자

```ts
function add(a: number, b: number) {
  return a + b;
}
```

- 아래의 경우는 우리가 고민을 해야한다.

```ts
function randomResult() {
  return Math.random() > 0.5 ? "hi" : 100;
}
let a: "hi" | 100 = randomResult();
let b: "hi" | 100 = randomResult();
```

## 함수의 리턴 타입이 void

- void 는 기본형 데이터가 아닙니다.
- 아무것도 리턴하는 값이 없다.

```ts
function randomResult() {}

let a = randomResult();
let b = randomResult();
```

## 함수의 리턴타입이 never

- 절대로 리턴이 되면 안된다를 표현
- 무한루프, Error가 발생한다면
- 강제로 에러를 발생시켜봄

```ts
function makeError(): never {
  throw new Error("에러 처리");
}
makeError();
```

- 무한 루프 예제

```ts
function loop() {
  while (true) {}
}
loop();
```

# ts 심화 - 함수 시그니처를 타입으로 정의하기

- 아래 코드는 가독성이 복잡하다.

```ts
const sing: (arr: string[]) => string[] = (arr: string[]) => {
  return arr.map((item) => `${item} 입니다.`);
};
sing(["아이유", "지민"]);
```

- 위의 코드를 type 으로 추출

```ts
type MapParam = (arr: string[]) => string[];

const sing: MapParam = (arr: string[]) => {
  return arr.map((item) => `${item} 입니다.`);
};

sing(["아이유", "지민"]);
```

- 매개변수 없고, 리턴도 없고

```ts
type SingType = () => void;
const sing: SingType = () => {};
sing();
```

- 매개변수 있고, 리턴은 없는 경우

```ts
type SingType = (user: string) => void;

const sing: SingType = (user: string) => {};
sing("iu");
```

- 매개변수 있고, 리턴도 있는 경우

```ts
type SingType = (user: string) => string;
const sing: (user: string) => string = (user: string) => {
  return user;
};
sing("아이유");
```

- interface 를 이용해서 정의하기

```ts
type SingType = (user: string) => string;

interface SingI {
  // 키명 : 키값
  (user: string): string;
}

const sing: (user: string) => string = (user: string) => {
  return user;
};
sing("아이유");
```

# ts 심화 - 함수 오버로딩

- 동일한 함수명
- 매개변수 개수 또는 데이터 종류가 다르다.
- 오류가능성 존재

```ts
// 매개변수 한개
// 매개변수 세개
function showMember(a: string, b?: string, c?: string) {
  showMember("iu");
  showMember("iu", "jin", "jenney");
  showMember("iu", "jin"); // 매개변수 두개이므로 원하는 결과가 아님.
}
```

- 함수 오버로딩 구현

```ts
// 매개변수 한개
// 매개변수 세개
// 규칙부분
function showMember(a: string): void;
function showMember(a: string, b: string, c: string): void;
// 구현 부분
function showMember(a: string, b?: string, c?: string): void {
  console.log(a);
  if (b && c) {
    console.log(b, c);
  }
}

showMember("아이유");
showMember("아이유", "지민", "리사");
showMember("아이유", "지민"); // 2개가 가능하므로 오류이다.
```

# ts 심화 - Type Predicate

- 어떤 변수 또는 반환값이 `특정 타입인지 확인하는 용도의 함수`

```ts
// 어떤 재료가 들어왔을 때 number 인지 확인 하는 함수
function isNumber(a: any): a is number {
  return typeof a === "number";
}
const age = isNumber(30);

// 어떤 재료가 들어왔을 때 boolean 인지 확인 하는 함수
function isBoolean(a: any): a is boolean {
  return typeof a === "boolean";
}
const hi = isBoolean("안녕");
```

```ts
// 어떤 재료가 들어왔을 때 number 인지 확인 하는 함수
function isNumber(a: any): a is number {
  return typeof a === "number";
}
const age = isNumber(30);

let test: any = 100;
if (isNumber(test)) {
  test; // let test: number
}

// 어떤 재료가 들어왔을 때 boolean 인지 확인 하는 함수
function isBoolean(a: any): a is boolean {
  return typeof a === "boolean";
}
const hi = isBoolean("안녕");

let check: any = false;
if (isBoolean(check)) {
  // boolena 이라면 처리하겠다.
  check; // let check: boolean
}

let count: any = "5번";

if (isNumber(count)) {
  // 정말 숫자다.
  count;
  Math.round(count);
} else {
  // 숫자가 아니다.
  console.log("숫자여야 합니다.");
}
```

- interface 활용

```ts
interface Dog {
  name: string;
  age: number;
}
interface Cat {
  name: string;
  breed: string;
}
type DogCat = Dog | Cat;
function isDog(a: DogCat) {
  return (a as Dog).age !== undefined;
}
const pp: DogCat = { name: "멍멍이", age: 10 };
const cc: DogCat = { name: "멍멍이", breed: "샴" };

if (isDog(pp)) {
  // Dog 이라는 코드 진행
  pp; // const pp : Dog
} else {
  // Cat이라는 코드 진행
}
```

# ts 심화 - 참고

- 타입오류 발생시 조치사항
- `any로 변경` > `Narrowing(타입좁히기if 문 사용)` > `as로 강제 타입` > `is함수`
