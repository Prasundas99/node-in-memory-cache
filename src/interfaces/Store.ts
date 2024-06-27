export interface Store {
    strings: { [key: string]: string };
    lists: { [key: string]: string[] };
    sets: { [key: string]: Set<string> };
    hashes: { [key: string]: { [field: string]: string } };
  }