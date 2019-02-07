import React from 'react';

import Admin from './components/protected/Admin/Admin'
import UserProfile from './components/protected/Users/UserProfile'

import Home from './components/public/Home'
import Faqs from './components/public/Faqs'
import Terms from './components/public/Terms'
import Navbar from './components/public/Navbar'
import Footer from './components/public/Footer'
import Privacy from './components/public/Privacy'
import WhoWeAre from './components/public/WhoWeAre'
import ContactUs from './components/public/ContactUs'
import LiquorLicence from './components/public/LiquorLicence'

import { Route , Switch } from 'react-router-dom'
import axios from 'axios'

import Cocktail from './components/protected/Cocktail.js'
import CreateCocktail from './components/protected/CreateCocktail'

import './App.css';
import Cookies from 'js-cookie';

require('dotenv').config()

class App extends React.Component {

  state = {
    loggedIn: false
  }

  componentDidMount() {
    const token = Cookies.get('token')
    const url = 'http://localhost:5000/me'

    if (token) { 
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then ( resp => {
        const { admin } = resp.data
        this.setState({token, admin, loggedIn: true})
      })
      .catch( err => console.log(err) )
    }
  }

  setToken = (token) => {
    this.setState({token: token, loggedIn: true})
    // console.log("This is from App " + this.state.token)
  }

  clearToken = () => {
    this.setState({token: null, loggedIn: false, admin: false})
  }

  setAdmin = (isAdmin) =>{
    this.setState({admin: isAdmin})
  }

  render() {
    return (
        <div className="App">
          <div className="Main">
          {/* {!this.state.admin && <Navbar token={this.state.token} clearToken={this.clearToken} adminStatus={this.state.admin}/>} */}

            <Navbar token={this.state.token} clearToken={this.clearToken} adminStatus={this.state.admin}/>
            <Switch>
              <Route
                exact path="/"
                render={(props) => <Home {...props} setToken={this.setToken} clearToken={this.clearToken} token={this.state.token} setAdmin={this.setAdmin}/> }
              />

              {this.state.token && !this.state.admin && (<Route
                exact path="/UserProfile"
                render={(props) => <UserProfile {...props} loggedIn={this.state.loggedIn} Token={this.setToken} token={this.state.token}  clearToken={this.clearToken} setAdmin={this.setAdmin} admin={this.state.admin}/>}
              />)}

             <Route
                exact path="/Admin"
                render={(props) => <Admin {...props} setToken={this.setToken} token={this.state.token}  clearToken={this.clearToken} setAdmin={this.setAdmin} admin={this.state.admin}/>}
              />
              <Route
                exact path="/admin/cocktails"
                render={(props) => <CreateCocktail {...props} setToken={this.setToken} token={this.state.token}  clearToken={this.clearToken} setAdmin={this.setAdmin} admin={this.state.admin}/>}
              />
              <Route exact path="/admin/cocktail/:title" component={Cocktail}
              />
              <Route path="/who_we_are" component={WhoWeAre} exact/>
              <Route path="/terms" component={Terms} exact/>
              <Route path="/privacy" component={Privacy} exact/>
              <Route path="/liquor_licence" component={LiquorLicence} exact/>
              <Route path="/faqs" component={Faqs} exact/>
              <Route path="/contact_us" component={ContactUs} exact/>
              
            </Switch>
          </div>

          {!this.state.admin && <Footer />}
        </div>
    )}
    
  }


export default App;








// import React from 'react';
// import './App.css';
// import Footer from './components/public/Footer'
// import Admin from './components/protected/Admin/Admin'
// import UserProfile from './components/protected/Users/UserProfile'
// import Home from './components/public/Home'
// import ContactUs from './components/public/ContactUs'
// import Faqs from './components/public/Faqs'
// import LiquorLicence from './components/public/LiquorLicence'
// import Privacy from './components/public/Privacy'
// import Terms from './components/public/Terms'
// import WhoWeAre from './components/public/WhoWeAre'
// import { Route , Switch } from 'react-router-dom'
// import Cookies from 'js-cookie';
// import Navbar from './components/public/Navbar'
// import axios from 'axios'
// require('dotenv').config()

