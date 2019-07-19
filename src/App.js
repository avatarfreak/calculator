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

  //cancel button to delete last character
  cancel() {
    let { display } = this.state;
    let value = String(display);
    this.setState({
      display: display === "error" ? 0 : value.slice(0, -1),
      operatorFlag: false
    });
  }

  //handle all  digits
  handleClick(e) {
    let value = e.target.innerText;
    let { display } = this.state;

    let input = 0;
    //parsing string to number in order
    //adding mutiples of '0000' will show 0
    input += parseFloat(value);

    //replacing default value zero with enter value
    this.setState({
      display: display === 0 || display === "error" ? input : display + value,
      operatorFlag: false
    });
  }

  operators(e) {
    //+ - / *
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

    if (display !== 0) {
      this.setState({
        display: display + value,
        operatorFlag: true,
        decimalFlag: false
      });
    }

    if (operatorFlag) {
      let newValue = String(display);
      //replacing old operator with new one
      // "1+3+" to "1+3*"
      newValue = newValue.slice(0, display.length - 1);
      this.setState({
        display: newValue + value,
        operatorFlag: true
      });
    }
  }

  decimalPeriod(e) {
    let value = e.target.innerText;
    //destructing
    let { display, decimalFlag } = this.state;
    //placing decimal in display
    if (!decimalFlag) {
      this.setState({
        display: display + value,
        decimalFlag: true,
        operatorFlag: true
      });
    }
  }

  evaluate() {
    //destructing
    let { display } = this.state;

    //Assigning to newEq as String for eval()
    let newEq = String(display);

    //check if two or more operaters in series
    //if found update it as error
    //Invalid: "1+3+-/2"
    if (newEq.match(/\D{2,}/)) {
      newEq = "error";

      this.setState({
        display: newEq,
        decimalFlag: true
      });
      return;
    }
    //check if last character is not digit
    //if found then replace it empty space
    //Eg: "1+3-3+" convert to "1+3-3"
    if (newEq.match(/[\D]$/)) {
      newEq = display.replace(/.$/, "");
    } else {
      newEq = display;
    }

    if (newEq) {
      this.setState({
        display: eval(newEq),
        decimalFlag: true
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
