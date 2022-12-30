/**
 * Make ExcludeKeys type that should exclude passed types
 * follow the logic below
 *
 * type ExcludeKeys<T, U> = ?
 *
 * type Example = { a: string, b: number, c: () => void, d: Function }
 *
 * // Test -> { a: string, b: number }
 * type Test = ExcludeKeys<Example, Function>
 *
 * // OtherTest -> { c: () => void, d: Function }
 * type OtherTest = ExcludeKeys<Example, string | number>
 */

export type ExcludeKeys<T, U> = Pick<T, Exclude<keyof T, U>>;
