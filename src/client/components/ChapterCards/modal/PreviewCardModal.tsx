import { FC, useCallback } from 'react';
import {
  Button,
  Col, Image, Popconfirm, Row, message,
} from 'antd';
import styled from 'styled-components';
import { DownloadOutlined } from '@ant-design/icons';
import domtoimage from 'dom-to-image';

import { Preview } from '../../Preview';
import { useChapterCardContext } from '../../../contexts';
import { useDesigns } from '../../../hooks';
import { CustomModal } from './modal.styled';

const CustomCol = styled(Col)`
  padding-top: 25px;
  text-align: center;

  strong {
    font-size: 20px;
  }
  div {
    font-size: 16px;
    opacity: 0.85;
  }
`;

interface PreviewCadModalInterface {
  cardId: number;
  setSelect: React.Dispatch<React.SetStateAction<number>>;
}

const PreviewCadModal: FC<PreviewCadModalInterface> = ({ cardId, setSelect }) => {
  const { list } = useDesigns();
  const card = list.find((design) => design.id === cardId);
  const { showPreviewModal, hidePreviewModal } = useChapterCardContext();

  type OpenWeb = 'profile' | 'telegram' | 'twitter'
  const open = useCallback((type: OpenWeb, id?: string) => {
    if (!id) {
      message.info('Profile not available');
      return;
    }

    let _url = '';

    if (type === 'profile') _url = id;
    if (type === 'telegram') _url = `https://t.me/${id}`;
    if (type === 'twitter') _url = `https://twitter.com/${id}`;

    window.open(_url);
  }, []);

  const afterClose = () => {
    hidePreviewModal();
    setSelect(0);
  };

  const onOk = () => {
    const query = document.getElementById('preview');
    if (query) {
      domtoimage.toPng(query)
        .then((dataUrl: any) => {
          const link = document.createElement('a');
          link.download = `${card?.firstName}_${card?.lastName}.png`;
          link.href = dataUrl;
          link.click();
        }).catch(message.error);
    }

    afterClose();
  };

  return (
    <CustomModal
      title="Preview Card"
      okText={(
        <>
          Download
          {' '}
          <DownloadOutlined />
        </>
      )}
      width={1200}
      destroyOnClose
      open={showPreviewModal}
      onOk={onOk}
      onCancel={afterClose}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Row>
            <Col
              span={24}
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image src={card?.image} width={300} height={300} />
            </Col>
          </Row>
          <Row>
            <CustomCol span={12}>
              <strong>Email</strong>
              <div>
                <a href={`mailto:${card?.email}`}>{card?.email}</a>
              </div>
            </CustomCol>
            <CustomCol span={12}>
              <strong>Title</strong>
              <div>{card?.title}</div>
            </CustomCol>
          </Row>

          <Row>
            <CustomCol span={12}>
              <strong>First Name</strong>
              <div>{card?.firstName}</div>
            </CustomCol>
            <CustomCol span={12}>
              <strong>Last Name</strong>
              <div>{card?.lastName}</div>
            </CustomCol>
          </Row>

          <Row>
            <CustomCol span={12}>
              <strong>Company</strong>
              <div>{card?.company}</div>
            </CustomCol>
            <CustomCol span={12}>
              <strong>Telegram</strong>
              <div>
                <Popconfirm
                  title="Open in telegram?"
                  onConfirm={() => open('telegram', card?.telegram)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#top">
                    @
                    {card?.telegram}
                  </a>
                </Popconfirm>
              </div>
            </CustomCol>
          </Row>

          <Row>
            <CustomCol span={12}>
              <strong>Twitter</strong>
              <div>
                <Popconfirm
                  title="Open in twitter?"
                  onConfirm={() => open('twitter', card?.twitter)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#top">
                    @
                    {card?.twitter}
                  </a>
                </Popconfirm>
              </div>
            </CustomCol>
            <CustomCol span={12}>
              <strong>Profile ChapterX</strong>
              <div>
                <Popconfirm
                  title="Open in new tab?"
                  onConfirm={() => open('profile', card?.profile)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">Visit Website</Button>
                </Popconfirm>
              </div>
            </CustomCol>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Preview
                firstName={card?.firstName}
                lastName={card?.lastName}
                title={card?.title}
                company={card?.company}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </CustomModal>
  );
};

export default PreviewCadModal;
