import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkForm from '../components/WorkForm';
import WorkTable from '../components/WorkTable';
import Report from '../components/Report';

function Home() {
  document.title = "Worklogs-Home";
  const [logs, setLogs] = useState([]);
  const [dateFilter, setDateFilter] = useState('');

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`, {
        params: dateFilter ? { date: dateFilter } : {},
      });
      setLogs(res.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [dateFilter]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
        ระบบบันทึกผลการปฏิบัติงานประจำวัน
      </h1>
      
      <WorkForm onSuccess={fetchLogs} />

      <div className="my-6 flex items-center gap-4">
        <label className="font-medium text-gray-700">ค้นหาวันที่:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setDateFilter('')}
          className="text-sm text-red-600 hover:underline"
          title="ล้างตัวกรอง"
        >
          ล้างวันที่
        </button>
      </div>

      <WorkTable logs={logs} onUpdated={fetchLogs} />

      <Report />
    </div>
  );
}

export default Home;