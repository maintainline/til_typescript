# 객체(Object)

- `연관성있는 데이터들`을 `이름`을 붙여서 묶어줌
- `데이터`와 `데이터를 다루는 기능`을 가진 결과물..

```js
const 객체명 = {
  데이터명: 데이터값,
  기능명:function(){데이터 가공}
}
```

```ts
const 객체명 :{데이터명: 종류; 기능명: () => 리턴타입종류} = {
  데이터명: 데이터값,
  기능명:function(){데이터 가공}
}
```

```js
// 정식 명칭
const 객체명 = {
property: value,
method:function(){데이터 가공}
}
```

```ts
// 정식 명칭
const 객체명:{property: 종류;method:()=> 리턴타입종류} = {
property: value,
method:function(){데이터 가공}
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

```ts
const 객체명: { 속성명1: 종류; 속성명2: 종류 } = {
  속성명1: 속성값,
  속성명2: 속성값,
};
```

- 만약 1개의 객체를 생성하는 경우라면 `객체리터럴`추천
- 만약 1개의 객체를 생성하는 경우라면 이름은 `카멜케이스`로 한다.

```js
// 한개의 객체를 만들경우 카멜케이스로 한다.
const personInfo = {
  nickName: "아이유",
  age: 28,
  job: "가수",
};
```

```ts
// 한개의 객체를 만들경우 카멜케이스로 한다.
const personInfo: { nickName: string; age: number; job: string } = {
  nickName: "아이유",
  age: 28,
  job: "가수",
};
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

- 많이 복잡!! 추후 필요로 한 것은 class라는 문법..
- type 을 추가하면 가독성이 up

```ts
function PersonInfo(this: { name: string; age: number; job: string }) {
  this.name = "홍길동";
  this.age = 20;
  this.job = "소설가";
}

// 타입을 뽑아서 코드 정리 하기
type PersonInfoType = {
  name: string;
  age: number;
  job: string;
};

function PersonInfo(this: PersonInfoType) {
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

- 추후 `class` 로 해결해야 할 사항..

```ts
type PersonInfoType = { name: string; age: number; job: string };

function PersonInfo(this: PersonInfoType): void {
  this.name = "홍길동";
  this.age = 20;
  this.job = "소설가";
}
// ts에서는 new는 class로  생성을 원활히 지원한다.
// 객체 생성자 함수를 ts로 하려면 편법을 써서 할 수 밖에 없다.

const result: PersonInfoType = new (PersonInfo as unknown as {
  new (): PersonInfoType;
})();
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

```ts
type IuType = { age: number; name: string };
const iu: IuType = {
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

- 1. 해결 방법 중 keyof 를 추천함
  - `keyof` 는 객체의 `key 를 문자열`로 만든다.
  - 아래에 방법1은 `age를 "age" 로 문자열로 만든다.`

```ts
type IuType = { age: number; name: string };

//keyof 활용으로 속성명을 문자열로 추출
keyof IuType; // "age","name"
```

- 2. 해결방법 중 `as` : Type Asserstion - 타입 단언
  - `특정 타입이라고 확신한다` 라고 컴파일러에게 알려줌.

```ts
type IuType = { age: number; name: string };
const iu: IuType = {
  age: 20,
  name: "아이유",
};

for (let key in iu) {
  console.log(key); // "age","name"
  console.log(iu[key]); //오류
}

// 방법 1: keyof를 사용한 타입 단언
for (let key in iu) {
  console.log(key); // "age", "name"

  //keyof IuType ===> "age", "name"
  console.log(iu[key as keyof IuType]); // 20, "아이유"
}
```

- 3. 해결 방법중 Object.entries
  - 위 구문은 `기본 내장 Object 객체`의 entries 메서드를 활용
  - entries 메서드는 객체의 속성에[key,value](배열)로 출력시켜준다.

```ts
type IuType = { age: number; name: string };
const iu: IuType = {
  age: 20,
  name: "아이유",
};

// 방법 2: Object.entries 사용
for (const [key, value] of Object.entries(iu)) {
  console.log(key, value); // "age" 20, "name" "아이유"
}

console.log(Object.entries(iu));
//아래는 출력결과
[
  ["age", 20],
  ["name", "아이유"],
];
```

## 5. 예제

```js
const 블랙핑크_멤버_이름_1 = "제니";
const 블랙핑크_멤버_이름_2 = "로제";
const 블랙핑크_멤버_이름_3 = "지수";
const 블랙핑크_멤버_이름_4 = "리사";

