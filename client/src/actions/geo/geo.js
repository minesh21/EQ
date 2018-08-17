import { env } from '../../env/default';
import axios from 'axios';

export function get_response_data(metric, type, start, end) {
    return (dispatch) => {
        axios.get(`${env.endpoint}/${type}/hourly/list?metric=${metric}&startDate=${start}&endDate=${end}`)
        .then(res => {
            dispatch({type: 'response_data', data: {data: res.data, metric, type}});  
        })
        .catch(err => {
            dispatch({type: 'error', data: err});
        })
    }
}