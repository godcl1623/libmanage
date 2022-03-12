type StyleSetUnit = Record<string, string>;
type StyleReturnTypes = StyleSetUnit | string | (() => string) | string[];
export interface SetSize {
  free: (width?: string, height?: string) => string;
}
export type StyleSet = Record<string, StyleReturnTypes>;