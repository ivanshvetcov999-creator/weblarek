import './scss/styles.scss';

import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { LarekApi } from './components/LarekApi';
import { API_URL } from './utils/constants';

const productsModel = new Products();

// Устанавливаем товары
productsModel.setItems(apiProducts.items);

console.log(
  'Массив товаров из каталога:',
  productsModel.getItems()
);

// Получаем товар по id
const firstProduct = productsModel.getItems()[0];
const secondProduct = productsModel.getItems()[1];

console.log(
  'Товар по id:',
  productsModel.getItem(firstProduct.id)
);

// Сохраняем выбранный товар
productsModel.setSelectedItem(firstProduct);

console.log(
  'Выбранный товар:',
  productsModel.getSelectedItem()
);

const basketModel = new Basket();

// Добавляем товары
basketModel.add(firstProduct);
basketModel.add(secondProduct);

console.log(
  'Товары в корзине после добавления:',
  basketModel.getItems()
);

console.log(
  'Количество товаров в корзине:',
  basketModel.getCount()
);

console.log(
  'Общая стоимость корзины:',
  basketModel.getTotalPrice()
);

// Проверяем наличие товара
console.log(
  'Есть ли первый товар в корзине:',
  basketModel.contains(firstProduct.id)
);

// Удаляем первый товар
basketModel.remove(firstProduct.id);

console.log(
  'Корзина после удаления первого товара:',
  basketModel.getItems()
);

console.log(
  'Количество товаров после удаления:',
  basketModel.getCount()
);

console.log(
  'Стоимость после удаления:',
  basketModel.getTotalPrice()
);

// Очищаем корзину
basketModel.clear();

console.log(
  'Корзина после очистки:',
  basketModel.getItems()
);

console.log(
  'Количество товаров после очистки:',
  basketModel.getCount()
);

const buyerModel = new Buyer();

// Проверяем пустые данные
console.log(
  'Ошибки пустых данных покупателя:',
  buyerModel.validate()
);

// Заполняем данные покупателя
buyerModel.setField('payment', 'cash');
buyerModel.setField('address', 'ул. Ленина, д. 10');
buyerModel.setField('email', 'test@yandex.ru');
buyerModel.setField('phone', '+79991112233');

// Получаем данные покупателя
console.log(
  'Данные покупателя:',
  buyerModel.getBuyerData()
);

// Проверяем валидацию после заполнения
console.log(
  'Ошибки после заполнения данных:',
  buyerModel.validate()
);

buyerModel.clear();

console.log(
  'Данные покупателя после очистки:',
  buyerModel.getBuyerData()
);

console.log(
  'Ошибки после очистки:',
  buyerModel.validate()
);

const baseApi = new Api(API_URL);
const larekApi = new LarekApi(baseApi);

larekApi.getProducts()
  .then((data) => {
    // Сохраняем товары, полученные с сервера
    productsModel.setItems(data.items);

    console.log(
      'Реальные товары с сервера в модели:',
      productsModel.getItems()
    );
  })
  .catch((err) => {
    console.error(
      'Ошибка при получении товаров:',
      err
    );
  });