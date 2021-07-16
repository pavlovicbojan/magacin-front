import React from 'react';
import DevelopingAxios from './../../apis/DevelopingAxios';
import {Form, Button, Table, Row, Col } from 'react-bootstrap'

class AddArtikli extends React.Component{

    constructor(props) {
        super(props);

        const newArtikal = {
            naziv: "",
            pakovanje: 0,
            jedinicaMere: 0,
            magacinDTO: {
                id: 0
             }
         }
   
            
        
        this.state = {
            newArtikal: newArtikal,
            magacini:[]
        }
    }

    componentDidMount(){
        this.getMagacini()
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

    // handleChange(event){
    //     const name = event.target.name;
    //     const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    //     this.setState(
    //       {
    //         [name]: value
    //       })
      
    //   }

    onInputChange(event){
        const name = event.target.name;
        const value = event.target.value
        let newArtikal = JSON.parse(JSON.stringify(this.state.newArtikal));
        newArtikal[name] = value;
        
        this.setState({newArtikal : newArtikal})
    }

    onSelectMagacin(e){
      
        console.log(e);

       let magacinId = e.target.value;

       let newArtikal = this.state.newArtikal;
       newArtikal.magacinDTO.id = magacinId;

       this.setState({newArtikal: newArtikal});
}

    postArtikal(){

        
         var params= {
                naziv: this.state.newArtikal.naziv,
                pakovanje: this.state.newArtikal.pakovanje,
                jedinicaMere: this.state.newArtikal.jedinicaMere,
                magacinDTO:{
                    id: this.state.newArtikal.magacinDTO.id
                }
            }
        

        DevelopingAxios.post('/artikli', params)
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
                 <Button onClick={() => this.postArtikal() }>Add</Button>
                    <br/><br/>

                    <Form>
                    <Row><Col>
                    <Form.Group>
                        <Form.Label>Naziv</Form.Label>
                        <Form.Control 
                            value={this.state.newArtikal.naziv}
                            name="naziv"
                            as="input"
                            type="text"
                            onChange={(e)=>this.onInputChange(e)}></Form.Control>
                    </Form.Group>
                    </Col></Row>

                    <Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Pakovanje</Form.Label>
                        <Form.Control
                            value={this.state.newArtikal.pakovanje}
                            name="pakovanje"
                            as="input"
                            type="number"
                            onChange={(e)=>this.onInputChange(e)}></Form.Control>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                        <Form.Label>Jedinica mere</Form.Label>
                        <Form.Control 
                            value={this.state.newArtikal.jedinicaMere}
                            name="jedinicaMere"
                            as="input"
                            type="text"
                            onChange={(e)=>this.onInputChange(e)}></Form.Control>
                    </Form.Group>
                    </Col>
                    </Row>

                    <Row><Col>
                    <Form.Group>
                        <Form.Label>Magacin</Form.Label>
                        <Form.Control 
                            value={this.state.newArtikal.magacinDTO.id}
                            name="magacinDTO"
                            as="select"
                            onChange={(e)=>this.onSelectMagacin(e)}>
                                <option value={-1}>Izaberi magacin</option>
                                {this.state.magacini.map((magacin) => {
                                    return (
                                    <option value={magacin.id} key={magacin.id}>
                                        {magacin.naziv}
                                    </option>
                                    );
                                })}
                            </Form.Control>
                    </Form.Group>
                    </Col></Row>
                    </Form>
            </div>
        )
    }

}
export default AddArtikli;