import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CustomModal = styled(Modal)`
  .ant-modal-title {
    padding: 24px 0;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const NotificationOnFinish = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  a {
    color: #2857c5;
  }
`;
