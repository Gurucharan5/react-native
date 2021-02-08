import React,{ Component } from 'react'
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

import AddCompany from './AddCompany'
class DashboardScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      openForm:false,
    };
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/companies/get')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ companies: data }) });
  }
  openAddNewCompany=()=>{
    this.setState({openForm:!this.state.openForm})
  }
  submitHandler=(data,update)=>{
    var company={
      name:data.name,
      id:data.id
    }
    let url=update?'http://localhost:3000/api/v1/companies/update':'http://localhost:3000/api/v1/companies/create'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(company),
    }).then(()=>{
      fetch('http://localhost:3000/api/v1/companies/get')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ companies: data,editId:null,editedvalue:""}) });
    })
  }
  deleteHandler=(id)=>{
    fetch('http://localhost:3000/api/v1/companies/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id:id}),
    }).then(()=>{
      fetch('http://localhost:3000/api/v1/companies/get')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ companies: data,editId:null,editedvalue:""}) });
    })
  }


  render(){

    let style={
      width:"150px",
      display:'inline-block',
      padding:'5px 10px',
      margin:'5px 10px'
    }

    return(
      <div>
        <h2>NEW COMPANY</h2>
          <button onClick={this.openAddNewCompany}>Add Company</button>

         {this.state.openForm?<AddCompany  submitHandler={this.submitHandler} />:null}
          <h2>COMPANIES LIST</h2>
      
          <ul>{this.state.companies.map((c)=>{
            return <h4   key={c.u_id}>{this.state.editId!==c.u_id?<div><span style={style}>{c.name}</span> <button  style={style} onClick={()=> this.deleteHandler(c.u_id)}>Delete</button>
            <button  style={style}  onClick={()=>this.setState({editId:this.state.editId==c.u_id?null:c.u_id,editedvalue:this.state.editId==c.u_id?"":c.name})}>Edit</button></div>:
            <div>
              <input  style={style} value={this.state.editedvalue} onChange={(e)=>this.setState({editedvalue:e.target.value})} defaultValue={c.name}  placeholder='Edit company name'/>
              <button  style={style} onClick={()=> this.submitHandler({name:this.state.editedvalue,id:c.u_id},true)} >Update</button>
              <button  style={style}  onClick={()=>this.setState({editId:this.state.editId==c.id?null:c.id,editedvalue:""})}>Edit</button>
            </div>}
            </h4>

          })}</ul>
      </div>
    )


  }



}

export default DashboardScreen
