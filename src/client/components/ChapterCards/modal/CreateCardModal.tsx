import {
  Button,
  Col, Form, Input, Modal, Row, Upload,
} from 'antd';
import { FC, useCallback, useState } from 'react';
import { Rule } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useChapterCardContext } from '../../../contexts/ChapterCard.context';
import { MEDIA_ACCEPTS } from '../constant';
import { Preview } from '../../Preview';

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

  const cleanUp = () => {
    setFirstName('');
    setLastName('');
    setTitle('');
    setCompany('');
  };

  const onFinish = useCallback((values: any) => {
    console.log(values);

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
  };

  return (
    <Modal
      title="Create Card"
      width={1000}
      okText="Save"
      destroyOnClose
      open={showCreateModal}
      onOk={form.submit}
      onCancel={onCancel}
      afterClose={afterClose}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form autoComplete="off" preserve={false} form={form} initialValues={initialValues} layout="vertical" onFinish={onFinish}>
            <Row>
              <CustomCol span={24}>
                <Form.Item name="email" label="Email" rules={[...rules, { type: 'email' }]}>
                  <Input allowClear placeholder="Enter Email" maxLength={100} />
                </Form.Item>
              </CustomCol>
              <CustomCol span={24}>
                <Form.Item name="firstName" label="First name" rules={rules}>
                  <Input allowClear placeholder="Enter First Name" maxLength={100} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>
              </CustomCol>
              <CustomCol span={24}>
                <Form.Item name="lastName" label="Last name" rules={rules}>
                  <Input allowClear placeholder="Enter Last Name" maxLength={100} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>
              </CustomCol>
              <CustomCol span={24}>
                <Form.Item name="title" label="Title" rules={rules}>
                  <Input allowClear placeholder="Enter Title" maxLength={100} onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
              </CustomCol>
              <CustomCol span={24}>
                <Form.Item name="image" label="Upload Photos" valuePropName="image" getValueFromEvent={mediaFiles}>
                  <Upload listType="picture" accept={MEDIA_ACCEPTS} multiple beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
              </CustomCol>
              <CustomCol span={24}>
                <Form.Item name="company" label="Company" rules={rules}>
                  <Input allowClear placeholder="Enter Company" maxLength={100} onChange={(e) => setCompany(e.target.value)} />
                </Form.Item>
              </CustomCol>
            </Row>
          </Form>
        </Col>
        <Col span={12}>
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
    </Modal>
  );
};

export default CreateCardModal;
