import { Button } from "antd";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useRef, useEffect } from "react";

import InputField from "components/InputField";
import Textarea from "components/Textarea";
import PageWithSidebar from "containers/PageWithSidebar";
import tree from "stores/tree";
import canvas from "stores/canvas";

const Sidebar = observer(() => {
  return (
    <>
      <InputField
        type="number"
        afterType="add"
        regX={/[^0-9]/gm}
        placeholder="Add node"
        onAction={tree.addNode}
      />
      <InputField
        type="number"
        afterType="minus"
        regX={/[^0-9]/gm}
        placeholder="Remove node"
        onAction={tree.removeNode}
      />
      <Textarea regX={/[^0-9,-]/gm} onAction={tree.buildTree} />
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
    tree.addNode(0);
    tree.addNode(20);
    tree.addNode(25);
    tree.addNode(15);
    tree.addNode(-4);
    tree.addNode(-8);
    tree.addNode(-25);

    tree.addNode(17);
  }, []);

  return (
    <PageWithSidebar
      centered
      renderSidebar={<Sidebar />}
      renderContent={({ contentWidth, contentHeight }) => {
        if (contentWidth && contentHeight) {
          canvas.drawMatrix(true, contentWidth - 40, contentHeight - 40);
          tree.drawTree();
        }
        return <Canvas ref={canvasRef} />;
      }}
      title="Binary Tree"
    />
  );
});

export default BinaryTree;
