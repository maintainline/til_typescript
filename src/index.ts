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
