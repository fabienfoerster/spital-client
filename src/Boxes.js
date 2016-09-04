import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import moment from 'moment';
import $ from 'jquery';

class Boxes extends Component {

  render() {
    const width = $(window).width();
    const height = $(window).height()/3;

    return (
      <Table
      rowHeight={50}
      rowsCount={this.props.data.length}
      width={width}
      height={height}
      headerHeight={50}>
      <Column
        header={<Cell>Matricule</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this.props.onCellClick(rowIndex)}>
          {this.props.data[rowIndex].registration_number}
          </Cell>
        )}
        width={width/5}
      />
      <Column
        header={<Cell>Nom</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this.props.onCellClick(rowIndex)}>
          {this.props.data[rowIndex].name}
          </Cell>
        )}
        width={width/5}
        flexGrow={3}
      />
      <Column
        header={<Cell>Spécialité</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this.props.onCellClick(rowIndex)}>
          {this.props.data[rowIndex].specialty}
          </Cell>
        )}
        width={width/5}
      />
      <Column
        header={<Cell>Info Sup</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this.props.onCellClick(rowIndex)}>
          {this.props.data[rowIndex].information}
          </Cell>
        )}
        width={width/5}
        flexGrow={1}
      />
      <Column
        header={<Cell>Dernière Modif</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this._onClick(rowIndex)}>
          {moment.unix(this.props.data[rowIndex].last_modified).format("DD-MM-YYYY")}
          </Cell>
        )}
        width={width/5}
      />

      </Table>
    )
  }
}

export default Boxes;
