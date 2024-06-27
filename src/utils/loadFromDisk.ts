import * as fs from 'fs';
import { store } from 'store/store';


export const loadFromDisk = () => {
    if (fs.existsSync('dump.rdb')) {
      const data = fs.readFileSync('dump.rdb', 'utf8');
      Object.assign(store, JSON.parse(data));
    }
  };