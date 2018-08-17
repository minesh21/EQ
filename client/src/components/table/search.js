import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';

class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: '',
        }

        this.handleFuzzySearch = this.handleFuzzySearch.bind(this);
        this.handleSelectBoxChange = this.handleSelectBoxChange.bind(this);
    }

    componentDidMount() {
        this.setState({data: this.props.data});
    }

    componentWillReceiveProps(next) {
        if (this.state.data !== next.data) {
            this.setState({data: next.data});
        }
    }

    generateSelectBox() {
        return Object.keys(this.state.data[0]).map((key, index) => {
            return (<option key={index} value={key}>{key}</option>)
        });
    }

    handleSelectBoxChange(evt) {
        this.setState({selected: evt.target.value});
    }

    handleFuzzySearch(evt) {
       const data = this.fuzzy(evt.target.value, this.state.data);
       this.props.onSearch(data);
    }

    fuzzy(str, array){
        let search = []
        for (let i = 0; i < array.length; i++) {
            let text = array[i][this.state.selected].toString();
            let word = this.fuzzy_match(text, str);
            if (word.includes('<strong>')) {
                array[i][this.state.selected] = word;
                search.push(array[i]);
            }
        }

        return search;
    }
    fuzzy_match(text, find)
    {
        var search = find.replace(/\s/g, '').toLowerCase();
        var tokens = [];
        var searchPosition = 0;
    
        for (let i = 0; i < text.length; i++)
        {
            let char = text[i];
            if(searchPosition < search.length &&
                char.toLowerCase() === search[searchPosition])
            {
                char = '<strong>' + char + '</strong>';
                searchPosition += 1;
            }
            tokens.push(char);
        }

        if (searchPosition !== search.length)
        {
            return '';
        }
        return tokens.join('');
    }
    render() {
        return (
            <Menu>
                <Menu.Item>
                    <Input disabled={!this.state.selected} size="mini" icon='search' placeholder='Search...' onChange={this.handleFuzzySearch}/>
                </Menu.Item>
                <Menu.Item>
                    {this.state.data && this.state.data.length ? 
                        <select className="ui selection upward dropdown"
                            onChange={this.handleSelectBoxChange}
                            defaultValue={this.state.selected}>
                        <option value="" disabled>Select box</option>
                        {this.generateSelectBox()}
                    </select>
                        : null}
                    
                </Menu.Item>
            </Menu>
        )
    }
}

export default SearchComponent;