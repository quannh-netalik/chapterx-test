import { FC, ReactNode } from 'react';
import { CustomContent, Wrapper } from './Container.styled';
import Headers from './Headers';

const Container: FC<{ children: ReactNode }> = ({ children }) => (
  <Wrapper>
    <Headers />

    <CustomContent>
      {children}
    </CustomContent>

  </Wrapper>
);

export default Container;
