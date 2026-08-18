
import './scss/styles.scss'
import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Order } from './components/Models/Order';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api'; // Базовый класс из стартера
import { LarekApi } from './components/LarekApi'; // Наш новый класс
import { API_URL, CDN_URL } from './utils/constants'; // Константы Яндекса


const productsModel = new Products();
productsModel.setItems(apiProducts.items); 

console.log('Массив товаров из каталога:', productsModel.getItems());

//  Создаем экземпляр корзины
const basketModel = new Basket();

// Берем первый товар из нашего каталога (который мы уже проверили)
const firstProduct = apiProducts.items[0];
const secondProduct = apiProducts.items[1];

// Тестируем добавление товаров в корзину
basketModel.add(firstProduct);
basketModel.add(secondProduct);
console.log('Товары в корзине после добавления:', basketModel.getItems());
console.log('Общая стоимость корзины:', basketModel.getTotalPrice());

// Тестируем удаление первого товара по id
basketModel.remove(firstProduct.id);
console.log('Товары в корзине после удаления одного элемента:', basketModel.getItems());
console.log('Новая стоимость корзины:', basketModel.getTotalPrice());


const orderModel = new Order();

// 1. Проверяем валидацию пустой формы (должно быть false)
console.log('Заказ валиден изначально?', orderModel.validate());

// 2. Заполняем поля покупателя
orderModel.setField('payment', 'cash');
orderModel.setField('address', 'ул. Ленина, д. 10');
orderModel.setField('email', 'test@yandex.ru');
orderModel.setField('phone', '+79991112233');

// 3. Проверяем данные и валидацию после заполнения (должно быть true)
console.log('Данные заказа:', orderModel.getOrderData());
console.log('Заказ валиден после заполнения полей?', orderModel.validate());

const baseApi = new Api(API_URL);
const larekApi = new LarekApi(baseApi, CDN_URL);

larekApi.getProducts()
  .then((data) => {
    // Сохраняем пришедшие с сервера товары в модель каталога
    productsModel.setItems(data.items);
    
    // Выводим в консоль, чтобы проверить, что данные обновились
    console.log('Реальные товары с сервера в модели:', productsModel.getItems());
  })
  .catch((err) => {
    console.error('Ошибка при получении товаров:', err);
  });