const 블랙핑크_멤버_생일_1 = "96-01";
const 블랙핑크_멤버_생일_2 = "97-02";
const 블랙핑크_멤버_생일_3 = "95-01";
const 블랙핑크_멤버_생일_4 = "97-03";

const 블랙핑크_멤버_이름 = ["제니", "로제", "지수", "리사"];
블랙핑크_멤버_이름[2]; // 지수

const 블랙핑크_멤버_생일 = ["96-01", "97-02", "95-01", "97-03"];

const 블랙핑크_멤버_제니 = { 이름: "제니", 생일: "96-01" };
const 블랙핑크_멤버_로제 = { 이름: "로제", 생일: "97-02" };
const 블랙핑크_멤버_지수 = { 이름: "지수", 생일: "95-01" };
const 블랙핑크_멤버_리사 = { 이름: "리사", 생일: "97-03" };
블랙핑크_멤버_지수.이름; // 지수
블랙핑크_멤버_지수["이름"]; // 지수

const 블랙핑크_멤버 = [
  { 이름: "제니", 생일: "96-01" },
  { 이름: "로제", 생일: "97-02" },
  { 이름: "지수", 생일: "95-01" },
  { 이름: "리사", 생일: "97-03" },
];

블랙핑크_멤버[2].이름; //지수
블랙핑크_멤버[2]["이름"]; //지수
```

```ts
const 블랙핑크_멤버_이름_1: string = "제니";
const 블랙핑크_멤버_이름_2: string = "로제";
const 블랙핑크_멤버_이름_3: string = "지수";
const 블랙핑크_멤버_이름_4: string = "리사";

const 블랙핑크_멤버_생일_1: string = "96-01";
const 블랙핑크_멤버_생일_2: string = "97-02";
const 블랙핑크_멤버_생일_3: string = "95-01";
const 블랙핑크_멤버_생일_4: string = "97-03";

const 블랙핑크_멤버_이름: string[] = ["제니", "로제", "지수", "리사"];
블랙핑크_멤버_이름[2]; // 지수

const 블랙핑크_멤버_생일: string[] = ["96-01", "97-02", "95-01", "97-03"];

const 블랙핑크_멤버_제니: { 이름: string; 생일: string } = {
  이름: "제니",
  생일: "96-01",
};
const 블랙핑크_멤버_로제: { 이름: string; 생일: string } = {
  이름: "로제",
  생일: "97-02",
};
const 블랙핑크_멤버_지수: { 이름: string; 생일: string } = {
  이름: "지수",
  생일: "95-01",
};
const 블랙핑크_멤버_리사: { 이름: string; 생일: string } = {
  이름: "리사",
  생일: "97-03",
};
블랙핑크_멤버_지수.이름; // 지수
블랙핑크_멤버_지수["이름"]; // 지수

const 블랙핑크_멤버: { 이름: string; 생일: string }[] = [
  { 이름: "제니", 생일: "96-01" },
  { 이름: "로제", 생일: "97-02" },
  { 이름: "지수", 생일: "95-01" },
  { 이름: "리사", 생일: "97-03" },
];

블랙핑크_멤버[2].이름; //지수
블랙핑크_멤버[2]["이름"]; //지수
```

## 6. 객체에 기능 추가하기 (메소드)

- 객체안에 만든 `함수`를 `Method, Behavior(행동)`

### 6.1 손으로 만든 `객체 리터럴`에 `기능 추가`하기

```js
const 블랙핑크_멤버_제니 = {
  이름: "제니",
  생일: "96-01",
  sing: function () {
    //  기능(Method)

    console.log("제니가 노래합니다.");
  },
};

블랙핑크_멤버_제니.sing();
```

```ts
type 블랙핑크멤버타입 = {
  이름: string;
  생일: string;
  sing: () => void;
};

const 블랙핑크_멤버_제니: 블랙핑크멤버타입 = {
  이름: "제니",
  생일: "96-01",
  sing: function () {
    //  기능(Method)

    console.log("제니가 노래합니다.");
  },
};

블랙핑크_멤버_제니.sing();
```

```js
const 블랙핑크_멤버_제니 = {
  이름: "제니",
  생일: "96-01",
  sing: function () {
    console.log(`${this.이름}가 노래합니다.`);
  },
  dance: function () {
    console.log(`${this.이름}가 춤을 춥니다.`);
  },
};

