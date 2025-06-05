import React, { useState } from 'react';
import axios from 'axios';

const WorkTable = ({ logs, onUpdated }) => {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    work_type: '',
    title: '',
    start_time: '',
    end_time: '',
    status: '',
  });

  const startEdit = (log) => {
    setEditId(log.id);
    setEditForm({
      work_type: log.work_type,
      title: log.title,
      start_time: log.start_time.slice(0, 16),
      end_time: log.end_time.slice(0, 16),
      status: log.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/${editId}`, editForm);
      setEditId(null);
      onUpdated();
    } catch (error) {
      alert('แก้ไขข้อมูลล้มเหลว');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${id}`);
        onUpdated();
      } catch (error) {
        alert('ลบไม่สำเร็จ');
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-md shadow-sm mt-6">
        <thead className="bg-blue-50">
          <tr>
            <th className="border px-3 py-2 text-left">ประเภทงาน</th>
            <th className="border px-3 py-2 text-left">ชื่องาน</th>
            <th className="border px-3 py-2 text-left">เริ่มดำเนินการ</th>
            <th className="border px-3 py-2 text-left">สิ้นสุด</th>
            <th className="border px-3 py-2 text-left">สถานะ</th>
            <th className="border px-3 py-2 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                ไม่มีข้อมูล
              </td>
            </tr>
          ) : (
            logs.map((log) =>
              editId === log.id ? (
                <tr key={log.id} className="bg-yellow-50">
                  <td className="border px-3 py-2">
                    <select
                      name="work_type"
                      value={editForm.work_type}
                      onChange={handleEditChange}
                      className="border rounded p-1 w-full"
                    >
                      <option>Development</option>
                      <option>Test</option>
                      <option>Document</option>
                    </select>
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      className="border rounded p-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="datetime-local"
                      name="start_time"
                      value={editForm.start_time}
                      onChange={handleEditChange}
                      className="border rounded p-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="datetime-local"
                      name="end_time"
                      value={editForm.end_time}
                      onChange={handleEditChange}
                      className="border rounded p-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="border rounded p-1 w-full"
                    >
                      <option>ดำเนินการ</option>
                      <option>เสร็จสิ้น</option>
                      <option>ยกเลิก</option>
                    </select>
                  </td>
                  <td className="border px-3 py-2 text-center space-x-1">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      บันทึก
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={log.id} className="hover:bg-gray-100">
                  <td className="border px-3 py-2">{log.work_type}</td>
                  <td className="border px-3 py-2">{log.title}</td>
                  <td className="border px-3 py-2">
                    {new Date(log.start_time).toLocaleString()}
                  </td>
                  <td className="border px-3 py-2">
                    {new Date(log.end_time).toLocaleString()}
                  </td>
                  <td className="border px-3 py-2">{log.status}</td>
                  <td className="border px-3 py-2 text-center space-x-1">
                    <button
                      onClick={() => startEdit(log)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkTable;