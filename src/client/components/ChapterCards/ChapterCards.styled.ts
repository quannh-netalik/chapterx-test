import { Card } from 'antd';

import styled from 'styled-components';

export const CardContainer = styled.div`
  h1 {
    font-size: 36px;
    padding: 20px 0;
  }

  .chapter-cards {
    display: flex;
    gap: 60px;
  }
`;

export const CustomCard = styled(Card)`
  width: 400px;
  height: 350px;
  img {
    object-fit: contain;
  }
`;
