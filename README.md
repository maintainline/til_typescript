# 객체 (`{}`)와 배열(`[]`)의 반복문

## 1. 배열의 반복문

- for문

```js
const arr = [1, 2, 3, 4];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1,2,3,4
}
```

- forEach

```js
const arr = [1, 2, 3, 4];
arr.forEach(function (요소, 인덱스, 원본배열) {
  console.log(요소); // 1,2,3,4
});
arr.forEach((요소, 인덱스, 원본배열) => {
  console.log(요소); // 1,2,3,4
});
// 아래 구문이 많이 사용되는 형태이다.
arr.forEach((요소, 인덱스) => {
  console.log(요소); // 1,2,3,4
});
arr.forEach((item, index) => {
  console.log(index); // 0,1,2,3
  console.log(item); // 1,2,3,4
});
```

- map : 원보 배열에서 새로운 배열을 만든다.(`완젼 중요~`)

```js
const arr = [1, 3, 5, 2];
arr.map(function (요소, 인덱스, 원본배열) {
  return 요소 + 1; //2,4,6,3
});
arr.map((요소, 인덱스, 원본배열) => {
  return 요소 + 1; //2,4,6,3
});
//아래처럼 주로 사용합니다.매우중요
const resultArr = arr.map((요소, 인덱스) => {
  return 요소 + 1; //2,4,6,3
});
```

```js
const arr = [10, 20, 11, 24];
const resultArr = arr.map((item, index) => {
  return `<div class="box">${item}</div>`;
});
```

- for in 구문 : (가능하면 사용하지 마세요. 객체에게 양보하세요 ~^ㅡ^)

## 2. 객체의 반복문

- for in 구문 : 가장 추천

```js
const obj = {
  age: 10,
  nickName: "hong",
  isMember: true,
};

for (속성명 in 원본객체) {
  console.log(속성명);
  console.log(원본객체[속성명]);
}
for (key in obj) {
  console.log(key); // age, nickName, isMember 속성명 출력
  console.log(obj[key]); // 10, hong, true  속성 값 출력
}
```

- Object.keys(객체).forEach : 참조만 하자. (속성명)

```js
const obj = {
  age: 10,
  nickName: "hong",
  isMember: true,
};
Object.keys(obj); // [age, nickName, isMember] 속성명 출력 배열로 반환
Object.keys(obj).forEach(function (요소, 인덱스, 원본) {});
Object.keys(obj).forEach((요소, 인덱스, 원본) => {
  console.log(요소); // age, nickName, isMember
});
```

- Object.values(객체).forEach : 참조만 하자 (속성값)

```js
const obj = {
  age: 10,
  nickName: "hong",
  isMember: true,
};
Object.values(obj); // [10, hong, true] 속성값 출력 배열로 반환
Object.values(obj).forEach(function (요소, 인덱스, 원본) {});
Object.values(obj).forEach((요소, 인덱스, 원본) => {
  console.log(요소); // 10, hong, true
});
```

- Object.entries(객체).forEach : 참조만 (속성명, 값 둘다 출력)

```js
const obj = {
  age: 10,
  nickName: "hong",
  isMember: true,
};
Object.entries(obj);
Object.entries(obj).forEach(function (요소, 인덱스, 원본) {});
Object.entries(obj).forEach((요소, 인덱스, 원본) => {
  console.log(요소); // [age, 10]
  console.log(요소); // [nickName, "hong"]
  console.log(요소); // [isMember, true]
});
```

## 3. 정리 (필수로 알아야함)

- for
- 배열.map
- 배열.forEach
- for(key in 객체)

# 값을 추출해서 보관하기(`완젼 중요~~`)

## 1. `배열`의 값을 뽑아서 보관하기

```js
const arr = ["사과", "딸기", "바나나"];
// 아래는 단순한 방법. 배열이 적을때는 사용할만한 방법
const apple = arr[0];
const strawberry = arr[1];
const banana = arr[2];

// 아래처럼 ... spread 문법을 권장함. 배열이 많을수도 있기때문
const [a, b, c] = [...arr];
console.log(a); // 사과
console.log(b); // 딸기
console.log(c); // 바나나
```

- `Spread 문법`으로 2개의 배열을 하나로 합치기

```js
const arr = ["사과", "딸기", "바나나"];
const resultArr1 = [5, arr[0], arr[1], arr[2], 3, 7, 1]; // spread 문법을 모른다면 이렇게 써야함 ㅜ
const resultArr2 = [5, ...arr, 3, 7, 1]; // [5,사과,딸기,바나나,3,7,1]

// Rest 파라메터
function 함수(...rest) {
  console.log(rest); //[1,2,3]
}
함수(1, 2, 3);
```

## 2. `객체`의 값을 뽑아서 보관하기(`중요`)

```js
const obj = { age: 10, job: "개발자", city: "대구" };
const a = obj.age;
const b = obj.job;
const c = obj["city"];

//객체 구조 분해 할당(DeStructuring)
const { a, b, c } = obj;
```
