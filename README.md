# ts-심화 - 제네릭

- 나중에 타입을 결정한다.
- `타입변수`입니다.
- any 타입에서 효과를 발휘한다.

## 1. 함수에서 제네릭 사용하기

- 매개변수가 종류가 무엇인지 모르겠다.
- any 를 선호하더라~

```ts
function whatValue(value: any) {
  return value;
}

const result = whatValue("안녕");
```

- any 타입은 `아무거나 다 된다`라는 의미임
- `리턴이 되는 값이 타입도 any 가 되어서 정확하지 않다.`
- 아래의 경우는 문제가 된다.

```ts
function whatValue(value: any) {
  return value;
}

const result = whatValue("안녕");
result.toUpperCase(); // 대문자로 바꾸기, 문제없음

// 숫자라서 오류발생
const resultNum = whatValue(123);
resultNum.toUpperCase(); // 대문자로 바꾸기, 실행중 Error
```

- 위의 문제를 해결하기 위해서 `제네릭`을 이용해서 해결하자.

```ts
function whatValue<T>(value: T): T {
  return value;
}
//const result: "안녕"
const result = whatValue("안녕");
result.toUpperCase(); // 대문자로 바꾸기, 문제없음

// 숫자라서 오류발생
//const resultNum: 123
const resultNum = whatValue(123);
resultNum.toUpperCase(); // Error
```

- VSCode 가 실시간으로 타입추론 잘 해줌.

## 2. 함수에서 제네릭을 여러개 사용하기

```ts
function mulitiFun<T, K>(a: T, b: K): { a: T; b: K } {
  return { a, b };
}
/**
 * : {
    a: string;
    b: number;     
 *  }
 */
const result = mulitiFun("iu", 20);
```

## 문제풀이

- 숫자값을 받아서 숫자로 돌려주는 제네릭 함수 만들기

```ts
function doubleNum<T>(a: T): T {
  return a;
}
const result = doubleNum(5);
```

## 3. 인터페이스에서 제네릭 활용하기

- 유연하게 데이터 타입을 정의하는 방법
- 데이터의 모양을 약속하는 문법

```ts
interface Person {
  name: string;
  age: number;
}
const me: Person = {
  name: "iu",
  age: 20,
};
```

- 제네릭으로 전달해 보기

```ts
interface Person<T> {
  name: T;
  age: number;
}
const me: Person<string> = {
  name: "iu",
  age: 20,
};
```

- 예제

```ts
interface DateCache<T> {
  data: T[];
  lastUpdate: Date;
}
const d: DateCache<string> = {
  data: ["할일", "내일할일"],
  lastUpdate: new Date(),
};

const p: DateCache<number> = {
  data: [1, 2, 3],
  lastUpdate: new Date(),
};
```

## 4. 모든 제네릭에 기본 종류 지정해 주기

```ts
interface DateCache<T = string> {
  data: T[];
  lastUpdate: Date;
}
// 아래는 기본형으로 string
const d: DateCache = {
  data: ["할일", "내일할일"],
  lastUpdate: new Date(),
};

// 아래는 기본형 말고 number 로 변경
const p: DateCache<number> = {
  data: [1, 2, 3],
  lastUpdate: new Date(),
};
```

## 5. type 키워드에서 제네릭 활용하기

```ts
type MyType<T> = T;
const m: MyType<string> = "hi";
const a: MyType<number> = 20;
```

## 6. 클래스에서 제네릭 활용하기

```ts
class NumberPagination {
  // 필수 속성
  data: number[] = [];
  message?: string;
  lastFetchAt?: Date;
}

const a = new NumberPagination();
```

- 제네릭 적용

```ts
class NumberPagination<T, K> {
  // 필수 속성
  data: T[] = [];
  message?: K;
  lastFetchAt?: Date;
}

const a = new NumberPagination<string, number>();
```

## 7. 생성자 함수에서 제네릭 활용하기

```ts
class NumberPagination<T, K> {
  // 필수 속성
  data: T[] = [];
  message?: K;
  lastFetchAt?: Date;
  // new 하면 실행 될 생성자 함수
  constructor(data: T[], message?: K, lastFetchAt?: Date) {
    this.data = data;
    this.message = message;
    this.lastFetchAt = lastFetchAt;
  }
}

const a = new NumberPagination<string, number>(["iu", "jin"], 2025);
```

## 8. 상속에서 제네릭 활용하기
