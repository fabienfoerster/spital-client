import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import $ from 'jquery';
import moment from 'moment';

class ListingView extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], filteredData:[]};
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: 'http://spital-server:5000/api/v1/boxes',
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data:data,filteredData:data});
      },
      error: function(xhr, status, err){
        console.error("http://spital-server:5000/api/v1/boxes",status,err.toString());
      }
    });
  }

  _onFilterChange(e) {
    if(!e.target.value) {
      this.setState({
        filteredData: this.state.data
      });
    } else {
      var filterBy = e.target.value.toLowerCase();
      var filteredData = []
      this.state.data.forEach( box => {
        if (box.specialty.toLowerCase().indexOf(filterBy) !== -1) {
          filteredData.push(box)
        }
      })
      this.setState({
        filteredData: filteredData
      })
    }
  }

  _onClick(index) {
    console.log(this.state.filteredData[index].registration_number)
  }

  render() {
    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by First Name"
        />
      <Table
      rowHeight={50}
      rowsCount={this.state.filteredData.length}
      width={1400}
      height={500}
      headerHeight={50}>
      <Column
        header={<Cell>Matricule</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this._onClick(rowIndex)}>
          {this.state.filteredData[rowIndex].registration_number}
          </Cell>
        )}
        width={200}
        fixed={true}
      />
      <Column
        header={<Cell>Nom</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this._onClick(rowIndex)}>
          {this.state.filteredData[rowIndex].name}
          </Cell>
        )}
        width={200}
        flexGrow={3}
      />
      <Column
        header={<Cell>Spécialité</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this._onClick(rowIndex)}>
          {this.state.filteredData[rowIndex].specialty}
          </Cell>
        )}
        width={200}
      />
      <Column
        header={<Cell>Info Sup</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this._onClick(rowIndex)}>
          {this.state.filteredData[rowIndex].information}
          </Cell>
        )}
        width={200}
        flexGrow={1}
      />
      <Column
        header={<Cell>Dernière Modif</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} onClick={e => this._onClick(rowIndex)}>
          {moment.unix(this.state.filteredData[rowIndex].last_modified).format("DD-MM-YYYY")}
          </Cell>
        )}
        width={200}
      />

      </Table>
      </div>
    );
  }

}

export default ListingView;
