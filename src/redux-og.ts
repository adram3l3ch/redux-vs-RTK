import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { v1 as uuid } from 'uuid';
// import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Todo } from './type';

//actions types
const CREATE_TODO = 'CREATE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SELECT_TODO = 'SELECT_TODO';

//action creators
interface CreateTodoActionType {
	type: typeof CREATE_TODO;
	payload: Todo;
}

export const createTodoActionCreator = ({ desc }: { desc: string }): CreateTodoActionType => {
	return { type: CREATE_TODO, payload: { id: uuid(), desc, isComplete: false } };
};

interface EditTodoActionType {
	type: typeof EDIT_TODO;
	payload: { id: string; desc: string };
}

export const editTodoActionCreator = ({
	id,
	desc,
}: {
	id: string;
	desc: string;
}): EditTodoActionType => {
	return { type: EDIT_TODO, payload: { id, desc } };
};

interface ToggleTodoActionType {
	type: typeof TOGGLE_TODO;
	payload: { id: string; isComplete: boolean };
}

export const toggleTodoActionCreator = ({
	id,
	isComplete,
}: {
	id: string;
	isComplete: boolean;
}): ToggleTodoActionType => ({ type: TOGGLE_TODO, payload: { id, isComplete } });

interface DeleteTodoActionType {
	type: typeof DELETE_TODO;
	payload: { id: string };
}

export const deleteTodoActionCreator = ({ id }: { id: string }): DeleteTodoActionType => ({
	type: DELETE_TODO,
	payload: { id },
});

interface SelectTodoActionType {
	type: typeof SELECT_TODO;
	payload: { id: string };
}

export const selectTodoActionCreator = ({ id }: { id: string }): SelectTodoActionType => {
	return { type: SELECT_TODO, payload: { id } };
};

//reducers
type TodoActionTypes =
	| CreateTodoActionType
	| EditTodoActionType
	| ToggleTodoActionType
	| DeleteTodoActionType;

const initialTodos = [
	{
		id: uuid(),
		desc: 'Learn React',
		isComplete: true,
	},
	{
		id: uuid(),
		desc: 'Learn Redux',
		isComplete: true,
	},
	{
		id: uuid(),
		desc: 'Learn Redux-ToolKit',
		isComplete: false,
	},
];

const todosReducer = (state: Todo[] = initialTodos, { type, payload }: TodoActionTypes) => {
	switch (type) {
		case CREATE_TODO: {
			return [...state, payload];
		}
		case EDIT_TODO: {
			return state.map((todo: Todo) =>
				todo.id === payload.id ? { ...todo, ...payload } : todo
			);
		}
		case TOGGLE_TODO: {
			return state.map((todo: Todo) =>
				todo.id === payload.id ? { ...todo, ...payload } : todo
			);
		}
		case DELETE_TODO: {
			return state.filter((todo: Todo) => todo.id !== payload.id);
		}
		default:
			return state;
	}
};

type SelectTodoActionTypes = SelectTodoActionType;

const selectedTodoReducer = (
	state: string | null = null,
	{ type, payload }: SelectTodoActionTypes
) => {
	switch (type) {
		case SELECT_TODO: {
			return payload.id;
		}
		default:
			return state;
	}
};

const counterReducer = (state: number = 0, { type, payload }: TodoActionTypes) => {
	switch (type) {
		case CREATE_TODO:
			return state + 1;
		case EDIT_TODO:
			return state + 1;
		case TOGGLE_TODO:
			return state + 1;
		case DELETE_TODO:
			return state + 1;
		default:
			return state;
	}
};

const reducers = combineReducers({
	todos: todosReducer,
	selectedTodo: selectedTodoReducer,
	counter: counterReducer,
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(logger)));
// composeWithDevTools(applyMiddleware(thunk, logger))
