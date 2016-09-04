import React, {Component} from 'react';

import $ from 'jquery';

import TextField from 'material-ui/TextField';

import Boxes from './Boxes';
import BoxContent from './BoxContent';

class ListingView extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], filteredData:[],currentBox:""};
    this._onFilterChange = this._onFilterChange.bind(this);
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

  handleBoxSelect = (index) => {
    const registration_number = this.state.filteredData[index].registration_number;
    console.log(registration_number)
    this.setState({
      registration_number: registration_number
    })
  }


  render() {

    return (
      <div>
        <TextField
          onChange={this._onFilterChange}
          hintText="Filter par spécialité"
        />
      <Boxes data={this.state.filteredData} onCellClick={this.handleBoxSelect} />
      <br/>
      <BoxContent registration_number={this.state.registration_number} />
      </div>
    );
  }

}

export default ListingView;
