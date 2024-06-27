"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const net = __importStar(require("net"));
const store = {
    strings: {},
    lists: {},
    sets: {},
    hashes: {},
};
const saveToDisk = () => {
    fs.writeFileSync('dump.rdb', JSON.stringify(store));
};
const loadFromDisk = () => {
    if (fs.existsSync('dump.rdb')) {
        const data = fs.readFileSync('dump.rdb', 'utf8');
        Object.assign(store, JSON.parse(data));
    }
};
loadFromDisk();
const server = net.createServer((socket) => {
    console.log('Client connected');
    socket.on('data', (data) => {
        const command = data.toString().trim().split(' ');
        const action = command[0].toUpperCase();
        switch (action) {
            case 'SET':
                store.strings[command[1]] = command[2];
                saveToDisk();
                socket.write('OK\n');
                break;
            case 'GET':
                socket.write(store.strings[command[1]] ? `${store.strings[command[1]]}\n` : 'nil\n');
                break;
            case 'LPUSH':
                if (!store.lists[command[1]]) {
                    store.lists[command[1]] = [];
                }
                store.lists[command[1]].unshift(command[2]);
                saveToDisk();
                socket.write('OK\n');
                break;
            case 'RPUSH':
                if (!store.lists[command[1]]) {
                    store.lists[command[1]] = [];
                }
                store.lists[command[1]].push(command[2]);
                saveToDisk();
                socket.write('OK\n');
                break;
            case 'LPOP':
                if (store.lists[command[1]] && store.lists[command[1]].length > 0) {
                    socket.write(`${store.lists[command[1]].shift()}\n`);
                    saveToDisk();
                }
                else {
                    socket.write('nil\n');
                }
                break;
            case 'RPOP':
                if (store.lists[command[1]] && store.lists[command[1]].length > 0) {
                    socket.write(`${store.lists[command[1]].pop()}\n`);
                    saveToDisk();
                }
                else {
                    socket.write('nil\n');
                }
                break;
            case 'SADD':
                if (!store.sets[command[1]]) {
                    store.sets[command[1]] = new Set();
                }
                store.sets[command[1]].add(command[2]);
                saveToDisk();
                socket.write('OK\n');
                break;
            case 'SREM':
                if (store.sets[command[1]]) {
                    store.sets[command[1]].delete(command[2]);
                    saveToDisk();
                }
                socket.write('OK\n');
                break;
            case 'SMEMBERS':
                if (store.sets[command[1]]) {
                    socket.write(`${Array.from(store.sets[command[1]]).join(' ')}\n`);
                }
                else {
                    socket.write('nil\n');
                }
                break;
            case 'HSET':
                if (!store.hashes[command[1]]) {
                    store.hashes[command[1]] = {};
                }
                store.hashes[command[1]][command[2]] = command[3];
                saveToDisk();
                socket.write('OK\n');
                break;
            case 'HGET':
                if (store.hashes[command[1]]) {
                    socket.write(store.hashes[command[1]][command[2]] ? `${store.hashes[command[1]][command[2]]}\n` : 'nil\n');
                }
                else {
                    socket.write('nil\n');
                }
                break;
            case 'HDEL':
                if (store.hashes[command[1]]) {
                    delete store.hashes[command[1]][command[2]];
                    saveToDisk();
                }
                socket.write('OK\n');
                break;
            case 'HGETALL':
                if (store.hashes[command[1]]) {
                    const hashEntries = Object.entries(store.hashes[command[1]]);
                    const response = hashEntries.flat().join(' ');
                    socket.write(`${response}\n`);
                }
                else {
                    socket.write('nil\n');
                }
                break;
            default:
                socket.write('ERROR: Unknown command\n');
                break;
        }
    });
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});
server.listen(6379, () => {
    console.log('Server listening on port 6379');
});
//# sourceMappingURL=index.js.map