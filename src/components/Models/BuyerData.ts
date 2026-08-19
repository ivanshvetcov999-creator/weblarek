import { IBuyer, TPayment, IOrderRequest } from '../../types';
import { EventEmitter } from '../base/Events';

export type TFormErrors = Partial<Record<keyof IBuyer, string>>;

export class BuyerData {
  protected buyerData: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: ''
  };

  protected formErrors: TFormErrors = {};
  
  protected events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  // Изменение конкретного поля данных покупателя 
  setBuyerField(field: keyof IBuyer, value: string): void {
    if (field === 'payment') {
      this.buyerData[field] = value as TPayment;
    } else {
      this.buyerData[field] = value;
    }

    // Автоматически проверяем форму при каждом вводе пользователя
    this.validateBuyer();
  }

  // Получить чистые данные покупателя
  getBuyerData(): IBuyer {
    return this.buyerData;
  }

  getOrderRequest(itemIds: string[], totalSum: number): IOrderRequest {
    return {
      ...this.buyerData,
      items: itemIds,
      total: totalSum
    };
  }

  // Сброс данных покупателя и очистка ошибок
  clearBuyerData(): void {
    this.buyerData = {
      payment: null,
      email: '',
      phone: '',
      address: ''
    };
    this.formErrors = {};
    this.events.emit('formErrors:changed', this.formErrors);
  }

  // Валидация полей с автоматической отправкой ошибок в систему
  validateBuyer(): boolean {
    const errors: TFormErrors = {};

    // 1. Проверка способа оплаты
    if (this.buyerData.payment === null) {
      errors.payment = 'Не выбран вид оплаты';
    }

    // 2. Проверка адреса
    if (!this.buyerData.address || this.buyerData.address.trim().length === 0) {
      errors.address = 'Необходимо указать адрес доставки';
    }

    // 3. Проверка email
    if (!this.buyerData.email || this.buyerData.email.trim().length === 0) {
      errors.email = 'Укажите email';
    } else if (!this.buyerData.email.includes('@')) {
      errors.email = 'Некорректный формат email';
    }

    // 4. Проверка телефона
    if (!this.buyerData.phone || this.buyerData.phone.trim().length === 0) {
      errors.phone = 'Укажите номер телефона';
    }

    this.formErrors = errors;
    
    this.events.emit('formErrors:changed', this.formErrors);

    // Возвращает true, если форма полностью валидна
    return Object.keys(errors).length === 0;
  }
}