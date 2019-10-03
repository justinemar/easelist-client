import React from "react";

export default class Validation extends React.PureComponent {
  state = {
    validations: {
      email: null,
      password: null,
      confirm_password: null
    },
    figures: {
      password: ""
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.formProps.toValidate !== this.props.formProps.toValidate) {
      this.validate(this.props.formProps);
    }
  }

  _isValidMail(toValidate) {
    let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(toValidate);
  }

  _isValidPassword(toValidate) {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return reg.test(toValidate);
  }

  validate(formProps) {
    const { field, toValidate } = formProps;
    const {
      figures: { password },
      validations
    } = this.state;

    if (field === "email") {
      if (!this._isValidMail(toValidate)) {
        this.setState({
          validations: {
            ...validations,
            email: `${field} is not a valid email`
          }
        });

        return;
      } else {
        this.setState({
          validations: {
            ...validations,
            email: null
          }
        });

        return;
      }
    }

    if (field === "password") {
      this.setState({
        figures: {
          password: toValidate
        }
      });

      if (!this._isValidPassword(toValidate)) {
        this.setState({
          figures: {
            password: toValidate
          },
          validations: {
            ...validations,
            password: `${field} must contain at least 8 characters 
                                    contain at least 1 number 
                                    contain at least 1 lowercase character (a-z) 
                                    contain at least 1 uppercase character (A-Z) 
                                    contains only 0-9a-zA-Z`
          }
        });

        return;
      } else {
        this.setState({
          figures: {
            password: toValidate
          },
          validations: {
            ...validations,
            password: null
          }
        });

        return;
      }
    }

    if (field === "confirm_password" && toValidate !== password) {
      this.setState({
        validations: {
          ...validations,
          confirm_password: "password is not the same"
        }
      });

      return;
    } else {
      this.setState({
        validations: {
          ...validations,
          confirm_password: null
        }
      });
    }
  }

  render() {
    return <Errors errors={this.state.validations} />;
  }
}

const Errors = ({ errors }) =>
  Object.values(errors).map((val, key) => {
    if (val === null || val === undefined) {
      return null;
    }
    return (
      // eslint-disable-next-line react/no-array-index-key
      <li className="has-text-danger">{val}</li>
    );
  });
