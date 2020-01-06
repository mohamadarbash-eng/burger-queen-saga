import React, {Component} from "react";
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
      orderForm: {
              name: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Your Name'
                  },
                  value: '',
                  validation: {
                      required: true
                  },
                  touched: false,
                  valid: false
              },
              street: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Your Street'
                  },
                  value: '',
                  validation: {
                      required: true
                  },
                  touched: false,
                  valid: false
              },
              zipCode: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Your ZipCode'
                  },
                  value: '',
                  validation: {
                      required: true,
                      maxLength: 8
                  },
                  touched: false,
                  valid: false
              },
              country: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Your Country'
                  },
                  value: '',
                  validation: {
                      required: true
                  },
                  touched: false,
                  valid: false
              },
              email: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'email',
                      placeholder: 'Your Name'
                  },
                  value: '',
                  validation: {
                      required: true
                  },
                  touched: false,
                  valid: false
              },
              deliveryMethod: {
                  elementType: 'select',
                  elementConfig: {
                      options: [{
                          value: 'fastest', displayName: 'Fastest'
                      }, {
                          value: 'slowest', displayName: 'Slowest'
                      }],
                      placeholder: 'Select Delivery Method'
                  },
                  value: 'fastest',
                  touched: true,
                  valid: true
              },
      },
      loading: false,
      formIsValid: false

  };

  checkValidity(value, rules) {
      let isValid = true;
      if (rules && rules.required) {
         isValid = !!value && value.trim() && isValid;
      }
      if (rules && rules.maxLength) {
          isValid = value.trim().length <= rules.maxLength && isValid;
      }
      return isValid;
  }

  orderHandler = (event) => {
      event.preventDefault();
            const orderData = {};
            for (let element in this.state.orderForm) {
                orderData[element] =  this.state.orderForm[element].value;
            }
      const data = {
          ingredients: this.props.ingredients,
          totalPrice: this.props.totalPrice,
          orderData
      };
      this.setState( {loading: true});
      axiosInstance.post('/orders.json', data)
          .then((_) => {
            this.setState({loading: false});
            this.props.history.push('/');
          })
          .catch(error => {
              this.setState({loading: false});
          })


  };

  inputChangeHandler = (event, key) => {
      const {value} = event.target;

      this.setState((prevState)=> {
          const updatedForm = {
              ...prevState.orderForm
          };
          updatedForm[key].valid =  this.checkValidity(value, updatedForm[key].validation);
          updatedForm[key].touched = true;
          updatedForm[key].value = value;
          let formIsValid = true;
          for (const _key in updatedForm) {
              formIsValid = updatedForm[_key].valid && formIsValid;
          }


         return {orderForm: updatedForm, formIsValid};
      });
  };

    setTouched = (key) => {
        this.setState((prevState)=> {
            const updatedForm = {
                ...prevState.orderForm
            };
            updatedForm[key].touched = true;
            return {orderForm: updatedForm};
        });
    };

    render() {
        const orderFormArray = [];
        for (let key in this.state.orderForm) {
            orderFormArray.push({id: key, config: this.state.orderForm[key]})
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                {orderFormArray.map( element => (
                    <Input key={element.id}
                           invalid={!element.config.valid}
                           elementType={element.config.elementType}
                           value={element.config.value}
                           shouldValidate= {!!element.config.validation}
                           touched={element.config.touched}
                           setTouched={() => this.setTouched(element.id)}
                           change={(event)=> this.inputChangeHandler(event, element.id)}
                           elementConfig={element.config.elementConfig}/>
                ))}
                <Button btnType={this.state.formIsValid ? 'Success' : 'Danger'} disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form =  <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}


export default ContactData;
