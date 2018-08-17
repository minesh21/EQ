import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PaginationComponent from './pagination';
import renderHTML from 'react-render-html';
class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            start:0,
            finish: 10,
            limit: 10,
            maxPages: 0,
            pages: [],
        }
        //this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            pages: this.props.table,
        });
    }

    generateHeader(headings) {
        return headings.map((heading, index) => {
            return (
                <Table.HeaderCell key={index}>{heading}</Table.HeaderCell>
            )
        })
    }

    generateBody(rows) {
        return rows.map((row, index) => {
            return (
            <Table.Row key={index}>
                {this.generateCells(row)}
            </Table.Row>
            )
        })
    }
    
    generateCells(row) {
        return Object.keys(row).map((key, index) => {
            return (
                <Table.Cell key={index}>{renderHTML(`<p>${row[key]}</p>`)}</Table.Cell>
            )
        })
    }

    render() {
        return (
            <div style={{maxHeight: '400px', overflowY: 'scroll'}}>
                <Table celled >
                    <Table.Header>
                        <Table.Row>
                            {this.generateHeader(this.props.headings)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        {this.generateBody(this.state.pages)}
                    </Table.Body>
                </Table>
            </div>
            
        )
    }
}

export default TableComponent;