export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash';

// Интерфейс для одного товара
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null; 
}



// Интерфейс для данных покупателя
export interface IBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}


// То, что возвращает сервер при запросе /product/
export interface IProductResponse {
  total: number;
  items: IProduct[];
}

// Данные, которые сервер ждет при оформлении заказа (собираем из IBuyer + список ID товаров)
export interface IOrderRequest extends IBuyer {
  items: string[]; 
  total: number;   
}

// То, что возвращает сервер при успешной отправке заказа на /order/
export interface IOrderResult {
  id: string;
  total: number;
}
