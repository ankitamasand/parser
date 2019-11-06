import React, { Component } from "react";
import { BETWEEN, INQ } from "./constants";

const isValid = tokens => {
  /* Checking if each of the tokens are a key-value pair */
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].indexOf(":") === -1) {
      return false;
    }

    const [key, value] = tokens[i].split(":");
    if (!key || !value) {
      return false;
    }
  }
  return true;
};

const getValue = value => {
  if (value.indexOf(BETWEEN) >= 0) {
    const fromToDates = value.split(BETWEEN).map(d => new Date(d));
    return { between: fromToDates };
  }

  if (value.indexOf(INQ) >= 0) {
    const inqArr = value.split(INQ);
    return { inq: inqArr };
  }

  return { eq: value };
};

class Parser extends Component {
  state = {
    input: "",
    jsonOutput: {}
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  parseString = e => {
    e.preventDefault();
    const { input } = this.state;
    const tokens = input.split(",");

    if (!isValid(tokens)) {
      console.log("invalid string");
      return null;
    }

    const result = {
      and: {}
    };

    tokens.forEach(t => {
      const [key, value] = t.split(":");
      result.and[key] = getValue(value);
    });

    console.log("result", result);
    this.setState({ jsonOutput: result });
  };

  render() {
    let { input, jsonOutput } = this.state;
    let jsonStr = JSON.stringify(jsonOutput);
    return (
      <div>
        <input
          type="text"
          value={input}
          onChange={this.onInputChange}
          placeholder="Enter String here"
        />
        <button type="submit" onClick={this.parseString}>
          Submit
        </button>
        {jsonStr.length > 2 ? (
          <div>
            JSON output: <br /> {jsonStr}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Parser;
