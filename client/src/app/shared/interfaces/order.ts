import {OrderPosition} from './order-position'

export interface Order {
  date?: Date,
  order?: number,
  userId?: string,
  list: OrderPosition[],
  _id?: string,
}
