import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Cocktail extends Component {
  state = {edit: false, available: null, availabilityMonth:''}
  componentDidMount(){
    console.log("Cocktail.js mounted")
    const { title } = this.props.match.params
    // this.setState({title})
    const url = `http://localhost:5000/admin/cocktail/${title}`
    const token = Cookies.get('token')
    axios.get(url, {
        headers: {
        'Authorization': `bearer ${token}`
        }
    })
    .then( resp => {
        const cocktail = resp.data
        console.log(cocktail)
        this.setState({cocktail,available: cocktail.available, availabilityMonth: cocktail.availabilityMonth})
    })
    .catch( err => {
      console.log(err)
    })
  }

  handleEdit = () => {
    this.setState({edit: true})
  }
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
    // const available = e.currentTarget.value
    // console.log(e.currentTarget.value)
    // this.setState({ available })
    // console.log(`this is ${JSON.stringify(this.state)}`)
  }

  handleSubmit = () => {
    const { title } = this.props.match.params
    const url = `http://localhost:5000/admin/cocktail/edit/${title}`
    const token = Cookies.get('token')
    const available = this.state.available
    const availabilityMonth = this.state.availabilityMonth
    const data = { available, availabilityMonth}
    console.log(available, availabilityMonth)
    axios.patch(url, data, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then( resp => {
      this.setState({cocktail: resp.data, edit: false})
    })
    .catch( err => {
      this.setState({error: JSON.stringify(err.response.data), status:JSON.stringify(err.response.status)})
    })
  }

  render() {
      if(this.state.cocktail){
        return(
          <div>
            <h1>{this.state.cocktail.title}</h1>
              <li>Title: {this.state.cocktail.title}</li>
              <li> <img style={{height:"220px"}} src={this.state.cocktail.photo}/></li>
              { this.state.cocktail.available && <li style={{color:"green"}}><h3>Available: {`${this.state.availabilityMonth}`}</h3></li> }
              { !this.state.cocktail.available && <li style={{color:"red"}}><h3>Not Available</h3></li> }
              <li>Description: {this.state.cocktail.description}</li>
              <li>Direction: {this.state.cocktail.directions}</li>
              <li>Ingredients: {this.state.cocktail.ingredients}</li>
              {!this.state.edit && <button onClick={this.handleEdit}>Change Availability</button>}
              {this.state.edit && 
              <div>
                <label htmlFor="Availability">Availability </label>
                <select defaultValue={this.state.available} type="boolean" id="available" onChange={this.handleInputChange}> 
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select><br/>
                <select defaultValue={this.state.availabilityMonth} type="text" id="availabilityMonth" onChange={this.handleInputChange}> 
                  <option value="this month">This Month</option>
                  <option value="next month">Next Month</option>
                </select>
                <button onClick={this.handleSubmit}>Submit</button>
              </div>
              }
          </div>
        )
      }
     else {
       return (
        <div>
          <h1>SORRY</h1>
          <h2>Admin Previleges Required</h2>
        </div>
      )
     }
  }
}