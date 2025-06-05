require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("./db-config");
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
    const { date } = req.query;
    const [rows] = await db.query(
        date ?
            `SELECT * FROM work_logs WHERE DATE(start_time) = ? ORDER BY start_time` :
            `SELECT * FROM work_logs ORDER BY start_time`,
        date ? [date] : []
    );
    res.json(rows);
});

router.get('/summary', async (req, res) => {
    const { month } = req.query;
    const [rows] = await db.query(`
    SELECT status, COUNT(*) AS count
    FROM work_logs
    WHERE DATE_FORMAT(start_time, '%Y-%m') = ?
    GROUP BY status
  `, [month]);
    res.json(rows);
});

router.post('/', async (req, res) => {
    const { work_type, title, start_time, end_time, status } = req.body;
    await db.query(
        `INSERT INTO work_logs (work_type, title, start_time, end_time, status)
     VALUES (?, ?, ?, ?, ?)`,
        [work_type, title, start_time, end_time, status]
    );
    res.json({ message: 'Created' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { work_type, title, start_time, end_time, status } = req.body;
    await db.query(`
    UPDATE work_logs SET
    work_type = ?, title = ?, start_time = ?, end_time = ?, status = ?
    WHERE id = ?
  `, [work_type, title, start_time, end_time, status, id]);
    res.json({ message: 'Updated' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.query(`DELETE FROM work_logs WHERE id = ?`, [id]);
    res.json({ message: 'Deleted' });
});


// Seed mock data
router.post('/api/seed', async (req, res) => {
    const now = dayjs();
    const statuses = ['ดำเนินการ', 'เสร็จสิ้น', 'ยกเลิก'];
    const types = ['Development', 'Test', 'Document'];
    for (let d = 0; d < 5; d++) {
        for (let i = 0; i < 5; i++) {
            const date = now.subtract(d, 'day').format('YYYY-MM-DD');
            await db.query(
                `INSERT INTO work_logs (work_type, title, start_time, end_time, status)
         VALUES (?, ?, ?, ?, ?)`,
                [
                    types[Math.floor(Math.random() * 3)],
                    `งานที่ ${i + 1}`,
                    `${date} 09:00:00`,
                    `${date} 10:00:00`,
                    statuses[Math.floor(Math.random() * 3)]
                ]
            );
        }
    }
    res.json({ message: 'Seeded' });
});

module.exports = router