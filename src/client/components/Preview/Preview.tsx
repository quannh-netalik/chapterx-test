import { FC } from 'react';

import { getSampleFront, getSampleBack } from '../../utils';
import { PreviewWrapper } from './Preview.styled';

interface PreviewInterface {
  firstName?: string;
  lastName?: string;
  title?: string;
  company?: string;
}

const Preview: FC<PreviewInterface> = ({
  firstName,
  lastName,
  title,
  company,
}) => (
  <PreviewWrapper id="preview">
    <div>{getSampleFront({ company })}</div>

    <div>
      {getSampleBack({
        firstName,
        lastName,
        title,
        company,
      })}
    </div>
  </PreviewWrapper>
);

export default Preview;
