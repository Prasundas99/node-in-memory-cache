import { loadFromDisk } from './utils/loadFromDisk';
import { handleAction } from './store/handleActions';
import { ActionTypes } from './store/ActionTypes';

loadFromDisk();

const createActionHandler = (action: ActionTypes) => (...args: string[]) => handleAction(action, [action, ...args]);

const actions = {
  SET_STRING: createActionHandler(ActionTypes.SET_STRING),
  GET_STRING: createActionHandler(ActionTypes.GET_STRING),
  LIST_PUSH_FRONT: createActionHandler(ActionTypes.LIST_PUSH_FRONT),
  LIST_PUSH_BACK: createActionHandler(ActionTypes.LIST_PUSH_BACK),
  LIST_POP_FRONT: createActionHandler(ActionTypes.LIST_POP_FRONT),
  LIST_POP_BACK: createActionHandler(ActionTypes.LIST_POP_BACK),
  SET_ADD: createActionHandler(ActionTypes.SET_ADD),
  SET_REMOVE: createActionHandler(ActionTypes.SET_REMOVE),
  SET_MEMBERS: createActionHandler(ActionTypes.SET_MEMBERS),
  HASH_SET_FIELD: createActionHandler(ActionTypes.HASH_SET_FIELD),
  HASH_GET_FIELD: createActionHandler(ActionTypes.HASH_GET_FIELD),
  HASH_DELETE_FIELD: createActionHandler(ActionTypes.HASH_DELETE_FIELD),
  HASH_GET_ALL: createActionHandler(ActionTypes.HASH_GET_ALL)
}


export {actions};
