import { IProduct } from '../../types';

export class Basket {
  protected items: IProduct[] = [];

  // Добавить товар в корзину
  add(item: IProduct): void {
    this.items.push(item);
  }

  // Очистить корзину полностью
  clear(): void {
    this.items = [];
  }

  // Удалить товар из корзины по id
  remove(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  // Посчитать общую стоимость товаров в корзине
  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  // Получить все товары в корзине
  getItems(): IProduct[] {
    return [...this.items];
  }

  // Проверить, есть ли товар в корзине
  contains(id: string): boolean {
    return this.items.some(item => item.id === id);
  }

  // Получить количество товаров в корзине
  getCount(): number {
    return this.items.length;
  }
}