# Generic

- `타입을 나중에 결정한다.`
- Generic 을 `타입 변수` 라고 정리하자.
- 일반적인 변수는 값이 바뀌지만, Generic은 값이 아니고 `변수의 종류를 변경`한다.

## 1. 문제 상황 살펴보기

- 매개 변수의 `종류만 다르고` 기능은 같을때
- 아래 코드를 자주 보게 된다.

```ts
function showNumber(a: number): void {
  console.log(a);
}
showNumber(100);

function showString(a: string): void {
  console.log(a);
}
showString("안녕");
```

- 매개변수의 종류를 `any` 로 하면 되겠다!
- 위의 두 함수를 하나로 정리하는 것이 좋겠다!

```ts
function showArg(a: any): void {
  console.log(a);
}
showArg(0);
showArg("안녕");
```

- 위 처럼 any 로 작업을 했더니 추가적인 기능이 필요하게 되었다...!
- `any`는 서비스 `실행중 오류 발생`함. 대처 불가
- 즉 코딩 중 오류확인이 어렵다..! 예측 불가

```ts
function showArgA(a: any): void {
  console.log(a);
  console.log(a.length);
}
showArgA(0); // 실행중 오류 발생
showArgA("안녕"); // 정상작동
```

## 2. 문제 상황을 Generic 으로 해결해 보기

```ts
// T 를 무엇으로 생각하시면 좋으냐면 타입변수
function showArgGeneric<T>(a: T): void {
  console.log(a);
}
showArgGeneric(0);
showArgGeneric("안녕");
```

- 아래의 코드는 아직도 오류로 처리됩니다.
- 하지만 실행중 오류가 아닌, `코딩중 오류`를 표현해서 대처가 가능합니다.

```ts
// T 를 무엇으로 생각하시면 좋으냐면 타입변수
function showArgGeneric<T>(a: T): void {
  console.log(a);
  // 아래의 문제는 타입을 좁히기로 해결이 가능하다.
  // 타입 가드라고 한다.
  console.log(a.length);
}
showArgGeneric(0);
showArgGeneric("안녕");
```

- 우선 해결코드를 진행하고, 다시 문법 보자.

```ts
function showArgGeneric<T>(a: T): void {
  console.log(a);
  // console.log(a.length); // 아래에서 if 로 오류 처리 진행

  // 타입 좁히기
  if ((a as any).length !== undefined) {
    console.log((a as any).length);
  } else {
    console.log("length 속성이 없습니다.");
  }
}

showArgGeneric(0);
showArgGeneric("안녕");
```

## 3. 다양한 예제

```ts
// 배열의 요소를 출력하는 함수
// 그런데 배열의 요소의 타입을 제네릭으로 구현

function showItems(
  arr: (
    | string
    | number
    | boolean
    | { age: number }
    | { age: number; name: string }
  )[]
) {
  arr.forEach((item, index) => {
    console.log(`${index}번째 요소는 ${item}입니다.`);
  });
}
showItems(["a", "b", "c"]);
showItems([1, 2, 3, 4]);
showItems([true, true, false, false]);
showItems([{ age: 1 }, { age: 2 }, { age: 3 }]);
showItems([
  { age: 1, name: "hong" },
  { age: 2, name: "kim" },
  { age: 3, name: "park" },
]);
```

- Generic 활용 코드

```ts
// 배열의 요소를 출력하는 함수
// 그런데 배열의 요소의 타입을 제네릭으로 구현

function showItems<T>(arr: T[]) {
  arr.forEach((item, index) => {
    console.log(`${index}번째 요소는 ${item}입니다.`);
  });
}
showItems(["a", "b", "c"]);
showItems([1, 2, 3, 4]);
showItems([true, true, false, false]);
showItems([{ age: 1 }, { age: 2 }, { age: 3 }]);
showItems([
  { age: 1, name: "hong" },
  { age: 2, name: "kim" },
  { age: 3, name: "park" },
]);
```

- 예제 2

