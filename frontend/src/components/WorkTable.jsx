// 📁 src/components/WorkTable.jsx
import React from 'react';
import axios from 'axios';

const WorkTable = ({ logs, onUpdated }) => {
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
            logs.map((log) => (
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
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkTable;