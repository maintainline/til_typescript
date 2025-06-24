# 객체(Object)

- `데이터`와 `데이터를 다루는 기능`을 가진 결과물..

```js
const 객체명 = {
  데이터: 데이터값,
  기능명:function(){데이터 가공}
}

// 정식 명칭
const 객체명 = {
  속성명: 속성값,
  메소드:function(){데이터 가공}
}
```

## 1. `가장 간단하게` 객체를 만드는 법

- `객체 리터럴` : 타이핑으로 객체 `{}` 적어서 만듬
- 객체리터럴로 만들경우 지켜야 할 것들

```js
const 객체명 = {
  속성명1: 속성값,
  속성명2: 속성값,
};
```

- 만약 1개의 객체를 생성하는 경우라면 `객체리터럴`추천
- 만약 1개의 객체를 생성하는 경우라면 이름은 `카멜케이스`로 한다.

```js
// 한개의 객체를 만들경우 카멜케이스로 한다.
const personInfo = { nickName: "아이유", age: 28, job: "가수" };
```

## 2. 객체를 무한하게 생성하는 `객체 생성(자) 함수 작성`

- 여러개의 객체를 생성하는 경우는 `파스칼케이스`를 함수이름으로 지정한다.

```js
// 파스칼케이스 - 첫글자 대문자
function PersonInfo() {
  this.name = "홍길동";
  this.age = 20;
  this.job = "소설가";
}
```

- 절대로 주의해야할것(`객체를 생성`하고 싶은 경우 `new`를 붙여야함.)

```js
function PersonInfo() {
  this.name = "홍길동";
  this.age = 20;
  this.job = "소설가";
}

PersonInfo(); //  함수 실행으로 진행
new PersonInfo(); // new - 함수 실행 결과로 객체 생성진행
```

## 3. 케이스를 구분해서 생각해 보자.

### 1. 그냥 함수로 사용한다면

- 아래처럼 함수를 실행하면 `this`가 window 로 된다.
- `var name = "홍길동"; var age = 20; var job = "소설가";`
- 우리가 원하는 객체 생성이 아니다.

```js
function PersonInfo() {
  this.name = "홍길동";
  this.age = 20;
  this.job = "소설가";
}

PersonInfo(); //  함수 실행으로 진행
// this - window - var로 바뀜
var name = "홍길동";
var age = 20;
var job = "소설가";
```

### 2. `new` 를 붙여서 함수 사용해보기

- 객체를 생성하겠다는 목적으로 사용

```js
function PersonInfo() {
  this.name = "홍길동";
  this.age = 20;
  this.job = "소설가";
  // 자동으로 return this 가 숨겨져 있어서 값을 만들어서 돌려줌
  //  return; 생략가능
}

const user = new PersonInfo(); // new 함수 실행결과 - 객체 생성자 함수 실행
// 아래가 우리가 원한 user에 담긴 객체 생성자 함수 결과물
{
  name = "홍길동";
  age = 20;
  job = "소설가";
}
```

```js
//예제 //
const name = "아이유";
const age = 28;
const job = "가수";

const 아이유 = {
  name: "아이유",
  age: 28,
  job: "가수",
};

아이유.age; //28
this.아이유.age; //28

console.log(this.name); //아아유
console.log(window.name); //아이유
```

## 4. 객체의 항목을 참조하는 법

- `.`으로 참조하는법

```js
const iu = {
  age: 20,
  name: "아이유",
};

console.log(iu.age);
console.log(iu.name);
```

- 연관배열`[]` 방식으로 항목 참조하는 법

```js
const iu = {
  age: 20,
  name: "아이유",
};

console.log(iu["age"]);
console.log(iu["name"]);
```

- `for...in` 방법으로 항목 참조하는 법(속성명을 모르는 경우)

```js
const iu = {
  age: 20,
  name: "아이유",
};

for (let key in iu) {
  console.log(key); // "age","name"
  console.log(iu[key]); // 20, "아이유"
}
```

## 5. 객체에 기능 추가하기 (메소드)
