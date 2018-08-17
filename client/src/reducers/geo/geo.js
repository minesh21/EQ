export function response_data(state = [], action) {
    switch(action.type) {
        case 'response_data':
            return action.data;
        case 'error':
            return action.data;
        default:
            return state;
    }
}