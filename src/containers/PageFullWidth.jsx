import { PageHeader, Layout } from "antd";
import styled from "styled-components";

import useDocumentTitle from "hooks/useDocumentTitle";

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
  padding: 20px;
`;

const PageFullWidth = ({ children, title }) => {
  useDocumentTitle(title);

  return (
    <Wrapper>
      <Layout>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Layout>
          <StyledContent>{children}</StyledContent>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default PageFullWidth;
