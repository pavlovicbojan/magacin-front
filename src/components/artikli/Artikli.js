import React from 'react';
import DevelopingAxios from './../../apis/DevelopingAxios';
import {Form, Button, Table, Row, Col } from 'react-bootstrap'

class Artikli extends React.Component {

    constructor(props) {
        super(props);     
        
        this.state = {
            artikli: [],
            magacini:[],
            pageNo: 0,
            totalPages: 0,
            Check: false,
            search: {
                naziv: "",
                magacinId: 0
            }
        }
    }


    componentDidMount(){
        this.getArtikli(this.state.pageNo)
        this.getMagacini()
    }

    getArtikli(newPageNo) {

        let config ={
            params: {
                pageNo: newPageNo
            }
        }
        console.log(this.state.search.naziv)
        if(this.state.search.naziv!==""){
            config.params['naziv']=this.state.search.naziv
        }
        if(this.state.search.magacinId!==-1){
            config.params['magacinId']= this.state.search.magacinId
        }
    
        DevelopingAxios.get('/artikli',config)
            .then(res => {
                 console.log(res);
                this.setState({
                    artikli: res.data,
                    totalPages: res.headers['total-pages'],
                    pageNo: newPageNo
                })
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }

    getMagacini(){
        DevelopingAxios.get('/magacin')
        .then(res => {
             console.log(res);
            this.setState({
                magacini: res.data
            })
        })
        .catch(error => {
            console.log(error);
            alert('Error occured please try again!');
        });
    }

    goToEdit(id){
        this.props.history.push('/artikli/edit/'+ id); 
    }

    delete(id){
        DevelopingAxios.delete('/artikli/'+ id)
            .then(res=>{
                console.log(res.data)
                this.myMethod()
                alert('Artikal was deleted successfully!');
            })
            .catch(error=>{
                console.log(error)
                alert('Error occured please try again!');
            })
    }

    myMethod(){
        this.getArtikli(0)
    }

    goToStavkaPrijema(id){
        this.props.history.push('/prijem/add/'+ id);
    }


    renderArtikli(){
        return this.state.artikli.map((artikal) => {
            return (
               <tr key={artikal.id}>
                  <td>{artikal.naziv}</td>
                  <td>{artikal.pakovanje}{artikal.jedinicaMere}</td>
                  <td>{artikal.kolicina}</td>
                  <td>{artikal.kalkulisanaCena}</td>
                  <td>{artikal.magacinDTO.naziv}</td>
                    {window.localStorage['role']==='ROLE_ADMIN'?
                  [<td><Button variant="info" onClick={() => this.goToStavkaPrijema(artikal.id)}> Primi</Button></td>,
                  <td> <Button variant="warning" onClick={() => this.goToEdit(artikal.id)}>Izmeni</Button> </td>,
                  <td> <Button disabled={artikal.kolicina > 0} variant="danger" onClick={() => this.delete(artikal.id)}>Obrisi</Button> </td>]:
                  null}
               </tr>
            )
         })
    }


    handleChange(event){
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState(
          {
            [name]: value
          })
      
      }

      onInputChangeSearch(event){
        const name = event.target.name;
        const value = event.target.value
        let search = JSON.parse(JSON.stringify(this.state.search));
        search[name] = value;
        
        this.setState({search : search})

        this.getArtikli(0)

    }

    onSelectMagacinForSearch(e){
      
        console.log(e);

       let magacinId = e.target.value;

       let search = this.state.search;
       search.magacinId = magacinId;

       this.setState({search: search});

       this.getArtikli(0)
}


    render(){
        return(
            <div>
                <Form>
                    <Form.Group>
                <Button onClick={ ()=>this.props.history.push('/artikli/add/')}>Dodaj artikal</Button>
                </Form.Group>
                </Form>
                
                <Form>
                        <Form.Group>
                          <Row>
                              <Col>
                             
                              <Form.Check
                              name="Check"
                               type="checkbox" 
                               label="Check for search"
                               checked={this.state.Check}
                               onChange={(e)=>this.handleChange(e)}
                               />
                                <Form.Group hidden={!this.state.Check}>
                                <Form.Label>Artikal</Form.Label>
                               <Form.Control
                                                    name="naziv"
                                                    type="text"
                                                    label="Unesi ime artikla" 
                                                    onChange={(e)=>this.onInputChangeSearch(e)}   >

                                                    </Form.Control><Form.Label>Magacin</Form.Label>
                        <Form.Control 
                            value={this.state.search.magacinId}
                            name="magacinId"
                            as="select"
                            onChange={(e)=>this.onSelectMagacinForSearch(e)}>
                                <option value={0}>Izaberi magacin</option>
                                {this.state.magacini.map((magacin) => {
                                    return (
                                    <option value={magacin.id} key={magacin.id}>
                                        {magacin.naziv}
                                    </option>
                                    );
                                })}
                            </Form.Control> <br></br> <Button onClick={()=>this.getArtikli(0)} >Search</Button>
                            </Form.Group>
                              </Col>
                              </Row>  
                        </Form.Group>
                    </Form>
                 <h1>Artikli</h1>
                 <Table  striped bordered hover style={{marginTop:5}}>
                        <thead>
                            <tr style={{backgroundColor: "black",  color:"white"}}>
                                <th>Naziv</th>
                                <th>Pakovanje</th>
                                <th>Kolicina</th>
                                <th>K Cena</th>
                                <th>Magacin</th>
                                <th>Action</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderArtikli()}
                        </tbody>                  
                    </Table>
                    <Form.Group>   
                    <Button disabled={this.state.pageNo===0} onClick={()=>this.getArtikli(this.state.pageNo-1)}>Previous</Button>
                    <Button disabled={this.state.totalPages==this.state.pageNo +1} onClick={()=>this.getArtikli(this.state.pageNo+1)}>Next</Button>
                    </Form.Group>
            </div>
        )
    }
}

export default Artikli;