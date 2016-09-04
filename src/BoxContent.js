import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import $ from 'jquery';

class BoxContent extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
  }

  loadContentFromServer = (registration_number) => {
    const url = "http://spital-server:5000/api/v1/boxes/"+registration_number+"/content"
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data:data});
      },
      error: function(xhr, status, err){
        console.error(url,status,err.toString());
      }
    });
  }


  componentWillReceiveProps(nextProps) {
    this.loadContentFromServer(nextProps.registration_number);
  }


  render() {
    const width = $(window).width();
    const height = $(window).height()/3;

    return (
      <Table
      rowHeight={50}
      rowsCount={this.state.data.length}
      width={width}
      height={height}
      headerHeight={50}>
      <Column
        header={<Cell>Nom Instrument</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props} >
          {this.state.data[rowIndex].name}
          </Cell>
        )}
        width={width/5}
        flexGrow={2}
      />
      <Column
        header={<Cell>Qauntité</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props}>
          {this.state.data[rowIndex].quantity}
          </Cell>
        )}
        width={width/5}
      />
      <Column
        header={<Cell>Manquant</Cell>}
        cell={({rowIndex, ...props}) => (
          <Cell {...props}>
          {this.state.data[rowIndex].missing}
          </Cell>
        )}
        width={width/5}
      />

      </Table>
    )
  }
}

export default BoxContent;
