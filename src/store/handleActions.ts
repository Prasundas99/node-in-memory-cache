export const handleActions = (action: string, command: string[], socket: import("net").Socket) => {
    switch (action.toUpperCase()) {
        case 'SET':
            handleSet();
            break;
        case 'GET':
            handleGet();
            break;
        case 'LPUSH':
            handleLPush();
            break;
        case 'RPUSH':
            handleRPush();
            break;
        case 'LPOP':
            handleLPop();
            break;
        case 'RPOP':
            handleRPop();
            break;
        case 'SADD':
            handleSAdd();
            break;
        case 'SREM':
            handleSRem();
            break;
        case 'SMEMBERS':
            handleSMembers();
            break;
        case 'HSET':
            handleHSet();
            break;
        case 'HGET':
            handleHGet();
            break;
        case 'HDEL':
            handleHDel();
            break;
        case 'HGETALL':
            handleHGetAll();
            break;
        default:
            socket.write('ERROR: Unknown command\n');
            break;
    }
}