// class App extends React.Component {


//   state = {}


//   componentDidMount(){
//     const token = Cookies.get('token')
//     this.setState({token})
//     console.log("App.js component mounted "+ token)
//   }

//   componentDidMount(){
//     const token = Cookies.get('token')
//     this.setState({token})
//     // console.log("App.js component mounted "+ token)
//     // if(token)

//   state = {
//     loggedIn: false
//   }

//   componentDidMount() {
//     const token = Cookies.get('token')
//     const url = 'http://localhost:5000/me'

//     if (token) { 
//       axios.get(url, {
//         headers: {
//           'Authorization': `bearer ${token}`
//         }
//       })
//       .then ( resp => {
//         const { admin } = resp.data
//         this.setState({token, admin, loggedIn: true})
//       })
//       .catch( err => console.log(err) )
//     }
//   }

//   setToken = (token) => {
//     this.setState({token: token})
//     // console.log("This is from App " + this.state.token)
//   }

//   clearToken = () => {
//     this.setState({token: null})
//   }

//   setToken = (token) => {
//     this.setState({token: token, loggedIn: true})
//     // console.log("This is from App " + this.state.token)
//   }

//   clearToken = () => {
//     this.setState({token: null, loggedIn: false})
//   }


//   setAdmin = (isAdmin) =>{
//     this.setState({admin: isAdmin})
//   }
//   }

//   render() {
//     return (
//         <div className="App">
//           <div className="Main">

//             <Navbar token={this.state.token} clearToken={this.clearToken}/>
//             <Switch>
//               <Route
//                 exact path="/" component={Home}
//                 render={(props) => <Home {...props} setToken={this.setToken} clearToken={this.clearToken} token={this.state.token}/>}
//               />
//               <Route
//                 exact path="/UserProfile" component={UserProfile}
//                 render={(props) => <UserProfile {...props} setToken={this.setToken} token={this.state.token}  clearToken={this.clearToken} />}
//               /> 
//               {/* <Switch/> */}
//               {/* I added the above closing tags here - is this right? */}
//           {!this.state.admin && <Navbar token={this.state.token} clearToken={this.clearToken} adminStatus={this.state.admin}/>} 

//             <Navbar token={this.state.token} clearToken={this.clearToken} adminStatus={this.state.admin}/>
//             {/* <Switch> */}
//               <Route
//                 exact path="/"
//                 render={(props) => <Home {...props} setToken={this.setToken} clearToken={this.clearToken} token={this.state.token} setAdmin={this.setAdmin}/> }
//               />)

//               {this.state.token && !this.state.admin && (<Route
//                 exact path="/UserProfile"
//                 render={(props) => <UserProfile {...props} loggedIn={this.state.loggedIn} Token={this.setToken} token={this.state.token}  clearToken={this.clearToken} setAdmin={this.setAdmin} admin={this.state.admin}/>}
//               />)}

//              <Route
//                 exact path="/Admin"
//                 render={(props) => <Admin {...props} setToken={this.setToken} token={this.state.token}  clearToken={this.clearToken} setAdmin={this.setAdmin} admin={this.state.admin}/>}

//               />

//               <Route path="/who_we_are" component={WhoWeAre} exact/>
//               <Route path="/terms" component={Terms} exact/>
//               <Route path="/privacy" component={Privacy} exact/>
//               <Route path="/liquor_licence" component={LiquorLicence} exact/>
//               <Route path="/faqs" component={Faqs} exact/>
//               <Route path="/contact_us" component={ContactUs} exact/>
//             </Switch>
//           </div>

//           {!this.state.admin && <Footer />}
//         </div>
        
      
//     );
//   }
// }

// export default App;