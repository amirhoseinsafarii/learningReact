import { Component } from "react";
import React from "react";
import Input from "./input";
import * as yup from "yup";
import axios from "axios";

class Login extends Component {
  state = {
    account: {
      email: "",
      password: "",
    },
    errors: [],
    sending: false,
  };

  schema = yup.object().shape({
    email: yup
      .string()
      .email("فرمت ایمیل صحیح نمیباشد")
      .required("فیلد ایمیل الزامی است"),
    password: yup.string().min(4, "پسورد باید حداقل 4 کاراکتر باشد"),
  });

  validate = async () => {
    try {
      const result = await this.schema.validate(this.state.account, {
        abortEarly: false,
      });
      return result;
    } catch (error) {
      console.log(error.errors);
      this.setState({ errors: error.errors });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const result = await this.validate();
    console.log(result);
    if (result) {
      try {
        this.setState({ sending: true });
        const response = await axios.post(
          "https://reqres.in/api/login",
          result
        );
        localStorage.setItem("token", response.data.token);
        this.props.history.replace("/dashbord");
        this.setState({ sending: false });
        console.log(response);
      } catch (error) {
        this.setState({ sending: true });
        this.setState({ errors: ["ایمیل یا پسورد صحیح نمیباشد"] });
        this.setState({ sending: false });
      }
    }
  };

  handleChange = async (e) => {
    const input = e.currentTarget;
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
    const { email, password } = this.state.account;
    return (
      <>
        {this.state.errors.length !== 0 && (
          <div className="alert alert-danger">
            <ul>
              {this.state.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            value={email}
            name="email"
            label="email"
          />
          <Input
            onChange={this.handleChange}
            value={password}
            name="password"
            label="password"
          />
          <button disabled={this.state.sending} className="btn btn-primary">
            Login
          </button>
        </form>
      </>
    );
  }
}

export default Login;
