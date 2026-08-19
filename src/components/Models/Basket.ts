import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class Basket {
  protected items: IProduct[] = [];
  protected events: EventEmitter; 

  constructor(events: EventEmitter) {
    this.events = events;
  }

  // Добавить товар в корзину
  add(item: IProduct): void {
    if (!this.hasItem(item.id)) {
      this.items.push(item);
      this.events.emit('basket:changed', { items: this.items });
    }
  }

  // Удалить товар из корзины 
  remove(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.events.emit('basket:changed', { items: this.items });
  }

  // Очистить корзину полностью
  clear(): void {
    this.items = [];
    this.events.emit('basket:changed', { items: this.items });
  }

  // Посчитать общую стоимость товаров в корзине
  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  // Получить все товары в корзине
  getItems(): IProduct[] {
    return this.items;
  }

  // Находится ли уже товар в корзине
  hasItem(id: string): boolean {
    return this.items.some(item => item.id === id);
  }

  // Получить текущее число товаров в корзине 
  getQuantity(): number {
    return this.items.length;
  }
}