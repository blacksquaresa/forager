import { Map } from 'immutable';

export interface Action<T> {
  type: string;
  payload: T;
}

export interface Mapped<T> extends Map<keyof T, any> {}
