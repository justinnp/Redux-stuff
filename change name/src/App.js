import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { updateUser, apiRequest } from './Actions/userActions';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  onUpdateUser(e){
    this.props.onUpdateUser(e.target.value);
  }

  render() {
    return (
      <div className="App">
        <input onChange={this.onUpdateUser}/>
        {this.props.user}
      </div>
    );
  }
}

//if not using reselect
//////////////////////////////
//mapStateToProps recieves state of the store, use state to decide what props to use for this component
// const mapStateToProps = (state, props) => {
//   console.log(props);
//   return{
//     products: state.products,
//     user: state.user,
//     userPlusProp: `${state.user} ${props.random}`
//   }
// };


//if using reselect
////////////////////////////////////
// Selectors can compute derived data, allowing Redux to store the minimal possible state.
// Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
// Selectors are composable. They can be used as input to other selectors.
/////////////////////////////////////
//sub selectors
//selectors are composable
//smaller selectors for better speed and performance
//if smaller selectors arent changing, they are not re computing
const productsSelector = createSelector(
// arg     return
  state => state.products,
  products => products
);
const userSelector = createSelector(
  state => state.user,
  user => user
)

const mapStateToProps = createSelector(
  productsSelector,
  userSelector,
  (products, user) => ({
    products,
    user
  })
);

//mapActionsToProps, easily dispatch actions from component, avoids using .dispatch
const mapActionsToProps = {
  onUpdateUser: updateUser,
  onApiRequest: apiRequest
}
//or
//use bind action creators when we are passing down action creators to a non-Redux component
// const mapActionsToProps = (dispatch, props) => {
//   console.log(props);
//   return bindActionCreators({
//     onUpdateUser: updateUser
//   }, dispatch);
// }


//merge props selects a slice of the props from the state and dispatch - completely optional
//propsFromState is whatever we return from mapStateToProps
//propsFromDispatch is whatever we return from mapActionsToProps
//ownProps is the passed in props
//result of mergeProps is what the component will recieve

// const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
//   console.log(propsFromState, propsFromDispatch, ownProps);
//   return{
//   };
// }

//connect the App component to the store
export default connect(mapStateToProps, mapActionsToProps)(App);


//if using mergeProps as an arg
// export default connect(mapStateToProps, mapActionsToProps, mergeProps)(App);
