export interface Hasher {
  hash: (input: string) => Promise<string>;
  compare: (plain: string, hash: string) => Promise<boolean>;
}
