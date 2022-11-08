import { Layout } from "antd";
import styled, { css } from "styled-components";

import useDocumentTitle from "hooks/useDocumentTitle";
import { useRef, useState, useEffect } from "react";

const { Header, Content, Footer, Sider } = Layout;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: stretch;
  justify-content: center;
`;

const Title = styled.div`
  color: #fcfcf1c5;
  text-align: center;
  font-size: 25px;
`;

const StyledContent = styled(Content)`
  ${({ $centered }) =>
    $centered &&
    css`
      display: flex;
      justify-content: center;
    `}
  padding: 20px;
`;

const StyledSidebar = styled(Sider)`
  padding: 0 20px;
  width: 300px;
`;

const PageFullWidth = ({
  title,
  renderSidebar,
  renderContent,
  centered = false,
}) => {
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const contentRef = useRef(null);
  useDocumentTitle(title);

  useEffect(() => {
    if (!contentRef.current) return;

    setContentHeight(contentRef.current.clientHeight);
    setContentWidth(contentRef.current.clientWidth);
  }, [contentRef.current]);

  return (
    <Wrapper>
      <Layout>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Layout>
          <StyledSidebar width={300}>{renderSidebar}</StyledSidebar>
          <StyledContent ref={contentRef} $centered={centered}>
            {renderContent({ contentWidth, contentHeight })}
          </StyledContent>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default PageFullWidth;
