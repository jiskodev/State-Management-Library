// LIBRARY CODE

function createStore (reducer) {
    // The store should have four parts
    // 1. The state
    // 2. Get the state.
    // 3. Listen to changes on the state
    // 4. Update the state

    let state
    let listeners = []

    // getting the state
    const getState = () => state


    // listening to changes
    const subscribe = (listener) => {
        listeners.push(listener)
        return () =>  {
            listeners = listeners.filter((l) => l !== listener)
        }
    }


    // updating the state
    const dispatch = (action) => {
        // call todos
        state = reducer(state, action)
        // loop over listners and invoke them
        listeners.forEach((listener) => listener())
    }


    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(app)

const unsubscribe = store.subscribe(() => {
    console.log('The new state is ', store.getState())
})


/*
    Characteristics of a pure function
    1) They always return the same result if the same arguments are passed in.
    2) They depend only on the arguments passed into them (they dont access values outside of their own scope).
    3) Never produce any side effects.
    
    */

// APP CODE

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'


// ACTION CREATORS 
function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}


// Reducer function
function todos (state = [], action) {
    switch(action.type) {
        case ADD_TODO :
            return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO :
            return state.map((todo) => todo.id !== action.id ? todo
                : Object.assign({}, todo, {complete: !todo.complete})
        )
        default :
            return state
    }
}

function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}






// ACTIONS


store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: false,
}))

store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the car',
    complete: false,
}))

store.dispatch(addTodoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
}))



store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
        id: 0,
        name: 'Learn Redux'
}))

store.dispatch(addGoalAction({
        id: 1,
        name: 'Lose 20 pounds'
}))

store.dispatch(removeGoalAction(0))
