import {
	ADD_TODO,
	DELETE_TODO,
	EDIT_TODO,
	COMPLETE_TODO,
	COMPLETE_ALL_TODOS,
	CLEAR_COMPLETED,
} from '../constants/ActionTypes'

const initialState = [{
	text: 'Apprendre Redux',
	completed: false,
	id: 0
}]

export default function todos (state = initialState, action) {
    // Le code du reducer
    switch(action.type){
        case ADD_TODO:
            return [
                ...state, // Spread operator
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text,
                },
            ]

        case DELETE_TODO:
            return state.filter((todo) => {
                return todo.id !== action.id
            })
            //break

        case EDIT_TODO:
            return state.map((todo) => {
                return todo.id === action.id ? {
                    ...todo, // Spread operator
                    text: action.text,
                } : todo
            })

        case COMPLETE_TODO:
            return state.map(
                (todo) => {
                    return todo.id === action.id ? {
                        ...todo,
                        completed: !todo.completed
                    }: todo
                }
            )

        case COMPLETE_ALL_TODOS:
            const areAllMarked = state.every((todo) => todo.completed)
        
            return state.map((todo) => ({
                ...todo,
                completed: !areAllMarked,
            }))

        case CLEAR_COMPLETED:
            return state.filter((todo) => todo.completed === false)

        default:
            return state
    }
}
