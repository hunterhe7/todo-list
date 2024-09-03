import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';

interface DutyFormProps {
    onSubmit: (name: string) => void;
}

const DutyForm: React.FC<DutyFormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm();
    const [error, setError] = useState('');

    const handleSubmit = (values: { name: string }) => {
        if (!values.name) {
            setError('Name is required');
            return;
        }
        setError('');
        onSubmit(values.name);
        form.resetFields(); // Reset the form fields
    };

    return (
        <Form 
            form={form} 
            onFinish={handleSubmit} 
            layout="inline"
        >
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Name is required' }]}
            >
                <Input placeholder="Duty Name" />
            </Form.Item>
            {error && <Alert message={error} type="error" showIcon />}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Duty
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DutyForm;