import React, { Component } from "react";

export class DisplayPanel extends Component {
  static propTypes = {};

  render() {
    let {
      display,
      clearDisplay,
      handleClick,
      operators,
      evaluate,
      decimalPeriod,
      cancel
    } = this.props;
    return (
      <div className="mainBoard">
        <div className="pgt-display">
          <input
            id="display"
            type="text"
            value={display}
            disabled
            maxLength="10"
          />
        </div>

        <div className="pgt_number_board">
          <div
            className="pgt-board pgt-number"
            id="clear"
            onClick={clearDisplay}
          >
            AC
          </div>
          <div className="pgt-board pgt_operator" id="cancel" onClick={cancel}>
            CE
          </div>
          <div
            className="pgt-board pgt_operator"
            id="divide"
            onClick={operators}
          >
            /
          </div>
          <div
            className="pgt-board pgt-number"
            id="seven"
            onClick={handleClick}
          >
            7
          </div>
          <div
            className="pgt-board pgt-number"
            id="eight"
            onClick={handleClick}
          >
            8
          </div>
          <div className="pgt-board pgt-number" id="nine" onClick={handleClick}>
            9
          </div>
          <div
            className="pgt-board pgt_operator"
            id="multiply"
            onClick={operators}
          >
            *
          </div>
          <div className="pgt-board pgt-number" id="four" onClick={handleClick}>
            4
          </div>
          <div className="pgt-board pgt-number" id="five" onClick={handleClick}>
            5
          </div>
          <div className="pgt-board pgt-number" id="six" onClick={handleClick}>
            6
          </div>
          <div
            className="pgt-board pgt_operator"
            id="subtract"
            onClick={operators}
          >
            -
          </div>
          <div className="pgt-board pgt-number" id="one" onClick={handleClick}>
            1
          </div>
          <div className="pgt-board pgt-number" id="two" onClick={handleClick}>
            2
          </div>
          <div
            className="pgt-board pgt-number"
            id="three"
            onClick={handleClick}
          >
            3
          </div>

          <div className="pgt-board pgt_operator" id="add" onClick={operators}>
            +
          </div>
          <div className="pgt-board pgt-number" id="zero" onClick={handleClick}>
            0
          </div>
          <div
            className="pgt-board pgt-number"
            id="decimal"
            onClick={decimalPeriod}
          >
            .
          </div>

          <div
            className="pgt-board pgt_operator"
            id="equals"
            onClick={evaluate}
          >
            =
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayPanel;
