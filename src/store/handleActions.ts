import { ActionTypes } from "./ActionTypes";
import { dataStorageActions } from "./dataStorageActions";

export const handleActions = (action: ActionTypes, command: string[], socket: import("net").Socket) => {
    const { actions } = dataStorageActions(command, socket);

    const handler = actions[action as keyof typeof actions];

    if (handler) {
        handler();
    } else {
        socket.write('ERROR: Unknown command\n');
    }
};
