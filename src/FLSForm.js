import React, {Component} from 'react';
import './FLSForm.css';
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import areIntlLocalesSupported from 'intl-locales-supported';
import moment from 'moment';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
}

class FLSForm extends Component {

  constructor(props) {
    super(props);
    this.state ={boxes:[],instruments:[],reasons:[],currentBox:[],currentInstrument:"",currentReason:"",interlocuteur:"",date_aller:0,date_retour:0,com_aller:"",com_retour:""};
  }

  componentDidMount() {
    this.loadBoxesNames();
    this.loadReasons();
  }

  loadBoxesNames = () => {
    const url = "http://spital-server:5000/api/v1/boxes"
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: (boxes) => {
        this.setState({boxes:boxes});
      },
      error: function(xhr, status, err){
        console.error(url,status,err.toString());
      }
    });
  }

  loadReasons = () => {
    const url = "http://spital-server:5000/api/v1/statusreports/reasons"
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: (reasons) => {
        this.setState({reasons:reasons});
      },
      error: function(xhr, status, err){
        console.error(url,status,err.toString());
      }
    });
  }

  loadInstruments = (registration_number) => {
    const url = "http://spital-server:5000/api/v1/boxes/"+registration_number+"/content"
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

  _onSelectBox = (req,i) => {
    console.log("Current Box : " + req)
    this.setState({
      currentBox : req
    })
    this.loadInstruments(req.registration_number);

  }

  _onSelectInstrument = (req,i) => {
    console.log("Current Instrument : " + req.ref)
    this.setState({
      currentInstrument: req
    })
  }

  _onSelectReason = (e,value) => {
    console.log("Reason chossen : "+ value)
    this.setState({
      currentReason: value
    })
  }

  _onSelectInterlocuteur = (e) => {
    this.setState({
      interlocuteur: e.target.value
    })
  }

  _onSelectDateAller = (e, date) => {
    let timestamp = moment(date).format("X")
    console.log("Date aller : " +date)
    this.setState({
      date_aller: timestamp

    })
  }

  _onSelectDateRetour = (e, date) => {
    let timestamp = moment(date).format("X")
    console.log("Date retour : " +date)
    this.setState({
      date_retour: timestamp
    })
  }

  _handleComAller = (e) => {
    this.setState({
      com_aller: e.target.value
    })
  }

  _handleComRetour = (e) => {
    this.setState({
      com_retour: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let status_report = {};
    status_report.boxid = this.state.currentBox.registration_number;
    status_report.boxname = this.state.currentBox.name;
    status_report.instrumentid = this.state.currentInstrument.ref;
    status_report.instrumentname = this.state.currentInstrument.name
    status_report.specialty = this.state.currentBox.specialty;
    status_report.interlocutor = this.state.interlocuteur;
    status_report.reason = this.state.currentReason;
    status_report.dategoing = this.state.date_aller;
    status_report.datecoming = this.state.date_retour;
    status_report.commentgoing = this.state.com_aller;
    status_report.commentcoming = this.state.com_retour;

    console.log(status_report)
    $.ajax({
      url: 'http://spital-server:5000/api/v1/statusreports',
      dataType: 'json',
      type: 'POST',
      processData: false,
      contentType: 'application/json',
      data: JSON.stringify(status_report),
      cache: false,
      success: function(data) {
        console.log(data)
      },
      error: function(xhr,status,err) {
        console.log(err)
      }
    });
  }

  render() {
    var reasons = this.state.reasons.map(r => {
      return (
        <RadioButton
          value={r}
          label={r}
          key={r}
        />
      )
    });
    return (
      <form className="FLSForm" onSubmit={this.handleSubmit}>
        <AutoComplete
          floatingLabelText="Nom de la boîte"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.boxes}
          dataSourceConfig={{text: 'name', value:'registration_number'}}
          maxSearchResults={10}
          onNewRequest={this._onSelectBox}
        />
        <br />
        <AutoComplete
          floatingLabelText="Instrument"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.instruments}
          dataSourceConfig={{text:'name', value:'ref'}}
          maxSearchResults={10}
          onNewRequest={this._onSelectInstrument}
        />
        <RadioButtonGroup name="status_report_reasons" onChange={this._onSelectReason}>
          {reasons}
        </RadioButtonGroup>
        <TextField
          hintText="Interlocuteur"
          floatingLabelText="Interlocuteur"
          onChange={this._onSelectInterlocuteur}
          value={this.state.interlocuteur}
        />
        <DatePicker
          hintText="Date aller"
          floatingLabelText="Date aller"
          DateTimeFormat={DateTimeFormat}
           locale="fr"
           onChange={this._onSelectDateAller}
        />
        <TextField
          hintText="Commentaire aller"
          floatingLabelText="Commentaire aller"
          multiLine={true}
          rows={2}
          rowsMax={4}
          onChange={this._handleComAller}
          value={this.state.com_aller}
          fullWidth={true}
        />
        <DatePicker
          hintText="Date retour"
          floatingLabelText="Date retour"
          DateTimeFormat={DateTimeFormat}
           locale="fr"
           onChange={this._onSelectDateRetour}
        />
        <TextField
          hintText="Commentaire retour"
          floatingLabelText="Commentaire retour"
          multiLine={true}
          rows={2}
          rowsMax={4}
          onChange={this._handleComRetour}
          value={this.state.com_retour}
          fullWidth={true}
        />
        <RaisedButton label="Enregistrer" type="submit" fullWidth={true}/>
      </form>

    );
  }

}

export default FLSForm;
