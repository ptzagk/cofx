export type Fn = (...args: any[]) => void;
export type GenFn<V = any> = (...args: any[]) => IterableIterator<V>;
export type CoFn<V = any> = GenFn<V> | Fn;

export type TaskFn<V> = (fn: CoFn<V>, ...args: any[]) => Promise<any>;
export interface CallEffectDescriptor {
  type: 'CALL';
  fn: Fn | any[];
  args: any[];
}
export interface SpawnEffectDescriptor {
  type: 'SPAWN';
  fn: Fn;
  args: any[];
}
export interface DelayEffectDescriptor {
  type: 'DELAY';
  ms: number;
}

export interface RaceEffectDescriptor<T> {
  type: 'RACE';
  effects: AllEffect<T>;
}
export interface AllEffectDescriptor<T> {
  type: 'ALL';
  effects: AllEffect<T>;
}
export type AllEffect<T> = T[] | { [key: string]: T };
export type Effect =
  | CallEffectDescriptor
  | SpawnEffectDescriptor
  | DelayEffectDescriptor;

export type CombinatorEffect<T> =
  | RaceEffectDescriptor<T>
  | AllEffectDescriptor<T>;
export type NextFn = (...args: any[]) => Middleware;
export type Promisify = (p: any, cancel?: Promise<any>) => Promise<any>;
export type Middleware = (
  next: NextFn,
) => (
  effect: Effect,
  promisify: Promisify,
  cancelPromise: Promise<any>,
) => Middleware;

export interface EffectHandler {
  effect: any;
  promisify: Promisify;
  cancel: Promise<any>;
}
