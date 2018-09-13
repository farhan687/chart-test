import React, { Component } from 'react';
import moment from 'moment';
import {ComposedChart, Line, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Surface} from 'recharts';
import './Chart.css'
import Baseline from './Baseline';

const data = [
  {timestamp: 1536830114744, value: 100, baseline: [90, 110]},
  {timestamp: 1536830214744, value: 120, baseline: [94, 124]},
  {timestamp: 1536830316744, value: 90, baseline: [80, 100]},
  {timestamp: 1536830417744, value: 80, baseline: [78, 100]},
  {timestamp: 1536830518744, value: 130, baseline: [80, 120]},
  {timestamp: 1536830619744, value: 80, baseline: [80, 100]},
  {timestamp: 1536830720744, value: 90, baseline: [80, 100]},
];

const CHART_WIDTH = 1024
const CHART_HEIGHT = 100

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startIndex: props.startIndex,
            endIndex: props.endIndex
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleUpdate({ startIndex, endIndex }, anything) {
        this.setState({
            startIndex,
            endIndex
        });
    }  
    render() {
        const {  startIndex, endIndex } = this.state;
        const { data } = this.props;
        return (
            <div>
                <section className="baseline-container">
                    <Baseline data={data.slice(startIndex, endIndex + 1)} />
                </section>
                <section className="chart-container">
                    <div className="chart-base">
                        <ComposedChart
                            width={CHART_WIDTH}
                            height={CHART_HEIGHT}
                            data={data}
                        >
                            <XAxis
                                dataKey = 'timestamp'
                                domain = {['auto', 'auto']}
                                name = 'Time'
                                tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm')}
                                type = 'number'
                            />
                            <YAxis domain = {['auto', 'auto']} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#8884d8"
                            />
                        </ComposedChart>
                    </div>
                    <div className="chart-brush">
                        <ComposedChart
                            width={CHART_WIDTH}
                            height={CHART_HEIGHT - 30}
                            data={data}
                        >
                            <XAxis
                                dataKey = 'timestamp'
                                domain = {['auto', 'auto']}
                                name = 'Time'
                                tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm')}
                                type = 'number'
                            />
                            <YAxis domain = {['auto', 'auto']} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="red"
                            />
                            <Brush
                                height={CHART_HEIGHT - 20}
                                fill='rgba(0, 0, 0, 0)'
                                stroke='blue'
                                onChange={this.handleUpdate}
                            />
                        </ComposedChart>
                    </div>
                </section>
            </div>
        );
    }
}

Chart.defaultProps = {
    data: data,
    startIndex: 1,
    endIndex: 3
}

export default Chart;
