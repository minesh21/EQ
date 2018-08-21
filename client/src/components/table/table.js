import React, { Component } from 'react';
import { Table, Input } from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import './table.css';
class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: [],
        }
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.setState({data: this.props.table, search: this.props.table});
    }

    search(evt) {
        let array = JSON.parse(JSON.stringify(this.state.data));
        this.fuzzy_search(evt.target.value, array);
    }

    fuzzy_search(token, array) {
        let keys = Object.keys(array[0]).map(key => key === 'relavance' ? null : key);
        let search = array.map(row => {
            for (let key of keys) {
               let word = this.find(token, row[key].toString());
                row[key] = word;
                
            }
            return row;
        })
        this.setState({search});
    }

    find(token, str) {
        let chars = token.replace(/\s/, '').split('');
        let temp = '';
        chars.map(char => {
                const regex = new RegExp(char, 'gi');
                temp = str.toLowerCase().replace(regex, `<strong class="bold">${char}</strong>`);
                str = temp;
            })
        let word = str;
        return word;
    }

    minimumDistance(above, left, diagonal) {
        let min = above;
        if (left < min) min = left;
        if (diagonal < min) min = diagonal;

        return min
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
            if (key !== 'relavence') {
                return (
                    <Table.Cell key={index}>{renderHTML(`${row[key]}`)}</Table.Cell>
                )
            }
            
        })
    }

    render() {
        return (
            <div>
                <Input size="mini" icon="search" placeholder="Search..." onChange={this.search}/>
                <div style={{maxHeight: '400px', overflowY: 'scroll'}}>
                    <Table celled >
                        <Table.Header>
                            <Table.Row>
                                {this.generateHeader(this.props.headings)}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body >
                            {this.generateBody(this.state.search)}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            
            
        )
    }
}

export default TableComponent;