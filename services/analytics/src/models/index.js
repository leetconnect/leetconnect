const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = sequelize.define('Event', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  event_type: { type: DataTypes.STRING(100), allowNull: false },
  actor_id: DataTypes.UUID,
  payload: { type: DataTypes.JSONB, allowNull: false },
}, {
  tableName: 'events',
  indexes: [{ fields: ['event_type'] }, { fields: ['created_at'] }],
});
const DailyMetric = sequelize.define('DailyMetric', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  metric_name: { type: DataTypes.STRING(100), allowNull: false },
  metric_value: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  dimensions: DataTypes.JSONB,
}, {
  tableName: 'daily_metrics',
  indexes: [{ unique: true, fields: ['date', 'metric_name'] }],
});
const UserActivityLog = sequelize.define('UserActivityLog', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false },
  action: { type: DataTypes.STRING(100), allowNull: false },
  metadata: DataTypes.JSONB,
}, {
  tableName: 'user_activity_logs',
  indexes: [{ fields: ['user_id', 'created_at'] }],
});
module.exports = { Event, DailyMetric, UserActivityLog };