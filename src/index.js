import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, HashRouter as Router, Switch,Redirect } from 'react-router-dom';
import Home from './components/Home';
import { Navbar, Nav, Button, Container} from 'react-bootstrap';
import NotFound from './components/NotFound';
import Login from './components/authorization/Login';
import {logout} from './services/auth';
import Artikli from './components/artikli/Artikli';
import AddArtikli from './components/artikli/AddArtikli';
import EditArtikal from './components/artikli/EditArtikal';
import AddPrijem from './components/prijem/Prijem';

class App extends React.Component {

  render() {
      const jwt = window.localStorage['jwt'];

      if(jwt){
          return (
          <div>
              <Router>
                  <Navbar expand bg="dark" variant="dark">
                      <Navbar.Brand as={Link} to="/">
                          MAGACIN
                      </Navbar.Brand>
                      <Navbar.Brand as={Link} to="/artikli">
                        Artikli
                      </Navbar.Brand>
                      <Nav>
                      <Button onClick={()=>logout()}>Logout</Button>:
                      </Nav>
                  </Navbar>
                  <Container style={{paddingTop:"10px"}}>
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/login" render={()=><Redirect to="/"/>} />
                     <Route exact path="/artikli" component={Artikli} />
                     <Route exact path="/artikli/add" component={AddArtikli}/>
                     <Route exact path="/artikli/edit/:id" component={EditArtikal}/>
                     <Route exact path="/prijem/add/:id" component={AddPrijem}/>
                      <Route component={NotFound} />
                  </Switch>
              </Container>
              </Router>
          </div>
      );
      }else{
          return( <Container>
              <Router>
                <Switch>
                  <Route exact path="/login" component={Login}/>
                  <Route render={()=> <Redirect to = "/login"/>}/>
                </Switch>
              </Router>
            </Container>);
      }
  }
};


ReactDOM.render(
  <App/>,
  document.querySelector('#root')
);
