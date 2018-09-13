import React, { Component } from 'react';
import moment from 'moment';
import {ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const data = [
  {timestamp: 1536830114744, value: 100, baseline: [90, 110]},
  {timestamp: 1536830214744, value: 120, baseline: [94, 124]},
  {timestamp: 1536830316744, value: 90, baseline: [80, 100]},
  {timestamp: 1536830417744, value: 80, baseline: [78, 100]},
  {timestamp: 1536830518744, value: 130, baseline: [80, 120]},
  {timestamp: 1536830619744, value: 80, baseline: [80, 100]},
  {timestamp: 1536830720744, value: 90, baseline: [80, 100]},
];

class Baseline extends Component {
  render() {
    return (
      <div className="App">
        <ResponsiveContainer width={this.props.chartWidth} height={300}>
            <ComposedChart
            data={this.props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
            <YAxis domain = {['auto', 'auto']} />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            isAnimationActive={false}
            dot={false}
            />
            <Area
            dataKey="baseline"
            fill="#8884d8"
            stroke="#8884d8"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity="0.6"
            legendType="line"
            isAnimationActive={false}
            dot={false}
            />
            </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

Baseline.defaultProps = {
    data: data
}

export default Baseline;
