import * as fs from 'fs';
import { store } from 'store/store';

export const saveToDisk = () => {
    fs.writeFileSync('dump.rdb', JSON.stringify(store));
  };