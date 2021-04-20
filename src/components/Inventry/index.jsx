import InventryList from './InventryList';
import AddInventry from './forms/AddInventry';
import React, { Fragment, PureComponent } from 'react';

function Inventry(props) {
  console.log('i am i coming ')
  console.log(props)
  const {
    match: {
      params: { pageName },
    },
  } = props
  console.log(pageName)
  console.log(props)
  switch (pageName) {
    case 'list':
      return <InventryList {...props} />
    case 'upload':
      return (
        <AddInventry
          props={props}
          formType={'add'}
          history={props.history}
        />
      )
    case 'edit':
      return (
        <AddInventry
          editstate={props.location.editstate}
          history={props.history}
          formType={'edit'}
        />
      )
    default:
      return <InventryList />
  }
}
