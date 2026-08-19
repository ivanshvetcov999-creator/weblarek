import './scss/styles.scss';
import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { BuyerData } from './components/Models/BuyerData';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api'; 
import { LarekApi } from './components/LarekApi'; 
import { API_URL, CDN_URL } from './utils/constants'; 
import { EventEmitter } from './components/base/Events';

const events = new EventEmitter();

//  1.ТЕСТИРОВАНИЕ КАТАЛОГА ТОВАРОВ
const productsModel = new Products(events);
productsModel.products = apiProducts.items; 

console.log('Массив товаров из каталога:', productsModel.products); 

// 2.ТЕСТИРОВАНИЕ КОРЗИНЫ 
const basketModel = new Basket(events);

const firstProduct = apiProducts.items[0];
const secondProduct = apiProducts.items[1];

// Добавление товаров в корзину
basketModel.add(firstProduct);
basketModel.add(secondProduct);
console.log('Товары в корзине после добавления:', basketModel.getItems());
console.log('Общая стоимость корзины:', basketModel.getTotalPrice());

// Удаление первого товара по id
basketModel.remove(firstProduct.id);
console.log('Товары в корзине после удаления одного элемента:', basketModel.getItems());
console.log('Новая стоимость корзины:', basketModel.getTotalPrice());

// --- 3. ТЕСТИРОВАНИЕ ДАННЫХ ПОКУПАТЕЛЯ ---
const buyerModel = new BuyerData(events);

// Проверяем валидацию пустой формы 
console.log('Ошибки пустой формы:', buyerModel.validateBuyer());

// Заполняем поля покупателя
buyerModel.setBuyerField('payment', 'cash');
buyerModel.setBuyerField('address', 'ул. Ленина, д. 10');
buyerModel.setBuyerField('email', 'test@yandex.ru');
buyerModel.setBuyerField('phone', '+79991112233');

// Проверяем данные и валидацию после заполнения
console.log('Данные покупателя:', buyerModel.getBuyerData());
console.log('Ошибки после заполнения полей (должен быть пустой объект):', buyerModel.validateBuyer());

// 4.ТЕСТИРОВАНИЕ РАБОТЫ С СЕРВЕРОМ 
const baseApi = new Api(API_URL);
const larekApi = new LarekApi(baseApi);

larekApi.getProducts()
  .then((data) => {
    productsModel.products = data.items;
    
    console.log('Реальные товары с сервера в модели:', productsModel.products);
  })
  .catch((err) => {
    console.error('Ошибка при получении товаров:', err);
  });