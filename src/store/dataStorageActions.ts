import { saveToDisk } from "utils/saveToDisk";
import { store } from "./store";
import { ActionTypes } from "./ActionTypes";

export const dataStorageActions = (command: string[], socket: import("net").Socket) => {
    const handleSet = () => {
        const [, key, value] = command;
        store.strings[key] = value;
        saveToDisk();
        socket.write('OK\n');
    };

    const handleGet = () => {
        const [, key] = command;
        const value = store.strings[key];
        socket.write(value ? `${value}\n` : 'nil\n');
    };

    const handleListPush = () => {
        const [, key, value] = command;
        store.lists[key] = store.lists[key] || [];
        store.lists[key].unshift(value);
        saveToDisk();
        socket.write('OK\n');
    };

    const handleRPush = () => {
        const [, key, value] = command;
        store.lists[key] = store.lists[key] || [];
        store.lists[key].push(value);
        saveToDisk();
        socket.write('OK\n');
    };

    const handleListPop = () => {
        const [, key] = command;
        const list = store.lists[key];
        const value = list && list.length > 0 ? list.shift() : 'nil';
        socket.write(`${value}\n`);
        saveToDisk();
    };

    const handleRPop = () => {
        const [, key] = command;
        const list = store.lists[key];
        const value = list && list.length > 0 ? list.pop() : 'nil';
        socket.write(`${value}\n`);
        saveToDisk();
    };

    const handleSetAdd = () => {
        const [, key, value] = command;
        store.sets[key] = store.sets[key] || new Set();
        store.sets[key].add(value);
        saveToDisk();
        socket.write('OK\n');
    };

    const handleSRem = () => {
        const [, key, value] = command;
        const set = store.sets[key];
        if (set) {
            set.delete(value);
            saveToDisk();
        }
        socket.write('OK\n');
    };

    const handleSMembers = () => {
        const [, key] = command;
        const set = store.sets[key];
        const members = set ? Array.from(set).join(' ') : 'nil';
        socket.write(`${members}\n`);
    };

    const handleHSet = () => {
        const [, key, field, value] = command;
        store.hashes[key] = store.hashes[key] || {};
        store.hashes[key][field] = value;
        saveToDisk();
        socket.write('OK\n');
    };

    const handleHGet = () => {
        const [, key, field] = command;
        const hash = store.hashes[key];
        const value = hash && hash[field] ? hash[field] : 'nil';
        socket.write(`${value}\n`);
    };

    const handleHDel = () => {
        const [, key, field] = command;
        const hash = store.hashes[key];
        if (hash && hash[field]) {
            delete hash[field];
            saveToDisk();
        }
        socket.write('OK\n');
    };

    const handleHGetAll = () => {
        const [, key] = command;
        const hash = store.hashes[key];
        const response = hash ? Object.entries(hash).flat().join(' ') : 'nil';
        socket.write(`${response}\n`);
    };

    const handlePing = () => {
        socket.write('PONG\n');
    };
    
    const actions = {
        [ActionTypes.SET]: handleSet,
        [ActionTypes.GET]: handleGet,
        [ActionTypes.LPUSH]: handleListPush,
        [ActionTypes.RPUSH]: handleRPush,
        [ActionTypes.LPOP]: handleListPop,
        [ActionTypes.RPOP]: handleRPop,
        [ActionTypes.SADD]: handleSetAdd,
        [ActionTypes.SREM]: handleSRem,
        [ActionTypes.SMEMBERS]: handleSMembers,
        [ActionTypes.HSET]: handleHSet,
        [ActionTypes.HGET]: handleHGet,
        [ActionTypes.HDEL]: handleHDel,
        [ActionTypes.HGETALL]: handleHGetAll,
        [ActionTypes.PING]: handlePing
    };
    
    return { actions };
};
