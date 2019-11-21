import React from "react";
import "./Calculator.css";

export function CalculatorKey(props) {
  const { onPress, className, ...rest } = props;

  return (
    <button
      onClick={onPress}
      className={`calculator-key ${className}`}
      {...rest}
    />
  );
}
