import React, { Component } from 'react';
import moment from 'moment';
import {ComposedChart, Line, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Surface} from 'recharts';
import './Chart.css'
import Baseline from './Baseline';

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
                <section className="baseline-container card">
                    <header>
                        Baseline View
                    </header>
                    <main>
                        <Baseline chartWidth={CHART_WIDTH} data={data.slice(startIndex, endIndex + 1)} />
                    </main>
                </section>
                <section className="card">
                    <header>
                        Request time chart for {data.length} points
                    </header>
                    <main>
                        <div className="chart-container">
                            <div className="chart-base">
                                <ComposedChart
                                    width={CHART_WIDTH}
                                    height={CHART_HEIGHT}
                                    data={data}
                                >
                                    <YAxis domain = {['auto', 'auto']} />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                        dot={false}
                                    />
                                </ComposedChart>
                            </div>
                            <div className="chart-brush">
                                <ComposedChart
                                    width={CHART_WIDTH}
                                    height={CHART_HEIGHT}
                                    data={data}
                                >
                                    <YAxis domain = {['auto', 'auto']} />
                                    <Brush
                                        startIndex={startIndex}
                                        endIndex={endIndex}
                                        height={CHART_HEIGHT}
                                        fill='rgba(0, 0, 0, 0)'
                                        stroke='blue'
                                        onChange={this.handleUpdate}
                                    />
                                </ComposedChart>
                            </div>
                        </div>
                    </main>
                </section>
            </div>
        );
    }
}

Chart.defaultProps = {
    startIndex: 1,
    endIndex: 3
}

export default Chart;
