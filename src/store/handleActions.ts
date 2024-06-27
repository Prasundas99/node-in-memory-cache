import { actionHandlers } from './dataStorageActions';
import { ActionTypes } from './ActionTypes';

export const handleAction = (action: ActionTypes, command: string[]) => {
    const handler = actionHandlers[action];

    if (handler) {
        return handler(command);
    } else {
        throw new Error('ERROR: Unknown command');
    }
};
