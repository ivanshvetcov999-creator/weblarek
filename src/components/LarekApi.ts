import { IApi, IProductResponse, IOrderRequest, IOrderResult } from '../types';

export class LarekApi {
  // Защищенное поле для хранения базового клиента API
  protected _api: IApi;

  // Конструктор принимает строго один параметр, как и вызывается в main.ts
  constructor(api: IApi) {
    this._api = api;
  }

  // Метод для получения списка товаров с сервера
  getProducts(): Promise<IProductResponse> {
    return this._api.get<IProductResponse>('/product/');
  }

  // Метод для отправки заказа на сервер
  postOrder(order: IOrderRequest): Promise<IOrderResult> {
    return this._api.post<IOrderResult>('/order/', order);
  }
}