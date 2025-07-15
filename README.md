# ts 심화 - 기본타입

- 굳이 타입을 작성하지 않아도 괜찮다.
- VSCode가 `타입추론`을 잘해 준다면 생략하자

## 총 7가지의 기본타입

```ts
let strVar = "string";
let numVar = 1;
let bigVar = BigInt(999999);
let boolVar = true;
let symbolVar = Symbol("symbol");
// 아래는 타입추론이 문법적으로 다르다.
let nullVar: any = null; // 타입추론결과가 any 로 나옴
let null2Var: null = null; // 타입에 관여
// 아래는 타입추론이 문법적으로 다르다.
let undefinedVar: any = undefined; // 타입추론결과가 any 로 나옴
let undefined2Var: undefined = undefined; // 타입에 관여
```

## TS에만 존재하는 기본형 타입

### 1. any

- 정말 자주 사용함. 타입이 중요하지 않을때 많이 쓰임
- 사용은 하지만, 과도하게 사용은 하지말자
- `치트키`
- any 타입은 어디에나 사용가능
- any 타입은 어느곳에도 할당, 즉 대입이 가능함.

```ts
let anyVar: any = 1450;
let strVar = anyVar;
let numVar = anyVar;
let bigVar = BigInt(anyVar);
let boolVar = anyVar;
let symbolVar = anyVar;
let nullVar = anyVar;
let undefinedVar = anyVar;
```

### 2. unknown

- any 와 용도가 비슷한 느낌
- any 처럼 어떤것도 값을 담을 수 있다.
- 다른 변수에 담기, 즉 할당은 못함
- 입력은 되지만, 할당하지는 못하는 특징

```ts
let unknownVar: unknown;
unknownVar = 100;
unknownVar = "string";
unknownVar = true;

// 아래부터는 에러
let numVar: number = unknownVar;
//'unknown' 형식은 'number' 형식에 할당할 수 없습니다.
```

### 3. never

- 어떤 타입도 `저장 또는 리턴 하지 않겠다`는 의지 표현
- 절대로 발생하지 않을 것이라는 의지 표현
- 예외처리, 무한루프 처리에 활용

```ts
// 아래는 모두다 에러입니다.
let neverVar: never = null;
let never2Var: never = undefined;
let never3Var: never = 1;
let never4Var: never = "string";
//'위의 값' 형식은 'never' 형식에 할당할 수 없습니다.
```

# ts 심화 - 목록(배열) 타입

- 리스트 타입

```ts
// 타입추론 잘 정리됨
let numberArr = [1, 2, 3];
let strArr = ["hong", "kim"];
let Arr = [true, 3, "hello"];
```

```ts
// genaric 구성
let numberArr: Array<number> = [1, 2, 3];
let strArr: Array<string> = ["hong", "kim"];
let Arr: Array<boolean | number | string> = [true, 3, "hello"];
```

# ts 심화 - Type, Interface 타입

## 1. type 키워드로 정의하기

- 기본형 타입도 type 키워드로 별칭을 만들 수 있다.

```ts
type HiType = string;
let hi: HiType = "Hello";

type AgeType = number;
let age: AgeType = 20;
```

- `복잡한 객체 형태`의 데이터도 type 키워드로 별칭을 만들 수 있다.

```ts
type IdolType = {
  name: string;
  age: number;
  year: number;
};
let bts: IdolType = {
  name: "bts",
  age: 20,
  year: 2020,
};
```
