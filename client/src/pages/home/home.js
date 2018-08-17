import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import EventsHourlyComponent from '../../components/events/hourly';
import EventsDailyComponent from '../../components/events/daily';
import { get_hourly_events } from '../../actions/events/events';
import GeoChart from '../../components/charts/geo';
import { connect } from 'react-redux';
import ColumnChart from '../../components/charts/column';
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hourly: []
        }
    }

    componentDidMount() {
        this.props.hourlyRequest();
    }

    componentWillReceiveProps(next) {
        if (this.state.hourly !== next.hourly) {
            this.setState({hourly: next.hourly});
        }
    }

    render() {
        return (
            <div>
                <GeoChart />
                    <Grid  style={{marginTop: '25px'}}>
                        <Grid.Row columns="1">
                            <Grid.Column>
                                <EventsHourlyComponent data={this.state.hourly}/>
                            </Grid.Column>
                            <Grid.Column>
                                <ColumnChart 
                                data={this.state.hourly} 
                                title={'Hourly Events Data'}
                                columnId={'column-1'}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            </div>

        )
        
    }
}

const mapStateToProps = (state, props) => {
    return {
        hourly: state.events_hourly,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        hourlyRequest: () => dispatch(get_hourly_events())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);