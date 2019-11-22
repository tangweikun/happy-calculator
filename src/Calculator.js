import React, { useState, useEffect } from "react";
import "./Calculator.css";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorKey } from "./CalculatorKey";

const CalculatorOperations = {
  "/": (prevValue, nextValue) => prevValue / nextValue,
  "*": (prevValue, nextValue) => prevValue * nextValue,
  "+": (prevValue, nextValue) => prevValue + nextValue,
  "-": (prevValue, nextValue) => prevValue - nextValue,
  "=": (_, nextValue) => nextValue
};

const numberKeys = Array.from({ length: 9 }, (_, index) => index + 1);

export function Calculator() {
  const [value, setValue] = useState(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const clearDisplayFoo = displayValue !== "0";
  const clearText = clearDisplayFoo ? "C" : "AC";

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", this.handleKeyDown);
    };
  }, []);

  function clearAll() {
    setValue(null);
    setDisplayValue("0");
    setOperator(null);
    setWaitingForOperand(false);
  }

  function clearDisplay() {
    setDisplayValue("0");
  }

  function clearLastChar() {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || "0");
  }

  function toggleSign() {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  }

  function inputPercent() {
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;
    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  }

  function inputDot() {
    if (!/\./.test(displayValue)) {
      setDisplayValue(displayValue + ".");
      setWaitingForOperand(false);
    }
  }

  function inputDigit(digit) {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
  }

  function performOperation(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);
      setValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }

  function handleKeyDown(event) {
    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(parseInt(key, 10));
    } else if (key in CalculatorOperations) {
      event.preventDefault();
      performOperation(key);
    } else if (key === ".") {
      event.preventDefault();
      inputDot();
    } else if (key === "%") {
      event.preventDefault();
      inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      clearLastChar();
    } else if (key === "Clear") {
      event.preventDefault();

      if (displayValue !== "0") {
        clearDisplay();
      } else {
        clearAll();
      }
    }
  }

  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey
              onPress={() => (clearDisplayFoo ? clearDisplay() : clearAll())}
              text={clearText}
            />
            <CalculatorKey text="±" onPress={() => toggleSign()} />
            <CalculatorKey text="%" onPress={() => inputPercent()} />
          </div>

          <div className="digit-keys">
            <CalculatorKey
              className="key-0"
              onPress={() => inputDigit(0)}
              text="0"
            />
            <CalculatorKey
              className="key-dot"
              onPress={() => inputDot()}
              text="●"
            />
            {numberKeys.map(n => (
              <CalculatorKey key={n} onPress={() => inputDigit(n)} text={n} />
            ))}
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey text="÷" onPress={() => performOperation("/")} />

          <CalculatorKey text="×" onPress={() => performOperation("*")} />

          <CalculatorKey text="-" onPress={() => performOperation("-")} />

          <CalculatorKey text="+" onPress={() => performOperation("+")} />

          <CalculatorKey text="=" onPress={() => performOperation("=")} />
        </div>
      </div>
    </div>
  );
}
