import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import fetch from 'node-fetch';

class ListingView extends Component {
  constructor(props) {
    super(props);
    this.state = { data: []};
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/v1/boxes')
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res
        })
      })
  }

  render() {
    var boxes = this.state.data.map(box => {
      return(
        <TableRow key={box.id}>
          <TableRowColumn >{box.id}</TableRowColumn>
          <TableRowColumn>{box.name}</TableRowColumn>
          <TableRowColumn>{box.specialty}</TableRowColumn>
          <TableRowColumn>{box.information}</TableRowColumn>
          <TableRowColumn>{box.last_modified}</TableRowColumn>
        </TableRow>
      )
    });
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Nom</TableHeaderColumn>
            <TableHeaderColumn>Specialité</TableHeaderColumn>
            <TableHeaderColumn>Information Sup</TableHeaderColumn>
            <TableHeaderColumn>Dernière Modification</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {boxes}
        </TableBody>
      </Table>
    );
  }

}

export default ListingView;
