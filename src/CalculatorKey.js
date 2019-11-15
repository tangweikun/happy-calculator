import React from "react";
import "./Calculator.css";

export class CalculatorKey extends React.Component {
  render() {
    const { onPress, className, ...props } = this.props;

    return (
      <button
        onClick={onPress}
        className={`calculator-key ${className}`}
        {...props}
      />
    );
  }
}
