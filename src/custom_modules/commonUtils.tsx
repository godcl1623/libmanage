type StyleSetUnit = Record<string, string>;
export type StyleReturnTypes = StyleSetUnit | string | (() => string) | string[];
export interface SetSize {
  free: (width?: string, height?: string) => string;
}
export type StyleSet = Record<string, StyleReturnTypes>;