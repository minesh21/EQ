import { env } from '../../env/default';
import axios from 'axios';

export function get_hourly_events() {
    return (dispatch) => {
        axios.get(`${env.endpoint}/stats/hourly`)
        .then(res => {
            dispatch({type: 'stats_hourly', data: res.data});  
        })
        .catch(err => {
            dispatch({type: 'error', data: err});
        })
    }
}

export function get_daily_events() {
    return (dispatch) => {
        axios.get(`${env.endpoint}/stats/daily`)
        .then(res => {
            dispatch({type: 'stats_daily', data: res.data});  
        })
        .catch(err => {
            dispatch({type: 'error', data: err});
        })
    }
}