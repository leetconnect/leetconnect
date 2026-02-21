require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sequelize = require('./config/database');
const healthRoutes = require('./routes/health');
const { initEventBus, closeEventBus } = require('../shared/event-emitter');
const { errorHandler } = require('../shared/error-handler');
const app = express();
const PORT = process.env.PORT || 3002;

// middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use('/api/market', healthRoutes);

// error handler (must be after all routes)
app.use(errorHandler);

// start
async function start() {
  try {
    await sequelize.authenticate();
    console.log('marketplace db connected');
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('marketplace models synced');
    initEventBus(process.env.REDIS_URL);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`marketplace service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('marketplace service failed to start:', err.message);
    process.exit(1);
  }
}
start();

// shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down marketplace service...');
  await closeEventBus();
  await sequelize.close();
  process.exit(0);
});