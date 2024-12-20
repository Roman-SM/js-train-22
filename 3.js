// Спостерігач (Observer) — це патерн програмування, який визначає залежність "один-багато" між об'єктами, так що зміна стану одного об'єкта
// призводить до автоматичного оновлення всіх залежних об'єктів
/**
 * Клас Customer представляє клієнта, що має можливість отримувати повідомлення по електронній пошті.
 * Клієнт ідентифікується своєю електронною адресою, яку використовується для відправки повідомлень.
 */
class Customer {
  /**
   * Конструктор для класу Customer. Приймає email - Електронна адреса клієнта.
   */
  constructor (email) {
    this.email = email
  }
  /**
   * Метод відправки повідомлення клієнту по електронній пошті.Приймає message - повідомлення,та виводить в консоль ${this.email} ${message}.
   */
  sendEmail(message) {
    console.log(`${this.email} ${message}`)
  }
}

/**
 * Клас Product представляє продукт, який можна створювати.
 */
class Product {
  /**
   * Конструктор для класу Product.Приймає name - Назва продукту.
   */
  constructor (name) {
    this.name = name
  }
}

/**
 * Клас Store представляє магазин, який може мати підписників і створювати нові продукти.
 * Магазин має назву і список підписників, які отримують повідомлення про нові продукти.
 */
class Store {
  /**
   * Конструктор для класу Store.Приймає name - Назва магазину, та створює пустий масив customers
   */
  constructor (name) {
    this.name = name
    this.customers = []
  }
  /**
   * Метод subscribe для підписки клієнта на магазин. Приймає customer - Клієнт, який підписується.
   * Після виклику цього методу, клієнт буде отримувати повідомлення про нові продукти, через push додаємо клієнта до масиву.
   */
  subscribe(customer) {
    this.customers.push(customer)
  }
  /**
   * Метод unsubscribe для відписки клієнта від магазину.Приймає customer - Клієнт, який відписується.
   * Після виклику цього методу, клієнт більше не буде отримувати повідомлення про нові продукти, через filter прибираємо клієнта з масиву.
   */
  unsubscribe(customer) {
    this.customers = this.customers.filter((sub) => sub !== customer)
  }
  /**
   * Метод createProduct для створення нового продукту в магазині.Приймає name - Назва нового продукту.
   * Після виклику цього методу, новий продукт буде створено, а всі підписники отримають про це повідомлення через sendNotify.
   */
  createProduct(name) {
    const product = new Product(name)
    this.sendNotify(product)
  }
  /**
   * Метод для відправки повідомлень всім підписникам про новий продукт.Приймає product - Продукт, про який відправляється повідомлення.
   * Новий продукт "${product.name}" в магазині ${this.name}! за допомогою sendEmail.
   */
  sendNotify(product) {
    // За допомогою forEach перебираємо масив customers
    this.customers.forEach((subscriber) => {
      // Для кожного елементу масиву викликаємо метод sendEmail з рядком `Новий продукт "${product.name}" в магазині ${this.name}!`
      subscriber.sendEmail(`Новий продукт "${product.name}" в магазині ${this.name}!`)
    })
  }
}

console.log("Завдання 3 ====================================");
// Після виконання розкоментуйте код нижче

const store = new Store("IT Supermarket");

const customer1 = new Customer("john@example.com");
const customer2 = new Customer("jane@example.com");
const customer3 = new Customer("alice@example.com");

store.subscribe(customer1);
store.subscribe(customer2);
store.subscribe(customer3);

store.createProduct("Новий ноутбук");

store.unsubscribe(customer1);

store.createProduct("Бездротові навушники");
