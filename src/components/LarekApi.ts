import { IApi, IProductResponse, IOrderRequest, IOrderResult } from '../types';

export class LarekApi {
  // Сохраняем базовый клиент API и ссылку на CDN картинок внутри класса
  protected _api: IApi;
  protected cdn: string;

  constructor(api: IApi, cdn: string) {
    this._api = api;
    this.cdn = cdn;
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