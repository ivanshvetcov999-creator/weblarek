import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events'; 

export class Products {
  // Массив для хранения всех товаров каталога
  protected items: IProduct[] = [];
  
  // ID товара, который сейчас выбран пользователем для просмотра в окне
  protected preview: string | null = null;
  
  protected events: EventEmitter;

  // Конструктор принимает брокер событий
  constructor(events: EventEmitter) {
    this.events = events;
  }

  // Сохранения списка товаров в модель.
  set products(items: IProduct[]) {
    this.items = items;
    this.events.emit('items:changed', { items: this.items });
  }

  // Для получения текущего списка товаров наружу
  get products(): IProduct[] {
    return this.items;
  }

  // Найти и получить один товар по его уникальному ID
  getProduct(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  // Установить ID товара для детального предпросмотра
  setPreview(id: string | null): void {
    this.preview = id;
    if (id) {
      const product = this.getProduct(id);
      this.events.emit('preview:changed', product);
    }
  }

  // Получить ID товара
  getPreview(): string | null {
    return this.preview;
  }
}