import React from 'react'
import { Field} from 'formik'


function Input (props) {
  const { label, name, icon, ...rest } = props
  return (
    <React.Fragment>
      <Field id={name} name={name} {...rest}/>
     
      </React.Fragment>
  )
}

export default Input
