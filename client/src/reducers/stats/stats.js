export function stats_hourly(state = [], action) {
    switch (action.type) {
        case 'stats_hourly':
            return action.data;
        case 'error':
            return action.data;
        default:
            return state;
    }
}

export function stats_daily(state = [], action) {
    switch (action.type) {
        case 'stats_daily':
            return action.data;
        case 'error':
            return action.data;
        default:
            return state;
    }
}