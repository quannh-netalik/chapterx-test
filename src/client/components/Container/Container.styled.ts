import { Layout } from 'antd';
import styled from 'styled-components';

const { Header, Content } = Layout;

export const Wrapper = styled.div`
  width: 65%;
  height: 100%;
  margin: auto;
  margin-bottom: 50px;
`;

export const CustomHeader = styled(Header)`
  margin-top: 40px;
  position: 'sticky';
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 20px;
    font-weight: bold;
    h1 {
      font-size: 55px;
      color: #65ac5f;
    }
  }

  a:not(:first-child) {
    margin-left: 60px;
  }
`;

export const CustomContent = styled(Content)`
  margin-top: 40px
`;
