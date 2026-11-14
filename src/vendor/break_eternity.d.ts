// Minimal typing; extend as the engine port needs more methods.
export type DecimalSource = Decimal | number | string;
declare class Decimal {
  constructor(value?: DecimalSource);
  sign: number; layer: number; mag: number;
  static fromValue_noAlloc(v: DecimalSource): Decimal;
  static max(a: DecimalSource, b: DecimalSource): Decimal;
  static min(a: DecimalSource, b: DecimalSource): Decimal;
  static [method: string]: any;
  add(v: DecimalSource): Decimal; sub(v: DecimalSource): Decimal;
  mul(v: DecimalSource): Decimal; div(v: DecimalSource): Decimal;
  pow(v: DecimalSource): Decimal; log10(): Decimal; log(base: DecimalSource): Decimal;
  floor(): Decimal; ceil(): Decimal; round(): Decimal; abs(): Decimal; neg(): Decimal;
  max(v: DecimalSource): Decimal; min(v: DecimalSource): Decimal;
  gte(v: DecimalSource): boolean; gt(v: DecimalSource): boolean;
  lte(v: DecimalSource): boolean; lt(v: DecimalSource): boolean; eq(v: DecimalSource): boolean;
  toNumber(): number; toString(): string;
  [method: string]: any;
}
export default Decimal;
