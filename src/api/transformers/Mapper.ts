export interface Mapper<T, U> {
  toResponse: (input: T) => U;
}
