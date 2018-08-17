import React, { Component } from 'react';
import {Menu, Icon} from 'semantic-ui-react';

class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            maxPages: 0,
            limit: 10,
        }
    }

    componentDidMount() {
        this.setState({
            maxPages: Math.ceil(this.props.maxPages / this.state.limit)
        })
    }

    handleIncrement(page) {
        if (page === this.state.maxPages) {
            return;
        }
        this.setState({activePage: page + 1}, this.changePage)
    }

    changePage() {
        const start = this.state.activePage * this.state.limit;
        const finish = start + this.state.limit;

        this.props.change(this.state.activePage, start, finish);
    }

    handleDecrement(page) {
        if (page === 1) {
            return;
        }
        this.setState({activePage: page - 1}, this.changePage)
    }

    render() {
        return (
            <Menu floated='right' pagination>
                <Menu.Item
                onClick={() => {this.handleDecrement(this.state.activePage)}} 
                as='a' 
                icon>
                    <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item 
                    as='a'
                    onClick={() => {this.handleIncrement(this.state.activePage)}} 
                    icon>
                        <Icon name='chevron right' />
                </Menu.Item>
            </Menu>
        )
    }
}

export default PaginationComponent;