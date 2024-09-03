import React, { useState } from 'react';
import { List, Checkbox, Input, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Duty } from '../types/Duty';

interface DutyListProps {
  duties: Duty[];
  onUpdate: (duty: Duty) => void;
  onDelete: (id: number) => void;
}

const DutyList: React.FC<DutyListProps> = ({ duties, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleEdit = (duty: Duty) => {
    setEditingId(duty.id);
    setEditingName(duty.name);
  };

  const handleSave = (duty: Duty) => {
    onUpdate({ ...duty, name: editingName });
    setEditingId(null);
  };

  return (
    <List
      header={<div>Task List</div>}
      bordered
      dataSource={duties}
      renderItem={duty => (
        <List.Item key={duty.id}>
          <Space>
            <Checkbox
              checked={duty.isDone}
              onChange={() => onUpdate({ ...duty, isDone: !duty.isDone })}
            />
            {editingId === duty.id ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onPressEnter={() => handleSave(duty)}
              />
            ) : (
              <span style={{ textDecoration: duty.isDone ? 'line-through' : 'none' }}>
                {duty.name}
              </span>
            )}
          </Space>
          <Space>
            {editingId === duty.id ? (
              <Button onClick={() => handleSave(duty)} type="link">
                Save
              </Button>
            ) : (
              <Button icon={<EditOutlined />} onClick={() => handleEdit(duty)} type="link" />
            )}
            <Button icon={<DeleteOutlined />} onClick={() => onDelete(duty.id)} type="link" />
          </Space>
        </List.Item>
      )}
    />
  );
};

export default DutyList;