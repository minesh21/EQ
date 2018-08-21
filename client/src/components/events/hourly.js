import React, { Component } from 'react';
import TableComponent from '../table/table';

class EventsHourlyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: ['Date', 'Hour', 'Events'],
            rows: [],
            search: [],
        }
        this.handleOnSearch = this.handleOnSearch.bind(this);
    }

    componentWillReceiveProps(next) {
        if (next.data !== this.state.rows) {
            this.setState({rows: next.data});
            this.setState({search: next.data});
        }
    }

    handleOnSearch(data) {
        this.setState({search: data});
    }

    render() {
        return (
            <div>
                {this.state.rows && this.state.rows.length > 0 ? 
                    <div>
                        <TableComponent headings={this.state.headers} table={this.state.rows}/>
                    </div> : 'No Data Found!'}
            </div>
        )
    }
}

export default EventsHourlyComponent;