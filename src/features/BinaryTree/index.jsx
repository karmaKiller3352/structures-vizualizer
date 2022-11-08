import { Button, InputNumber } from "antd";
import styled from "styled-components";
import { useState, useCallback, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import PageWithSidebar from "containers/PageWithSidebar";
import canvas from "stores/canvas";
import tree from "stores/tree";

const InputWrapper = styled.div`
  margin-bottom: 40px;

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

const InputField = ({ type, onAction, placeholder }) => {
  const [value, setValue] = useState();
  const [error, setError] = useState(false);

  const onChangeHandler = useCallback((val) => {
    setError(false);
    setValue(val);
  }, []);

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
    <InputWrapper>
      <InputNumber
        size="large"
        type="number"
        value={value}
        aria-label="create"
        placeholder={placeholder}
        status={error && "error"}
        onKeyDown={keyHandler}
        onChange={onChangeHandler}
        addonAfter={
          type === "add" ? (
            <PlusOutlined disabled={error && "error"} onClick={actionHandler} />
          ) : (
            <MinusOutlined onClick={actionHandler} />
          )
        }
      />
    </InputWrapper>
  );
};

const Sidebar = observer(() => {
  return (
    <>
      <InputField placeholder="Add node" onAction={tree.addNode} type="add" />
      <InputField
        placeholder="Remove node"
        onAction={() => null}
        type="minus"
      />
      <Button onClick={tree.clearCanvas} type="primary" danger>
        Clear
      </Button>
    </>
  );
});

const Canvas = styled.canvas`
  overflow: auto;
`;

const BinaryTree = observer(() => {
  const canvasRef = useRef();

  useEffect(() => {
    canvas.initCanvas(canvasRef.current);

    tree.initTree({ canvas });
  }, []);

  return (
    <PageWithSidebar
      centered
      renderSidebar={<Sidebar />}
      renderContent={({ contentWidth, contentHeight }) => {
        if (contentWidth && contentHeight) {
          canvas.drawMatrix(true, contentWidth - 40, contentHeight - 40);
          tree.drawTree("www");
        }
        return <Canvas ref={canvasRef} />;
      }}
      title="Binary Tree"
    />
  );
});

export default BinaryTree;