```ts
// 복사를 하는 함수
function copyValue(a: number | string | boolean | (number | string)[]) {
  return a;
}

const result_1 = copyValue(1);
const result_2 = copyValue("hello");
const result_3 = copyValue(false);
const result_4 = copyValue([1, 2, 3]);
const result_5 = copyValue(["a", "b", "c"]);
```

```ts
// 복사를 하는 함수
function copyValue(a: any) {
  return a;
}

const result_1 = copyValue(1);
const result_2 = copyValue("hello");
const result_3 = copyValue(false);
const result_4 = copyValue([1, 2, 3]);
const result_5 = copyValue(["a", "b", "c"]);
```

- Generic 사용

```ts
// 복사를 하는 함수
function copyValue<T>(a: T) {
  return a;
}

const result_1 = copyValue(1);
const result_2 = copyValue("hello");
const result_3 = copyValue(false);
const result_4 = copyValue([1, 2, 3]);
const result_5 = copyValue(["a", "b", "c"]);
```

- 예제 3

```ts
// 입력값 반환하기
function returnSame(input: any): any {
  return input;
}
const result_1: any = returnSame(1);
const result_2: any = returnSame("hello");
const result_3: any = returnSame([1, 2, 3]);
```

- Generic 활용

```ts
// 입력값 반환하기
function returnSame<T>(input: T): T {
  return input;
}
const result_1: 1 = returnSame(1);
const result_2: "hello" = returnSame("hello");
const result_3: number[] = returnSame([1, 2, 3]);
```

## 함수에서 활용되는 제네릭 살펴보기

```ts
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

let result_1: number = getFirst([1, 2, 3]);
let result_2: string = getFirst(["a", "b", "c"]);
let result_3: string | number = getFirst([3, "b", "c"]);
```

```ts
function reverseArr<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

let result_1: number[] = reverseArr([1, 2, 3]);
let result_2: string[] = reverseArr(["a", "b", "c"]);
let result_3: (string | number)[] = reverseArr([3, "b", "c"]);
```

```ts
function mergeArr<T>(arr1: T[], arr2: T[]): T[] {
  return [...arr1, ...arr2];
}
let result_1: number[] = mergeArr([1, 2, 3], [6, 7, 8]);
```

```ts
function mergeArr<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
  return [...arr1, ...arr2];
}
let result: (string | number)[] = mergeArr([1, 2, 3], ["a", "b", "c"]);
```

- 함수의 데이터 종류의 변경 진행과정

```ts
// 배열의 특정 요소를 인덱스를 가져오기
// 배열은 length 라는 속성이 있다.(길이, 요소 개수)
// 배열은 요소의 순서 (index)가 있습니다.

function getItemIdex(
  배열: (number | string | boolean)[],
  인덱스: number
): number | string | boolean {
  return 배열[인덱스];
}
// 규칙 -> 반드시 숫자 배열이어야 한다.(배열 종류에 제한이 걸림)
const result = getItemIdex([4, 7, 9], 2);
const result2 = getItemIdex(["hello", "hi"], 2);
const result3 = getItemIdex([true, false], 2);
```

- any 로 해결하면 데이터 체크를 할 수 없다.
- 현재 작동이 잘 될수 는 있으나. 나중에 에러가 발생할 가능성이 많음.

```ts
function getItemIdex(배열: any[], 인덱스: number): any {
  return 배열[인덱스];
}
// 규칙 -> 반드시 숫자 배열이어야 한다.(배열 종류에 제한이 걸림)
const result: any = getItemIdex([4, 7, 9], 2);
const result2: any = getItemIdex(["hello", "hi"], 2);
const result3: any = getItemIdex([true, false], 2);
```

- `Generic을 사용`하면 코딩중에 오류발견이 수월하다.(any 보다 추천)
- 서비스 중에도 대응이 바로 가능하다.

```ts
function getItemIdex<T>(배열: T[], 인덱스: number): T {
  return 배열[인덱스];
}
// 규칙 -> 반드시 숫자 배열이어야 한다.(배열 종류에 제한이 걸림)
const result: number = getItemIdex([4, 7, 9], 2);
const result2: string = getItemIdex(["hello", "hi"], 2);
const result3: boolean = getItemIdex([true, false], 2);
const result4: string | number | boolean = getItemIdex(
  [true, 1, "hi", null],
  2
);
```

