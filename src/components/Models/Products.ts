import { IProduct } from '../../types';

export class Products {
  protected items: IProduct[] = [];

  protected selectedItem: IProduct | null = null;

  // Сохранить массив товаров
  setItems(items: IProduct[]): void {
    this.items = items;
  }

  // Получить массив товаров
  getItems(): IProduct[] {
    return this.items;
  }

  // Получить товар по id
  getItem(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  // Сохранить товар для подробного отображения
  setSelectedItem(item: IProduct): void {
    this.selectedItem = item;
  }

  // Получить выбранный товар
  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}