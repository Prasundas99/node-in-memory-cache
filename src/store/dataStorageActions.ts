import { store } from './store';
import { saveToDisk } from '../utils/saveToDisk';
import { ActionTypes } from './ActionTypes';

type ActionHandler = (command: string[]) => string;

const isExpired = (expiresAt: number | null) => {
    return expiresAt !== null && Date.now() > expiresAt;
};

const setWithExpiry = (value: any, ttl: number | null) => {
    const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
    return { value, expiresAt };
};

export const actionHandlers: Record<ActionTypes, ActionHandler> = {
    [ActionTypes.SET_STRING]: ([, key, value, ttl]: string[]) => {
        store.strings[key] = setWithExpiry(value, ttl ? parseInt(ttl) : null);
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.GET_STRING]: ([, key]: string[]) => {
        const item = store.strings[key];
        if (item && !isExpired(item.expiresAt)) {
            return `${item.value}`;
        } else {
            return 'nil';
        }
    },
    [ActionTypes.LIST_PUSH_FRONT]: ([, key, value, ttl]: string[]) => {
        const item = store.lists[key] || { value: [], expiresAt: null };
        if (isExpired(item.expiresAt)) {
            item.value = [];
        }
        item.value.unshift(value);
        item.expiresAt = ttl ? Date.now() + parseInt(ttl) * 1000 : item.expiresAt;
        store.lists[key] = item;
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.LIST_PUSH_BACK]: ([, key, value, ttl]: string[]) => {
        const item = store.lists[key] || { value: [], expiresAt: null };
        if (isExpired(item.expiresAt)) {
            item.value = [];
        }
        item.value.push(value);
        item.expiresAt = ttl ? Date.now() + parseInt(ttl) * 1000 : item.expiresAt;
        store.lists[key] = item;
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.LIST_POP_FRONT]: ([, key]: string[]) => {
        const item = store.lists[key];
        if (item && !isExpired(item.expiresAt)) {
            const value = item.value.length > 0 ? item.value.shift() : 'nil';
            saveToDisk();
            return `${value}`;
        } else {
            return 'nil';
        }
    },
    [ActionTypes.LIST_POP_BACK]: ([, key]: string[]) => {
        const item = store.lists[key];
        if (item && !isExpired(item.expiresAt)) {
            const value = item.value.length > 0 ? item.value.pop() : 'nil';
            saveToDisk();
            return `${value}`;
        } else {
            return 'nil';
        }
    },
    [ActionTypes.SET_ADD]: ([, key, value, ttl]: string[]) => {
        const item = store.sets[key] || { value: new Set(), expiresAt: null };
        if (isExpired(item.expiresAt)) {
            item.value = new Set();
        }
        item.value.add(value);
        item.expiresAt = ttl ? Date.now() + parseInt(ttl) * 1000 : item.expiresAt;
        store.sets[key] = item;
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.SET_REMOVE]: ([, key, value]: string[]) => {
        const item = store.sets[key];
        if (item && !isExpired(item.expiresAt)) {
            item.value.delete(value);
            saveToDisk();
        }
        return 'OK';
    },
    [ActionTypes.SET_MEMBERS]: ([, key]: string[]) => {
        const item = store.sets[key];
        if (item && !isExpired(item.expiresAt)) {
            return Array.from(item.value).join(' ');
        } else {
            return 'nil';
        }
    },
    [ActionTypes.HASH_SET_FIELD]: ([, key, field, value, ttl]: string[]) => {
        const item = store.hashes[key] || { value: {}, expiresAt: null };
        if (isExpired(item.expiresAt)) {
            item.value = {};
        }
        item.value[field] = value;
        item.expiresAt = ttl ? Date.now() + parseInt(ttl) * 1000 : item.expiresAt;
        store.hashes[key] = item;
        saveToDisk();
        return 'OK';
    },
    [ActionTypes.HASH_GET_FIELD]: ([, key, field]: string[]) => {
        const item = store.hashes[key];
        if (item && !isExpired(item.expiresAt)) {
            return item.value[field] ? `${item.value[field]}` : 'nil';
        } else {
            return 'nil';
        }
    },
    [ActionTypes.HASH_DELETE_FIELD]: ([, key, field]: string[]) => {
        const item = store.hashes[key];
        if (item && !isExpired(item.expiresAt)) {
            delete item.value[field];
            saveToDisk();
        }
        return 'OK';
    },
    [ActionTypes.HASH_GET_ALL]: ([, key]: string[]) => {
        const item = store.hashes[key];
        if (item && !isExpired(item.expiresAt)) {
            // return Object.entries(item.value).flat().join(' ');
            return JSON.stringify(item.value);
        } else {
            return 'nil';
        }
    }    
};