블랙핑크_멤버_제니.sing();
블랙핑크_멤버_제니.dance();
```

### 6.2 객체 생성자 함수로 생성된 객체에 기능 추가하기

- TypeScript 에서는 `class 문법을 사용하는것이 편하다.`
- new 를 반드시 붙여서 함수를 실행해야만 합니다.
- 반드시 관례살 `파스칼케이스(pascal)`로 이름을 정한다.

```js
function Student() {
  this.no = "0103";
  this.name = "홍길동";
}

//new 로 만든 변수는 인스턴스 라고 합니다.
const 학생_1 = new Student();
{no:"0103", name:"홍길동"} // 결과

const 학생_2 = new Student();
{no:"0103", name:"홍길동"} // 결과

const 학생_3 = new Student();
{no:"0103", name:"홍길동"} // 결과
```

- 업그레이드(TypeScript 는 `class` 를 쓰자)

```js
function Student(_번호,_이름) {
  this.no = _번호;
  this.name = _이름;
}

//new 로 만든 변수는 인스턴스 라고 합니다.
const 학생_1 = new Student("0208","김길동");
{no:"0208", name:"김길동"} // 결과

const 학생_2 = new Student("0305","고길동");
{no:"0305", name:"고길동"} // 결과

const 학생_3 = new Student("0808","홍길동");
{no:"0808", name:"홍길동"} // 결과
```

- 메서드(Method) 추가 (TypeScript 는 `class` 를 쓰자)

```js
function Student(_번호,_이름) {
  this.no = _번호;
  this.name = _이름;
  this.say = function(){
  console.log(`${this.name}은 ${this.no}입니다.`);
  };
   this.hi = () => {
    console.log(`${this.name}님 안녕하세요`)
   }
}

//new 로 만든 변수는 인스턴스 라고 합니다.
const 학생_1 = new Student("0208","김길동");
{no:"0208", name:"김길동",say:fn,hi:fn} // 결과

const 학생_2 = new Student("0305","고길동");
{no:"0305", name:"고길동"} // 결과

const 학생_3 = new Student("0808","홍길동");
{no:"0808", name:"홍길동"} // 결과
```

### 6.3 객체에 속해 있는 메서드를 `축약해서 생성`하는 문법

```js
const iu = {
  name: "아이유",
  sing: function () {
    console.log(`${this.name}이 노래해요.`);
  },
  dance() {
    //메서드 축약형
    console.log(`${this.name}이 춤을 춰요.`);
  },
};
```

```ts
type IUType = {
  name: string;
  sing: () => void;
  dance: () => void;
};
const iu: IUType = {
  name: "아이유",
  sing: function () {
    console.log(`${this.name}이 노래해요.`);
  },
  dance() {
    //메서드 축약형
    console.log(`${this.name}이 춤을 춰요.`);
  },
};
```

- 아래는 TypeScript 의 Class로 표현하자.

```js
function Student(_번호, _이름) {
  this.no = _번호;
  this.name = _이름;
  this.say = function () {};
  this.hi = () => {};
}
```

## 7. 객체를 복사하기

### 7.1. 값의 복사 (string, number, null, undefind ...)

```js
const age = 10;
// age = 12; // const 에러. 값을 바꾸면 안됨
console.log(age);

// 값을 복사하였다.
let nowAge = age;
nowAge = 12;
console.log(nowAge);
```

```ts
const age: number = 10;
// age = 12; // const 에러. 값을 바꾸면 안됨
console.log(age);

// 값을 복사하였다.
let nowAge: number = age;
nowAge = 12;
console.log(nowAge);
```

### 7.2. 참조 복사

```js
const 아이유 = { job: "가수" };
아이유 = "10살"; // const 는 불변 `{}`

//아래는 참조로 접근함으로 변경이 가능하다.
// 아이유가 const, job은 const가 아님
아이유.job = "연기자"; // 객체{}의 const라 값 변경가능

const 아이돌 = 아이유; // const 아이유 의 job 이란 주소를 가져옴
아이돌.job = "개발자"; // const 아이유 의 job 이란 주소를 가져와서 "개발자"정의

아이유.job; // 개발자
아이돌.job; // 개발자

function copyWho(누구) {
  const go = 누구;
  go.job = "할머니";
}
copyWho(아이유);
아이유.job; // 할머니
아이돌.job; // 할머니
```

```ts
const 아이유: { job: string } = { job: "가수" };
아이유 = "10살"; // const 는 불변 `{}`

//아래는 참조로 접근함으로 변경이 가능하다.
// 아이유가 const, job은 const가 아님
아이유.job = "연기자"; // 객체{}의 const라 값 변경가능

