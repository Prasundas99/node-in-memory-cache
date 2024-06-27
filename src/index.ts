import { loadFromDisk } from './utils/loadFromDisk';
import { handleAction } from './store/handleActions';
import { ActionTypes } from './store/ActionTypes';

loadFromDisk();

const createActionHandler = (action: ActionTypes) => (...args: string[]) => handleAction(action, [action, ...args]);

const actions = Object.keys(ActionTypes).reduce((acc, key) => {
    const action = ActionTypes[key as keyof typeof ActionTypes];
    acc[key.toLowerCase()] = createActionHandler(action);
    return acc;
}, {} as Record<string, (...args: string[]) => string>);


export { actions as default, ActionTypes };
