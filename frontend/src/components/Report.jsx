// 📁 src/components/Report.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Report = () => {
  const [month, setMonth] = useState('');
  const [summary, setSummary] = useState([]);

  const fetchSummary = async () => {
    if (!month) return;
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/summary`, {
        params: { month },
      });
      setSummary(res.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary([]);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [month]);

  return (
    <div className="mt-8 p-4 border rounded-md bg-gray-50 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">รายงานสรุปสถานะตามเดือน</h2>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-3 py-2 text-left">สถานะ</th>
            <th className="border px-3 py-2 text-left">จำนวน</th>
          </tr>
        </thead>
        <tbody>
          {summary.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-4 text-gray-500">
                กรุณาเลือกเดือนเพื่อดูรายงาน
              </td>
            </tr>
          ) : (
            summary.map(({ status, count }) => (
              <tr key={status} className="hover:bg-gray-100">
                <td className="border px-3 py-2">{status}</td>
                <td className="border px-3 py-2">{count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Report;