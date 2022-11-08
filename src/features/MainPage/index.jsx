import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageFullWidth from "containers/PageFullWidth";

const MainPage = () => {
  const gotToPage = useNavigate();

  return (
    <PageFullWidth title="Demonstration">
      <Button onClick={() => gotToPage("/binary-tree")}>
        Binary Tree Simulation
      </Button>
    </PageFullWidth>
  );
};

export default MainPage;
