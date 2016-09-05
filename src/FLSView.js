import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import './FLSView.css'
import $ from 'jquery';
import moment from 'moment';

class FLSView extends Component {

  constructor(props) {
    super(props);
    this.state = {fls:[]}
  }

  _loadFLS = () => {
    const url = "http://spital-server:5000/api/v1/statusreports"
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: (fls) => {
        this.setState({fls:fls});
      },
      error: function(xhr, status, err){
        console.error(url,status,err.toString());
      }
    });
  }

  componentDidMount() {
    this._loadFLS()
  }

  render() {
    var fiches = this.state.fls.map(f => {
      const title = "Fiche n°" + f.id
      return (
        <Paper className="fiche" key={f.id}>
        <Card>
          <CardHeader
            title={title}
          />
          <CardText>Boîte : {f.boxname}</CardText>
          <CardText>Instrument : {f.instrumentname}</CardText>
          <CardText>Raison : {f.reason}</CardText>
          <CardText>Interloculteur : {f.interlocutor}</CardText>
          <CardText>Date aller : {moment.unix(f.dategoing).format("DD/MM/YYYY")}</CardText>
          <CardText>Commentaire aller : {f.commentgoing}</CardText>
          <CardText>Date retour : {moment.unix(f.datecoming).format("DD/MM/YYYY")}</CardText>
          <CardText>Commentaire retour : {f.commentcoming}</CardText>

        </Card>
        </Paper>
      );
    })
    return (
      <div>
        {fiches}
      </div>
    )

  }



}

export default FLSView;
