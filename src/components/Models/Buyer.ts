import { IBuyer, TPayment } from '../../types';

export class Buyer {
  // Данные покупателя
  protected buyerData: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: ''
  };

  // Изменить конкретное поле
  setField(field: keyof IBuyer, value: string): void {
    if (field === 'payment') {
      this.buyerData[field] = value as TPayment;
    } else {
      this.buyerData[field] = value;
    }
  }

  // Получить данные покупателя
  getBuyerData(): IBuyer {
    return this.buyerData;
  }

  // Очистить данные покупателя
  clear(): void {
    this.buyerData = {
      payment: null,
      email: '',
      phone: '',
      address: ''
    };
  }

  // Проверить данные покупателя и вернуть ошибки
  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.buyerData.payment) {
      errors.payment = 'Не выбран вид оплаты';
    }

    if (!this.buyerData.address.trim()) {
      errors.address = 'Укажите адрес';
    }

    if (!this.buyerData.email.trim()) {
      errors.email = 'Укажите email';
    }

    if (!this.buyerData.phone.trim()) {
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }
}