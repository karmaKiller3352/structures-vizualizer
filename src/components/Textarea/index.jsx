import { Input, InputNumber } from "antd";
import { useCallback, useState } from "react";
import styled from "styled-components";
import AfterInputAddon from "../AfterInputAddon";

const FieldWrapper = styled.div`
  display: flex;
  max-width: 240px;
  margin-bottom: 40px;
  justify-content: space-between;
  background-color: #fff;
`;

const TextareaWrapper = styled.div`
  width: 200px;
  box-sizing: border-box;
`;

const AddonWrapper = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  &:hover {
    background-color: #f0f0f0;
  }

  .anticon {
    padding: 5px;
    cursor: pointer;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all 0.3s;
  }
`;

const Textarea = ({ regX, onAction }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const onChangeHandler = useCallback(
    ({ target: { value: val } }) => {
      setError(false);

      if (regX) {
        setValue(val.replace(regX, ""));
      }
    },
    [regX]
  );

  const actionHandler = useCallback(() => {
    const success = onAction(value);

    if (success) {
      setValue("");
    } else {
      setError(true);
    }
  }, [value]);

  const keyHandler = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        const success = onAction(value);

        if (success) {
          setValue("");
        } else {
          setError(true);
        }
      }
    },
    [value]
  );

  return (
    <FieldWrapper>
      <TextareaWrapper>
        <Input.TextArea
          onKeyDown={keyHandler}
          value={value}
          autoSize={{ minRows: 4 }}
          onChange={onChangeHandler}
        />
      </TextareaWrapper>

      <AddonWrapper>
        <AfterInputAddon type="add" onClick={actionHandler} />
      </AddonWrapper>
    </FieldWrapper>
  );
};

export default Textarea;
