import { env } from '../../env/default';
import axios from 'axios';

export function get_hourly_events() {
    return (dispatch) => {
        axios.get(`${env.endpoint}/events/hourly`)
        .then(res => {
            dispatch({type: 'events_hourly', data: res.data});  
        })
        .catch(err => {
            dispatch({type: 'error', data: err});
        })
    }
}

export function get_daily_events() {
    return (dispatch) => {
        axios.get(`${env.endpoint}/events/daily`)
        .then(res => {
            dispatch({type: 'events_daily', data: res.data});  
        })
        .catch(err => {
            dispatch({type: 'error', data: err});
        })
    }
}