const 아이돌: { job: string } = 아이유; // const 아이유 의 job 이란 주소를 가져옴
아이돌.job = "개발자"; // const 아이유 의 job 이란 주소를 가져와서 "개발자"정의

아이유.job; // 개발자
아이돌.job; // 개발자

function copyWho(누구: { job: string }) {
  const go = 누구;
  go.job = "할머니";
}
copyWho(아이유);
아이유.job; // 할머니
아이돌.job; // 할머니
```

- 객체는 반드시 아래처럼 복사해야한다.
- 수작업으로 하는 경우

```js
// 아래는 주소를 복사한것
const 아이유 = { job: "가수", age: 10, song: "마시메로" };
const 아이돌 = { job: 아이유.job, age: 아이유.age, song: 아이유.song };
// 객체 구조 분해 할당
const { job, age, song } = 아이유;
```

```ts
const 아이유: {
  job: string;
  age: number;
  song: string;
} = { job: "가수", age: 10, song: "마시메로" };

const 아이돌: {
  job: string;
  age: number;
  song: string;
} = { job: 아이유.job, age: 아이유.age, song: 아이유.song };
```

- `객체 구조 분해할당` 강력 추천(리엑트 부터 무조건 사용)

```js
const 아이유 = { job: "가수", age: 10, song: "마시메로" };
const { job, age, song } = 아이유;

const 아이돌 = { job, age, song };
```

```ts
type 아이유타입 = {
  job: string;
  age: number;
  song: string;
};
const 아이유: 아이유타입 = { job: "가수", age: 10, song: "마시메로" };

const { job, age, song }: 아이유타입 = 아이유;

const 아이돌: 아이유타입 = { job, age, song };
```

- `객체 구조 분해 할당을` 함수에서 사용하기

```js
const 아이유 = { job: "가수", age: 10, song: "마시메로" };

function 분해함수({ job, age }) {
  console.log(job);
  console.log(age);
  return { job, age };
}
분해함수(아이유);
```

```ts
type 아이유타입 = {
  job: string;
  age: number;
  // ? 옵션 : 속성이 없을수도 있지만 괜찮아!
  song?: string;
};

const 아이유: 아이유타입 = { job: "가수", age: 10, song: "마시메로" };

function 분해함수({ job, age }: 아이유타입) {
  console.log(job);
  console.log(age);
  return { job, age };
}
분해함수(아이유);
```

## 8. 객체 구조 분해 할당(DeStructuring)

```js
const idol = { name: "제이홉" };
const { name } = idol;
```

```ts
const idol: { name: string } = { name: "제이홉" };
const { name }: { name: string } = idol;
```

```js
const idol = { name: "제이홉" };
const { name, age = 30 } = idol;
```

```ts
type IDOLType = { name: string; age?: number };
const idol: IDOLType = { name: "제이홉" };
const { name, age = 30 }: IDOLType = idol;
```

```js
function hi({ name, age }) {
  console.log(name);
  console.log(age);
}

hi({ name: "지민", age: 30 });
```

```ts
function hi({ name, age }: { name: string; age: number }) {
  console.log(name);
  console.log(age);
}

hi({ name: "지민", age: 30 });
```

```js
const user = {
  name: "정국",
  address: { city: "서울", age: 20 },
};

const {
  name,
  address: { city, age },
} = user;
```

```ts
type UserAddressType = {
  city: string;
  age: number;
};

type UserType = {
  name: string;
  address: { city: string; age: number };
};

const user: UserType = {
  name: "정국",
  address: { city: "서울", age: 20 },
};

const {
  name,
  address: { city, age },
}: UserType = user;
```

```js
const member = { userName: "뷔", age: 30, group: "BTS" };
// const { userName, age, group } = member;

// 사용하지 않은 나머지 속성만 모으는 연산자
const { ...rest } = member;
console.log(rest); //{ userName: '뷔', age: 30, group: 'BTS' }

const { userName, ...who } = member;
console.log(userName); // 뷔
console.log(who); // { age: 30, group: 'BTS' }
```

```ts
type MemberType = {
  userName: string;
  age: number;
  group: string;
};

const member: MemberType = { userName: "뷔", age: 30, group: "BTS" };

// 사용하지 않은 나머지 속성만 모으는 연산자
const { ...rest }: MemberType = member;
console.log(rest); //{ userName: '뷔', age: 30, group: 'BTS' }

const { userName, ...who }: MemberType = member;
console.log(userName); // 뷔
console.log(who); // { age: 30, group: 'BTS' }

```
