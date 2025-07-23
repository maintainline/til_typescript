class Animal {
  public name: string; // 모든 접근가능
  private age: number; //  모든 접근 불가
  protected breeze: string; // 상속시 접근 가능
  //메서드
  test() {
    this.name;
    this.age;
    this.breeze;
  }
}

class Cat extends Animal {
  show() {
    this.name; //public 접근가능
    this.age; // private라 접근 불가
    this.breeze; // protected 접근가능
  }
}

const c = new Cat();
c.name; //public 접근가능
c.age; //private 접근 불가
c.breeze; // protected 접근 불가 클래스 내부에서만 가능
