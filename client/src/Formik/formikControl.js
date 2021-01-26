import Input from './input'

const FormikControl = ({ control, ...rest } ) => {
    switch (control) {
      case 'input':
        return <Input {...rest} />
      default:
        return null
    }
  }
  
  export default FormikControl