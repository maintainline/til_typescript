class Animal {
  constructor() {
    this.eye = 2;
  }
  cry() {}
  eat() {}
}

class Cat extends Animal {
  constructor() {
    super();
  } // constructor 는 디폴트 값, super도 마찬가지
  꾹꾹이() {}
}

class Dog extends Animal {
  달짖기() {}
}
