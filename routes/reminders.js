const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM reminders');
  res.json(result.rows);
});

router.get('/:userId', async (req, res) => {

  try {

    const result = await db.query(
      `
      SELECT *
      FROM reminders
      WHERE user_id = $1
      LIMIT 1
      `,
      [req.params.userId]
    );

    if (result.rows.length === 0) {
      return res.json(null);
    }

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});

// POST
router.post('/', async (req, res) => {
  try {

    const {
      user_id,
      remind_time,
      is_active
    } = req.body;

    // cek apakah user sudah punya reminder
    const check = await db.query(
      'SELECT * FROM reminders WHERE user_id = $1',
      [user_id]
    );

    let result;

    if (check.rows.length > 0) {

      result = await db.query(
        `
        UPDATE reminders
        SET
          remind_time = $1,
          is_active = $2
        WHERE user_id = $3
        RETURNING *
        `,
        [
          remind_time,
          is_active,
          user_id
        ]
      );

    } else {

      result = await db.query(
        `
        INSERT INTO reminders
        (
          user_id,
          remind_time,
          is_active
        )
        VALUES ($1,$2,$3)
        RETURNING *
        `,
        [
          user_id,
          remind_time,
          is_active
        ]
      );

    }

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;