import React, { Component } from 'react';

import './chart.css';

class ColumnChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            headings: [],
            title: '',
            columnId: '',
        }
    }

    componentDidMount() {}

    componentWillReceiveProps(next) {
        if (this.state.data !== next.data && next.data.length > 0) {
            this.setState({data: next.data});
            this.setState({title: next.title});
            this.setState({columnId: next.columnId});
            this.drawChart();
        }
        
    }

    drawChart() {
        let google = window.google;
        google.charts.load('current', {
            packages: ['bar'],
        })
        google.charts.setOnLoadCallback(() => { 

            // Generate Data Table    
            let dataTable = new google.visualization.DataTable();
            let keys = Object.keys(this.state.data[0]).map(key =>{ 
                    return [typeof(this.state.data[0][key]), key.charAt(0).toUpperCase() + key.substr(1)]
                });
                
            for (let key of keys) dataTable.addColumn(key[0], key[1]);

            for (let row of this.state.data) {
                const array=[]
                for (let key of keys) {
                    array.push(row[key[1].toLowerCase()]);
                }
                dataTable.addRows([array]);
            }

            // Set Style
            var options = {
                width: '100%',
                height: '500',
                bars: 'vertical',
                chart: {
                  title: this.state.title,
                }
              };
            let container = document.getElementById(this.state.columnId);
            const chart = new google.charts.Bar(container);
            chart.draw(dataTable, options);
            
        })
    }

    render() {
        return (
            <div id={this.state.columnId}></div>
        )
    }
}

export default ColumnChart;