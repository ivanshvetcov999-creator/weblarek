import { IProduct } from '../../types';

export class Products {
  // Защищенное поле (массив), где будут храниться товары. Пока оно пустое.
  protected items: IProduct[] = [];

  // Метод, который принимает массив товаров и сохраняет его в наше поле items
  setItems(items: IProduct[]): void {
     this.items = items; 
  }

  // Метод, который просто возвращает текущий массив товаров наружу
  getItems(): IProduct[] {
    return this.items; 
  }
}