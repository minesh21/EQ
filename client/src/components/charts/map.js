import React, { Component } from 'react';
import './chart.css';
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            type: '',
            metric: '',
            min: 0,
            max: 1,
        }
        
    }
    componentDidMount() {
        this.setState({data: this.props.data});
        
    }

    componentWillReceiveProps(next) {
        if (this.state.metric !== next.metric) {
            this.setState({metric: next.metric});
        }

        if (this.state.data !== next.data) {
            this.setState({data: next.data});
            this.drawMap();
        }

        if (this.state.type !== next.type) {
            this.setState({type: next.type});
        }       
    }

    drawMap() {
        let google = window.google;
        google.charts.load('current', {
            packages: ['geochart'],
            mapsApiKey: 'AIzaSyBZVwpNWakSYrYXjMmTDvFPs1cNdW7Wroo'
        })
        google.charts.setOnLoadCallback(() => {
            let dataTable = new google.visualization.DataTable();
            dataTable.addColumn('number',  'Latitude');
            dataTable.addColumn('number',  'Longitude');
            dataTable.addColumn('number', this.state.metric); // Won't use this column, but still must define it.
            dataTable.addColumn({type:'string', role:'tooltip'});
            if (this.state.data && this.state.data.length > 0) {
                for (const row of this.state.data) {
                    dataTable.addRows([[
                        row.lat, 
                        row.lon, 
                        parseInt(row[this.state.metric], 10), 
                        {type: this.state.metric, role: 'tooltip'}
                    ]]);
                }
                var options = {
                    magnifyingGlass: {enable:true, zoomFactor: 40},
                    region: 'CA',
                    colorAxis:  {
                        minValue: Math.min.apply(Math, this.state.data.map((o) => { return o[this.state.metric] })), 
                        maxValue: Math.max.apply(Math, this.state.data.map((o) => { return o[this.state.metric] })),  
                        colors: ['#6699CC']},
                    legend: {textStyle: {color: 'blue', fontSize: 16}},    
                    backgroundColor: {fill:'transparent',stroke:'#FFF' ,strokeWidth:0 },    
                    datalessRegionColor: '#f5f5f5',
                    displayMode: 'markers', 
                    enableRegionInteractivity: 'true', 
                    resolution: 'provinces',
                    sizeAxis: {minValue: 1, maxValue:1, minSize:5,  maxSize: 5},
                    keepAspectRatio: true,
                    width: '100%',
                    height: '100%',
                    tooltip: {textStyle: {color: '#444444'}}    
                    };
    
                const container = document.getElementById('geomap');
                const chart = new google.visualization.GeoChart(container);
                chart.draw(dataTable, options);
            }
            

            
        });
    }

    render() {
        return(
            <div>
                <div id="geomap"></div>
            </div>
            
        )
    }
}

export default Map;