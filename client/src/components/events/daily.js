import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_daily_events } from '../../actions/events/events';
import TableComponent from '../table/table';

class EventsDailyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: ['Date', 'Events'],
            rows: []
        }
    }

    componentDidMount() {
        this.props.dispatchDaily();
    }

   componentWillReceiveProps(next) {
        this.setState({rows: next.daily});
   }

    render() {
        return (
            <div>
               
            </div>
        )
    }
}

const mapStateToProps = (state, prop) => {
    return {
        daily: state.events_daily,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch, prop) => {
    return {
        dispatchDaily: () => dispatch(get_daily_events())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsDailyComponent);