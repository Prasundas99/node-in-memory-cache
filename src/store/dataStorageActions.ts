import { store } from './store';
import { saveToDisk } from '../utils/saveToDisk';
import { ActionTypes } from './ActionTypes';

type ActionHandler = (command: string[]) => string;

export const actionHandlers: Record<ActionTypes, ActionHandler> = {
    [ActionTypes.SET]: ([, key, value]: string[]) => {
        store.strings[key] = value;
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.GET]: ([, key]: string[]) => {
        const value = store.strings[key];
        return value ? `${value}` : 'nil';
    },
    [ActionTypes.LPUSH]: ([, key, value]: string[]) => {
        store.lists[key] = store.lists[key] || [];
        store.lists[key].unshift(value);
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.RPUSH]: ([, key, value]: string[]) => {
        store.lists[key] = store.lists[key] || [];
        store.lists[key].push(value);
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.LPOP]: ([, key]: string[]) => {
        const list = store.lists[key];
        const value = list && list.length > 0 ? list.shift() : 'nil';
        saveToDisk();
        return `${value}`;
    },
    [ActionTypes.RPOP]: ([, key]: string[]) => {
        const list = store.lists[key];
        const value = list && list.length > 0 ? list.pop() : 'nil';
        saveToDisk();
        return `${value}`;
    },
    [ActionTypes.SADD]: ([, key, value]: string[]) => {
        store.sets[key] = store.sets[key] || new Set();
        store.sets[key].add(value);
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.SREM]: ([, key, value]: string[]) => {
        const set = store.sets[key];
        if (set) {
            set.delete(value);
            saveToDisk();
        }
        return 'OK';
    },
    [ActionTypes.SMEMBERS]: ([, key]: string[]) => {
        const set = store.sets[key];
        const members = set ? Array.from(set).join(' ') : 'nil';
        return `${members}`;
    },
    [ActionTypes.HSET]: ([, key, field, value]: string[]) => {
        store.hashes[key] = store.hashes[key] || {};
        store.hashes[key][field] = value;
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.HGET]: ([, key, field]: string[]) => {
        const hash = store.hashes[key];
        const value = hash && hash[field] ? hash[field] : 'nil';
        return `${value}`;
    },
    [ActionTypes.HDEL]: ([, key, field]: string[]) => {
        const hash = store.hashes[key];
        if (hash && hash[field]) {
            delete hash[field];
            saveToDisk();
        }
        return 'OK';
    },
    [ActionTypes.HGETALL]: ([, key]: string[]) => {
        const hash = store.hashes[key];
        const response = hash ? Object.entries(hash).flat().join(' ') : 'nil';
        return `${response}`;
    }
};
