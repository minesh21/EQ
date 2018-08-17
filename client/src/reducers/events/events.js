export function events_hourly(state = [], action) {
    switch (action.type) {
        case 'events_hourly':
            return action.data;
        case 'error':
            return action.data;
        default:
            return state;
    }
}

export function events_daily(state = [], action) {
    switch (action.type) {
        case 'events_daily':
            return action.data;
        case 'error':
            return action.data;
        default:
            return state;
    }
}