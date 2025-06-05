import React, { useState } from 'react';
import axios from 'axios';

const WorkForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    work_type: 'Development',
    title: '',
    start_time: '',
    end_time: '',
    status: 'ดำเนินการ',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}`, form);
      setForm({
        work_type: 'Development',
        title: '',
        start_time: '',
        end_time: '',
        status: 'ดำเนินการ',
      });
      onSuccess();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-6 rounded-lg bg-gray-50 shadow-sm"
    >
      <input
        name="title"
        placeholder="ชื่องานที่ดำเนินการ"
        value={form.title}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        name="work_type"
        value={form.work_type}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option>Development</option>
        <option>Test</option>
        <option>Document</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option>ดำเนินการ</option>
        <option>เสร็จสิ้น</option>
        <option>ยกเลิก</option>
      </select>

      <input
        name="start_time"
        type="datetime-local"
        value={form.start_time}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
      />

      <input
        name="end_time"
        type="datetime-local"
        value={form.end_time}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        บันทึกข้อมูล
      </button>
    </form>
  );
};

export default WorkForm;