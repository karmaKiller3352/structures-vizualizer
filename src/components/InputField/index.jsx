import styled from "styled-components";
import { Input, InputNumber } from "antd";
import { useState, useCallback } from "react";
import AfterInputAddon from "../AfterInputAddon";

const InputWrapper = styled.div`
  margin-bottom: 40px;
  max-width: 240px;

  .ant-input-number-group-addon {
    padding: 0;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    .anticon {
      padding: 12px;
    }
  }
`;

const InputField = ({ afterType, onAction, placeholder, type, regX }) => {
  const [value, setValue] = useState();
  const [error, setError] = useState(false);

  const onChangeHandler = useCallback(
    (val) => {
      if (error) setError(false);

      setValue(val);
    },
    [error]
  );

  const actionHandler = useCallback(() => {
    if (String(value).match(regX)) {
      setError(true);
      return;
    }
    const success = onAction(value);

    if (success) {
      setValue("");
    } else {
      setError(true);
    }
  }, [value, regX]);

  const keyHandler = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        actionHandler();
      }
    },
    [actionHandler]
  );

  const InputComponent = type === "number" ? InputNumber : Input;

  return (
    <InputWrapper>
      <InputComponent
        size="large"
        value={value}
        aria-label="create"
        onChange={onChangeHandler}
        placeholder={placeholder}
        status={error && "error"}
        onKeyDown={keyHandler}
        addonAfter={
          <AfterInputAddon
            type={afterType}
            onClick={actionHandler}
            disabled={error}
          />
        }
      />
    </InputWrapper>
  );
};

export default InputField;
