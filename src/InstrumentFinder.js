import React, {Component} from 'react';
import $ from 'jquery';
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import AutoComplete from 'material-ui/AutoComplete';

class InstrumentFinder extends Component {

  constructor(props) {
    super(props);
    this.state = {data: [],instruments:[],names:[],currentInstrument:""}
  }

  loadInstrumentsFromServer = () => {
    const url = 'http://spital-server:5000/api/v1/instruments'
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: (instruments) => {
        this.setState({instruments:instruments});
      },
      error: function(xhr, status, err){
        console.error(url,status,err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadInstrumentsFromServer();
  }

  createDataSource = () => {
    return this.state.instruments.map( i => i.name)
  }

  loadContentFromServer = (id) => {
    const url = "http://spital-server:5000/api/v1/instruments/"+id+"/boxes"
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

  _OnSelectInstrument = (req,i) => {
    console.log(req.ref)
    this.setState({
      currentInstrument: req.ref
    });
    this.loadContentFromServer(req.ref)
  }

  render() {
    const width = $(window).width();
    const height = $(window).height()/2;

    return (
      <div>
        <AutoComplete
          floatingLabelText="Chercher un instrument"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.instruments}
          dataSourceConfig={{text:'name',value:'ref'}}
          maxSearchResults={5}
          onNewRequest={this._OnSelectInstrument}
        />
        <Table
        rowHeight={50}
        rowsCount={this.state.data.length}
        width={width}
        height={height}
        headerHeight={50}>
        <Column
          header={<Cell>Nom boîte</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
            {this.state.data[rowIndex].name}
            </Cell>
          )}
          width={width/3}
          flexGrow={3}
        />
        <Column
          header={<Cell>Quantitté</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
            {this.state.data[rowIndex].quantity}
            </Cell>
          )}
          width={width/3}

        />
        <Column
          header={<Cell>Manquant</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props} >
            {this.state.data[rowIndex].missing}
            </Cell>
          )}
          width={width/3}
        />

        </Table>
    </div>
    );
  }



}

export default InstrumentFinder;
