import express from 'express';
import cors from 'cors';
import { userController } from './controllers/userController';
import { searchMentors } from './controllers/mentorController';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.put('/api/users/:userId/learning-interests', userController.updateLearningInterests);
app.put('/api/users/:userId/profile', userController.updateProfile);
app.get('/api/mentors/search', searchMentors);

// Only start the server if this file is run directly (not imported for testing)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
  });
}

export default app;