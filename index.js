require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/test-targets', require('./routes/testTargets'));
app.use('/roadmaps', require('./routes/roadmaps'));
app.use('/daily-schedules', require('./routes/dailySchedules'));
app.use('/checklists', require('./routes/checklists'));
app.use('/reminders', require('./routes/reminders'));
app.use('/study-streaks', require('./routes/studyStreaks'));
app.use('/quiz', require('./routes/quizzes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});