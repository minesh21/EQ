import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { events_hourly, events_daily } from './events/events';
import { stats_hourly, stats_daily } from './stats/stats';
import { response_data } from './geo/geo';
export default combineReducers({
    routing: routerReducer,
    events_hourly,
    events_daily,
    stats_hourly,
    stats_daily,
    response_data,
});