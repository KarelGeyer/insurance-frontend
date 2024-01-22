export enum ValidationResult {
  SUCCESS = 1,
  ERROR_EMPTY,
  ERROR_INVALID,
  ERROR_UNIQUE,
}

export enum ProductCategory {
  PENSION = 1,
  LIFE_INSURANCE,
  PROPERTY_INSURANCE,
}

export enum SortType {
  ASC = 1,
  DESC,
}

export enum ProductConfigType {
  LIFE_INSURANCE,
}

export enum Invalidity {
  NO_INVALIDITY,
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
}
