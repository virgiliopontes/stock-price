import React, {Component} from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from 'recharts';

class SimpleLineChart extends Component {
  
  render () {
    if(this.props.data[0]===undefined || this.props.data[0].latestPrice===''){
		return '';
    }else{
			console.log(this.props)
		return (<center>
			<AreaChart	width={600}	height={300} data={ this.props.data } margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<Area type='monotone' dataKey='latestPrice' stackId="1" stroke='#ffc658' fill='#ffc658' />
				<CartesianGrid strokeDasharray='3 3'/>
				<Tooltip/>
				<YAxis/>
				<XAxis dataKey='date'/>
				<Legend />
			</AreaChart>
			</center>
		);
    }
  }
}

export default SimpleLineChart;