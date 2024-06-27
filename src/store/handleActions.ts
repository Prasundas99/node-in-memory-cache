import { dataStorageActions } from "./dataStorageActions";

export const handleActions = (action: string, command: string[], socket: import("net").Socket) => {
    const { actions } = dataStorageActions(command, socket);

    const handler = actions[action as keyof typeof actions]; 

    if (handler) {
        handler();
    } else {
        socket.write('ERROR: Unknown command\n');
    }
};
