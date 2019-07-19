import React, { Component } from "react";
import "./App.css";
import "./Main.css";
import n2d from "./n2d.png";
import Footer from "./components/Footer";
import DisplayPanel from "./components/DisplayPanel";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 0,
      operatorFlag: false,
      decimalFlag: false
    };

    this.initialize = this.initialize.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.operators = this.operators.bind(this);
    this.decimalPeriod = this.decimalPeriod.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  //Clear set all the parameters to default
  initialize() {
    this.setState({
      display: 0,
      operator: ["*", "+", "-", "/"],
      operatorFlag: false,
      decimalFlag: false
    });
  }

  cancel() {
    let { display } = this.state;
    let value = String(display);
    this.setState({
      display: value.slice(0, -1),
      operatorFlag: false
    });
  }
  handleClick(e) {
    let value = e.target.innerText;
    let { display } = this.state;

    let input = 0;
    input += parseFloat(value);
    //replacing default value zero with enter value
    this.setState({
      display: display === 0 || display === "error" ? input : display + value,
      operatorFlag: false
    });
  }

  operators(e) {
    let value = e.target.innerText;
    let { display, operatorFlag } = this.state;
    //Allowing only minus sign to be enter
    //if default value zero
    if (value === "-" && display === 0) {
      this.setState({
        display: value,
        operatorFlag: true
      });
    }
    //decimal is getting replace
    //if display last character  is . then operator is not allowed
    if (display !== 0) {
      this.setState({
        display: display + value,
        operatorFlag: true,
        decimalFlag: false
      });
    }

    if (operatorFlag) {
      let newValue = String(display);
      newValue = newValue.slice(0, display.length - 1);
      this.setState({
        display: newValue + value,
        operatorFlag: true
      });
    }
  }

  decimalPeriod(e) {
    let value = e.target.innerText;
    let { display, decimalFlag } = this.state;
    if (!decimalFlag) {
      this.setState({
        display: display + value,
        decimalFlag: true,
        operatorFlag: true
      });
    }
  }

  evaluate() {
    //Assign to display linearEq(immutalbe)
    let linearEq = this.state.display;

    //getting last charter from display
    let lastChar = linearEq[linearEq.length - 1];

    //operator sign present in display
    let operator = ["*", "+", "-", "/"];

    //check if wrong input is given
    //"1+-2" Or 1+2--
    if (linearEq.match(/\D{2,}/)) {
      this.setState({
        display: "error",
        decimalFlag: true
      });
    }

    //Checking if display last character is operator or period
    //if operator or period exist then remove it.
    else if (operator.indexOf(lastChar) > -1 || lastChar === ".") {
      linearEq = linearEq.replace(/.$/, "");
      this.setState({
        //using eval to calculate
        display: eval(linearEq),
        decimalFlag: true
      });
    } else {
      this.setState({
        display: eval(linearEq)
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={n2d} className="App-logo" alt="logo" />
        </div>
        <div className="pgt_calculation_panel">
          <DisplayPanel
            display={this.state.display}
            textChange={this.textChange}
            handleClick={this.handleClick}
            clearDisplay={this.initialize}
            evaluate={this.evaluate}
            operators={this.operators}
            decimalPeriod={this.decimalPeriod}
            cancel={this.cancel}
          />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
