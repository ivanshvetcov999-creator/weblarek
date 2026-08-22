import {
  IApi,
  IProductResponse,
  IOrderRequest,
  IOrderResult
} from '../types';

export class LarekApi {
  protected _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  // Получить каталог товаров с сервера
  getProducts(): Promise<IProductResponse> {
    return this._api.get<IProductResponse>('/product/');
  }

  // Отправить заказ на сервер
  postOrder(order: IOrderRequest): Promise<IOrderResult> {
    return this._api.post<IOrderResult>('/order/', order);
  }
}