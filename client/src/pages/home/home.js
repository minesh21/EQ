import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import EventsHourlyComponent from '../../components/events/hourly';
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

    static getDerivedStateFromProps(props, state) {
        if (state.hourly !== props.hourly) {
            return {
                hourly: props.hourly,
            }
        }
    } 

    render() {
        return (
            <div>
                <GeoChart />
                <Container>
                    
                    <Grid  style={{marginTop: '25px'}}>
                        <Grid.Row columns="2">
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
                </Container>
                
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