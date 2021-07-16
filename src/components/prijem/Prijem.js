import React from 'react';
import DevelopingAxios from './../../apis/DevelopingAxios';
import {Form, Button, Table, Row, Col } from 'react-bootstrap'

class AddPrijem extends React.Component{

    constructor(props) {
        super(props);

        const newStavkaPrijema = {
            kolicina: 0,
            jedinicnaCena: 0,
            artikalDTO: {
                id: 0,
                magacinDTO:{
                    id: 0
                }
             }
         }
   
            
        
        this.state = {
            newStavkaPrijema: newStavkaPrijema,
            artikal:{}
        }
    }

    componentDidMount(){
        this.getArtikalById(this.props.match.params.id)
    }

    getArtikalById(artikalId){
        DevelopingAxios.get('/artikli/'+ artikalId)
            .then(res=>{
                console.log(res.data)
                this.setState({artikal: res.data })
                 console.log(this.state.artikal.magacinDTO.naziv)
            })
            .catch(error=>{
                console.log(error)
            })
    }

    onInputChange(event){
        const name = event.target.name;
        const value = event.target.value
        let newStavkaPrijema = JSON.parse(JSON.stringify(this.state.newStavkaPrijema));
        newStavkaPrijema[name] = value;
        
        this.setState({newStavkaPrijema : newStavkaPrijema})
    }

    postStavkaPrijema(){

        
         var params= {
            kolicina: this.state.newStavkaPrijema.kolicina,
            jedinicnaCena: this.state.newStavkaPrijema.jedinicnaCena,
            artikalDTO: this.state.artikal
            }
        

        DevelopingAxios.post('/prijem', params)
            .then(res=>{
                console.log(res.data);
                this.props.history.push('/artikli');
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                
                    <br/><br/>

                    <Form>
                        <h1>Dodavanje artikla {this.state.artikal.naziv}</h1>
                        <Row><Col>
                    <Form.Group>
                        <Form.Label>Kolicina</Form.Label>
                        <Form.Control  
                            value={this.state.newStavkaPrijema.kolicina}
                            name="kolicina"
                            as="input"
                            type="number"
                            onChange={(e)=>this.onInputChange(e)}></Form.Control>
                    </Form.Group>
                    </Col></Row>

                    <Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Jedinicna cena</Form.Label>
                        <Form.Control
                            value={this.state.newStavkaPrijema.jedinicnaCena}
                            name="jedinicnaCena"
                            as="input"
                            type="number"
                            onChange={(e)=>this.onInputChange(e)}></Form.Control>
                    </Form.Group>
                    </Col>
                    </Row>
                    <Button onClick={() => this.postStavkaPrijema() }>Add</Button>
                   </Form>
            </div>
        )
    }

}
export default AddPrijem;