- 기본적으로 진행한 함수

```ts
// 배열의 요소 중 값이 있는지 파악가능
function findItem(배열: (string | number)[], 값: string | number): boolean {
  return 배열.includes(값);
}
const result = findItem(["수영", "공부", "요리"], "운동");
const result1 = findItem([12, 20, 33], 20);
```

- any로 해결했을때

```ts
function findItem(배열: any[], 값: any): any {
  return 배열.includes(값);
}
const result = findItem(["수영", "공부", "요리"], "운동");
const result1 = findItem([12, 20, 33], 20);
```

- Generic 사용

```ts
function findItem<T>(배열: T[], 값: T): boolean {
  return 배열.includes(값);
}
const result = findItem(["수영", "공부", "요리"], "운동");
const result1 = findItem([12, 20, 33], 20);
const result2 = findItem([12, "hi", false], 20);
```

## 인터페이스에서 제네릭 살펴보기

- 인터페이스는 데이터 모양이 객체이다.
- 인터페이스는 객체만을 위한 문법이다.
- 인터페이스 설계과정

```ts
// 백엔드와 비동기 통신을 하는 중의 과정을 위한 객체 설계

interface ApiResponse {
  success: boolean;
  data: string | string[];
}
const loginApi: ApiResponse = {
  success: true,
  data: "ok",
};
const todoApi2: ApiResponse = {
  success: true,
  data: ["공부", "운동", "휴식"],
};
```

- 앞으로 또 바뀔 소지가 있을것 같다.. 라고 생각
- any로 사용 해봄

```ts
interface ApiResponse {
  success: any;
  data: any | any[];
}
const loginApi: ApiResponse = {
  success: true,
  data: "ok",
};
const todoApi2: ApiResponse = {
  success: false,
  data: ["공부", "운동", "휴식"],
};
```

- Generic으로 해결하기.
- 코딩중 오류와 실행중 오류를 파악하기 용이함!

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T | T[];
}
const loginApi: ApiResponse<string> = {
  success: true,
  data: "ok",
};
const todoApi2: ApiResponse<string> = {
  success: false,
  data: ["공부", "운동", "휴식"],
};
```

- 인터페이스에서 `여러개의 Generic` 활용하기

```ts
interface ApiResponse<T, U, V> {
  success: T;
  data: U | V[];
}
const loginApi: ApiResponse<boolean, string, string> = {
  success: true,
  data: "ok",
};

const todoApi: ApiResponse<number, string, string> = {
  success: 0,
  data: ["공부", "운동", "휴식"],
};
```

## 클래스에서 Generic 살펴보기

- 일반적인 클래스 구성

```ts
// 저장하기 관련 클래스
class TodoStorage {
  // 내부에서만 사용할변수
  private items: string[] = [];
  // 메소드 만으로 즉. 검증된 과정으로만 내부 item 배열 접근
  add(item: string): void {
    this.items.push(item);
  }
  read(): string[] {
    return this.items;
  }
}

const result = new TodoStorage();
// result 에는 인스턴스로서 {} 가 저장됨
// result.items = ["이름1", "이름2"]; // 접근 값 변경 불가
// console.log(result.items); // 읽을수도 없다.
result.add("이름");
result.read();
```

- 다양한 데이터 종류를 위해서 any변경

```ts
// 저장하기 관련 클래스
class TodoStorage {
  private items: any[] = [];
  add(item: any): void {
    this.items.push(item);
  }
  read(): any[] {
    return this.items;
  }
}

const result = new TodoStorage();
result.add("이름");
result.read();
```

- Generic으로 활용

```ts
// 저장하기 관련 클래스
class TodoStorage<T> {
  private items: T[] = [];
  add(item: T): void {
    this.items.push(item);
  }
  read(): T[] {
    return this.items;
  }
}

const result = new TodoStorage<string>();
result.add("이름");
result.read();
```
