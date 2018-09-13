import React, { Component } from 'react';
import './App.css';
import Chart from './component/Chart';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateData = (count=100) => {
  const data = [];
  const values = {
    'value': [100, 105, 115, 120],
    'baseline': [
      [95, 100, 105, 110],
      [105, 110, 115, 120]
    ]
  }
  for (var i = 0; i < count; i++) {
    let index = 3;
    if (i <= count/3)
      index = 1
    if ( i >= count/3 && i <= (count/3) * 2)
      index = 2

    data.push({
      value: getRandomNumber(values.value[index-1], values.value[index]),
      baseline: [
        getRandomNumber(values.baseline[0][index-1], values.baseline[0][index]),
        getRandomNumber(values.baseline[1][index-1], values.baseline[1][index])
      ]
    });
  }
  return data;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      // count: 100,
      finalCount: 1000,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }
  handleUpdate() {
    this.setState({
      finalCount: this.state.count,
    });
  }
  updateInput({ target: { value } }) {
    this.setState({
      count: value
    });
  }
  render() {
    return (
      <div className="app">
        {/* <div className="card app-input">
          <main>
            <span>
              Enter count: &nbsp;&nbsp;
            </span>
            <input
              type="number"
              placeholder="Enter number of records"
              value={this.state.count}
              onChange={this.updateInput}
            />
            <button onClick={this.handleUpdate}>Redraw chart</button>
          </main>
        </div> */}
        <Chart
          data={generateData(this.state.finalCount)}
          startIndex={Math.floor(this.state.finalCount/2) - 10}
          endIndex={Math.floor(this.state.finalCount/2) + 10}
        />
      </div>
    );
  }
}

export default App;
