import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Input, Button, Radio } from 'semantic-ui-react';
import { get_response_data } from '../../actions/geo/geo';
import Map from './map';
import moment from 'moment';
import './chart.css';

class GeoChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metric: 0,
            metrics: ['Events', 'Stats'],
            data: [],
            selected: 'hour',
            startDate: moment('2017-01-01').format('YYYY-MM-DD'),
            endDate: moment(moment.now()).add(1, 'days').format('YYYY-MM-DD'),
        }
        this.handleMetricsChange = this.handleMetricsChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    componentDidMount() {
        this.getResponseData();
    }

    componentWillReceiveProps(next){
        if (this.state.data !== next.data.data) {
            this.setState({data: next.data.data});
        }
        
    }

    handleMetricsChange(num) {
        this.setState({metric: num});
    }

    handleSelectChange(evt) {
        this.setState({selected: evt.target.value})
    }

    handleStartDateChange(evt) {
        this.setState({startDate: evt.target.value});
    }

    handleEndDateChange(evt) {
        this.setState({endDate: evt.target.value});
    }

    getResponseData() {
        this.props.metricDataRequest(
            this.state.selected,
            this.state.metrics[this.state.metric].toLowerCase(),
            this.state.startDate,
            this.state.endDate
        )
    }

    render() {
        return (
            <div>
                <Menu style={{'display': 'flex', 'alignItems': 'center','justifyContent': 'flex-end'}}>
                    <div classs="name">
                        Metrics: 
                    </div>
                    <div className="events ml-1 mr-1">
                        <Radio label='Events' 
                            value="0" 
                            onClick={() => {this.handleMetricsChange(0)}}
                            checked={this.state.metric === 0} />
                    </div>
                    <div className="stats ml-1 mr-1">
                        <Radio label='Stats' 
                            value="1"
                            onClick={() => {this.handleMetricsChange(1)}}
                            checked={this.state.metric === 1}/>
                    </div>
                </Menu>

                <Map data={this.state.data} 
                    type={this.props.data.type}
                    metric={this.props.data.metric}/>

                <Menu style={{'display': 'flex', 'justifyContent': 'center'}}>
                    <div>
                        {this.state.metric === 0 ? 
                        <select className="ui selection upward dropdown"
                            value={this.state.selected}
                            onChange={this.handleSelectChange}>
                            <option value="events">Events</option>
                            <option value="hour">Hours</option>
                        </select> : null}
                        
                        {this.state.metric === 1 ? 
                            <select className="ui selection upward dropdown"
                                value={this.state.selected}
                                onChange={this.handleSelectChange}>
                                <option value="clicks">Clicks</option>
                                <option value="hour">Hours</option>
                                <option value="impressions">Impressions</option>
                                <option value="revenue">Revenue</option>

                            </select> : null}
                    </div>
                    <div>
                        <Input 
                            size="small" 
                            type="date" 
                            value={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            label="From Date" />
                    </div>
                    <div>
                        <Input 
                        size="small" 
                        type="date"
                        value={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        label="To Date" />
                    </div>
                    <div>
                        <Button 
                            style={{'height': '100%', 'borderRadius': '0'}} 
                            color="blue"
                            onClick={() => {this.getResponseData()}}>
                            Go
                        </Button>
                    </div>
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        data: state.response_data
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        metricDataRequest: (metric, type, start, end) => dispatch(get_response_data(metric, type, start, end))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeoChart);