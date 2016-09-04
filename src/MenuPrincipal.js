import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router'

class MenuPrincipal extends Component {

  render() {
    return(
      <List>
          <Link to="/listing"> <ListItem primaryText="Listing" /></Link>
          <Link to="/instruments"> <ListItem primaryText="Instruments"/></Link>
      </List>
    );
  }
}

export default MenuPrincipal;
