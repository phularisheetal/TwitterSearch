import React, { Component } from 'react';
import Grid from './Grid.js';
const types = ["Line", "Bar", "Table", "Area"];

const names = ['Apple Store Q4’13', 'Sedi Chart', 'iPhone Sales', 'Black Friday Report', 'Air Assault Combined'];
const values = [100].map(i => {
  return {
    name: names[parseInt(Math.random()*(names.length-1))],
    type: types[parseInt(Math.random()*(types.length-1))],
    date: "Nov 16, 2013, 3:10 PM",
    id: i
  };
});

const cols = ['Name','Type', 'DateTime', 'Id'];
export default class App extends Component {
  render() {
    return (
      <Grid values={values} cols={cols} colName="Name"/>
    );
  }
}
