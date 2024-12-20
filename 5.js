class Writer {
  // Властивість #content представляє поточний текст. Вона ініціалізується порожнім рядком.
  #content = ""
  // Сетер для властивості content. Він приймає значення newContent (новий текст),
  // який потрібно встановити як поточний текст. Кожен раз, коли присвоюється нове значення,
  set content(newContent) {
    this.#content = newContent;
    // викликається метод #store(), який зберігає поточний стан тексту у версіях.
    this.#store();
  }
  // Метод гетер для властивості content, повертає this.#content.
  get content () {
    return this.#content
  }
  // Приватний метод #store використовується для зберігання поточного стану тексту.
  #store() {
    // Він викликає статичний метод класу Version, create, передаючи йому поточний текст як аргумент.
    Version.create(this.#content)
  }
  // Метод restore відновлює попередній стан тексту, викликаючи статичний метод класу Version, restore.
  restore() {
    // Цей метод повертає останню збережену версію тексту, яку ми встановлюємо як поточний текст.
    this.#content = Version.restore().content
  }
  
}

// Клас Version відповідає за створення та зберігання версій тексту.
class Version {
  // В конструкторі класу Version приймається аргумент content та встановлює його.
  constructor (content) {
    this.content = content
  }
  // Це вхідний аргумент, який представляє теку збережену версію тексту.
  // Властивість #versions це приватний статичний масив, пустий за замовчуванням, що зберігає всі створені версії.
  static #version = []
  // Статичний метод create приймає аргумент content (текст версії) і створює новий екземпляр класу Version в який передає content .
  static create(content) {
    // Створений екземпляр додається до масиву версій versions.
    this.#version.push(new Version(content))
  }
  // Статичний метод restore видаляє останный элемент масиву,
  static restore() {
    this.#version.pop()
    // та повертає останню збережену версію тексту з масиву версій this.#versions[this.#versions.length - 1] .
    return this.#version[this.#version.length - 1]
  }
}
console.log("Завдання 5 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо новий екземпляр класу Writer
const writer = new Writer();

// Присвоюємо текст за допомогою сетера
writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);
