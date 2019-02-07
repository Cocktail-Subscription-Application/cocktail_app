import React, { Component } from 'react'
import Register from './Register'
import Login from './Login'
import HowItWorks from './HowItWorks';
import HowItWorksCards from './HowItWorksCards'
import About from './About';
import Navbar from './Navbar'
import Cookies from 'js-cookie';
import './Parallax.css'
import logo from '../../images/logo.svg';
import MyStoreCheckout from './MyStoreCheckout'
import type {InjectedProps} from '../../src/components/inject';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  IbanElement,
  IdealBankElement,
  StripeProvider,
  Elements,
  injectStripe,
} from '../../index';
import CocktailHome from './CocktailHome'


export default class Parallax extends React.Component {
    state = {}

  render() {
    return (
       <div>
<div id="cocktailparallax">
  
<section>
    <div class="parallax-one">
      <h2 className="parallax-h2"><img class='logo' src={logo}/></h2>
    </div>
</section>

<section>
  <div class="block">
  <About />
    <p class="line-break margin-top-10"></p>
    <p class="margin-top-10"></p>
  </div>
</section>

<section>
    <div class="parallax-two">
    <h2><HowItWorksCards/></h2>
    </div>
</section>

<section>
  <div class="block">
  <HowItWorks/> 
    </div>
</section>

<section>
  <div class="parallax-cocktail">
  </div>
</section>
<section>
  <div class="block">
    <p class="line-break margin-top-10"></p>
    <h3 className="sub">CURRENT OFFER</h3>
    <p class="margin-top-10">cocktail cards</p>
  </div>
</section>

{/* <section>
  <div class="block">
    <p><span class="first-character ny">B</span>reaking into the New York fashion world is no easy task. But by the early 2000's, UGG Australia began to take it by storm. ion was popping up all over the world and UGG was now perfectly aligned with this movement.</p>
    <p class="line-break margin-top-10"></p>
    <p class="margin-top-10">Fueled by celebrities from coast to coast wearing UGG boots and slippers on then fashion shoots from coast to coast. Before long, the love spread even further.</p>
  </div>
</section> */}

<section>
  <div class="block">
    <p class="line-break margin-top-10"></p>
    <h3 className="sub">Register now to receive your first box</h3>
    <p class="margin-top-10">Join with us now to receive your complimentary gift.</p>
  </div>
</section>

{/* <section>
  <div class="parallax-gift">
  insert free gift photo
  </div>
</section> */}



<section>
  <div class="parallax-reg">
          <CocktailHome/>
          {!this.props.token && <Register {...this.props}/>}
<h2 className="sub">Already have an account?</h2>
    <hr/>
          <Login {...this.props}/>
      {/* <CreateCocktail /> */}
  </div>
</section>

  
</div>
        </div>

    )
  }
}
