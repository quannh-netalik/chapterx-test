import {
  Button,
  Col, Form, Input, Row, Upload,
} from 'antd';
import { FC, useCallback, useState } from 'react';
import { Rule } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useChapterCardContext } from '../../../contexts/ChapterCard.context';
import { MEDIA_ACCEPTS } from '../constant';
import { Preview } from '../../Preview';
import { CustomModal } from './modal.styled';
import { useDesigns } from '../../../hooks';

const rules: Rule[] = [
  {
    required: true,
    message: 'Field is required!',
  },
];

const CustomCol = styled(Col)`
  padding-top: 5px;
`;

const CreateCardModal: FC = () => {
  const { useForm } = Form;

  const [form] = useForm();
  const { showCreateModal, hideCreateModal } = useChapterCardContext();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');

  const { createDesign } = useDesigns();

  const cleanUp = () => {
    setFirstName('');
    setLastName('');
    setTitle('');
    setCompany('');
  };

  const onFinish = useCallback((values: any) => {
    createDesign({
      ...values,
      image: values.image && {
        name: values.image[0].name,
        thumbUrl: values.image[0].thumbUrl,
      },
    });

    hideCreateModal();
    cleanUp();
  }, [hideCreateModal]);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideCreateModal();
    cleanUp();
  }, [form, hideCreateModal]);

  const afterClose = useCallback(() => {
    form.resetFields();
    cleanUp();
  }, [form, cleanUp]);

  const mediaFiles = useCallback((event: { fileList: FileList }) => (
    Array.isArray(event) ? event : event.fileList
  ), []);

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    twitter: '',
    telegram: '',
    profile: '',
  };

  return (
    <CustomModal
      title="Create Card"
      width={1200}
      okText="Save"
      destroyOnClose
      open={showCreateModal}
      onOk={form.submit}
      onCancel={onCancel}
      afterClose={afterClose}
    >
      <Row gutter={24}>
        <Col span={16}>
          <Form autoComplete="off" preserve={false} form={form} initialValues={initialValues} layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
              <CustomCol span={12}>
                <Form.Item name="email" label="Email" rules={[...rules, { type: 'email' }]}>
                  <Input allowClear placeholder="Enter Email" maxLength={100} />
                </Form.Item>
              </CustomCol>
              <CustomCol span={12}>
                <Form.Item name="title" label="Title" rules={rules}>
                  <Input allowClear placeholder="Enter Title" maxLength={100} onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
              </CustomCol>
            </Row>

            <Row gutter={24}>
              <CustomCol span={12}>
                <Form.Item name="firstName" label="First name" rules={rules}>
                  <Input allowClear placeholder="Enter First Name" maxLength={100} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>
              </CustomCol>
              <CustomCol span={12}>
                <Form.Item name="lastName" label="Last name" rules={rules}>
                  <Input allowClear placeholder="Enter Last Name" maxLength={100} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>
              </CustomCol>
            </Row>

            <Row gutter={24}>
              <CustomCol span={12}>
                <Form.Item name="company" label="Company" rules={rules}>
                  <Input allowClear placeholder="Enter Company" maxLength={100} onChange={(e) => setCompany(e.target.value)} />
                </Form.Item>
              </CustomCol>
              <CustomCol span={12}>
                <Form.Item name="telegram" label="Telegram">
                  <Input allowClear addonBefore="https://t.me/" placeholder="username" maxLength={100} />
                </Form.Item>
              </CustomCol>
            </Row>

            <Row gutter={24}>
              <CustomCol span={12}>
                <Form.Item name="twitter" label="Twitter">
                  <Input allowClear addonBefore="https://twitter.com/" placeholder="username" maxLength={100} />
                </Form.Item>
              </CustomCol>
              <CustomCol span={12}>
                <Form.Item name="profile" label="Profile">
                  <Input allowClear addonBefore="https://chapterx.network/" placeholder="username" maxLength={100} />
                </Form.Item>
              </CustomCol>
            </Row>
            <CustomCol span={24}>
              <Form.Item name="image" label="Upload Photos" valuePropName="image" getValueFromEvent={mediaFiles}>
                <Upload listType="picture" accept={MEDIA_ACCEPTS} beforeUpload={() => false} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </CustomCol>
          </Form>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24}>
              <Preview
                firstName={firstName}
                lastName={lastName}
                title={title}
                company={company}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </CustomModal>
  );
};

export default CreateCardModal;
