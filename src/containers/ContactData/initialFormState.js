export const initFormState = {
    orderForm: {
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Name"
            },
            value: "",
            validation: {
                required: true
            },
            touched: false,
            valid: false
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Street"
            },
            value: "",
            validation: {
                required: true
            },
            touched: false,
            valid: false
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your ZipCode"
            },
            value: "",
            validation: {
                required: true,
                maxLength: 8
            },
            touched: false,
            valid: false
        },
        country: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Country"
            },
            value: "",
            validation: {
                required: true
            },
            touched: false,
            valid: false
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your Name"
            },
            value: "",
            validation: {
                required: true
            },
            touched: false,
            valid: false
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [{
                    value: "fastest", displayName: "Fastest"
                }, {
                    value: "slowest", displayName: "Slowest"
                }],
                placeholder: "Select Delivery Method"
            },
            value: "fastest",
            touched: true,
            valid: true
        },
    },
    loading: false,
    formIsValid: false
};
