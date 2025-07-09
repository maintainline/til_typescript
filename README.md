# type 과 interface 비교

## 1. 가장 큰 차이

- type : 객체, 기본형, 배열 등 모두 정의 가능
- interface : 객체만 대상으로 정의 가능

## 2. 객체 구조 정의 비교

```ts
interface IPerson {
  name: string;
  age: number;
}
type PersonType = {
  name: string;
  age: number;
};
```

### 3. 확장 방식의 차이

- interface : `extends`
- type : `&`

```ts
interface IAnimal {
  name: string;
}
//확장
interface IDog extends IAnimal {
  bark(): void;
}
//=====================================
type AnimalType = {
  name: string;
};
// 병합
type DogType = AnimalType & {
  bark(): void;
};
```

```ts
interface Dog {
  name: string;
}
interface Dog {
  age: number;
}
interface Dog {
  bark(): void;
}

const a: Dog = {
  name: "댕댕이",
  age: 10,
  bark: () => console.log("멍"),
};
// type 은 중복된 속성명 안됨
type DogType = {};
type DogType = {};
type DogType = {};
```

## 5. type 만 가능함.

- interface 는 `객체의 모양`만 만들 수 있다

```ts
// 유니언 문법 type만 가능.interface 불가.
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Result = string | number | boolean;
// 배열, 튜블( 배열인데, 개수와 종류를 미리 정의)
type Point = [number, number];
```

## 6. 클래스에서 implements 는 `interface 권장`

```ts
interface 약속 {
  name: string;
}
class Person implements 약속 {
  name: string;
}
// 아래도 가능함. 하지만~?
type 약속타입 = {
  name: string;
};
class Dog implements 약속타입 {
  name: string;
}
```

## 7. 일반적 기준

- 객체 모양을 정의하는 경우 : interface 권장
- 여러 타입을 조합한다. (유니언 등) : type 권장
- 복잡한 타입(속성에 함수, 유니언등) : type 권장
- 여러명이 작업을 한다면 : interface 권장
- 외부 라이브러리는 일반적으로 interface 로 작성되어진다.
