import { IBuyer, TPayment } from '../../types';

export class Order {
  // Изначально все поля покупателя пустые
  protected orderData: IBuyer = {
    payment: 'card',
    email: '',
    phone: '',
    address: ''
  };

  // Метод для изменения конкретного поля
  setField(field: keyof IBuyer, value: string): void {
    if (field === 'payment') {
      this.orderData[field] = value as TPayment;
    } else {
      this.orderData[field] = value;
    }
  }

  // Метод для получения всех данных заказа
  getOrderData(): IBuyer {
    return this.orderData;
  }

  // Простая валидация: проверяем, что текстовые поля не пустые
  validate(): boolean {
    return (
      this.orderData.address.trim().length > 0 &&
      this.orderData.email.trim().length > 0 &&
      this.orderData.phone.trim().length > 0
    );
  }
}