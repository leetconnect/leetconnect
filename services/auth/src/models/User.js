const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
  password_hash: { type: DataTypes.STRING(255), allowNull: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  display_name: DataTypes.STRING(100),
  avatar_url: DataTypes.STRING(500),
  bio: DataTypes.TEXT,
  role: {
    type: DataTypes.STRING(20), defaultValue: 'client',
    validate: { isIn: [['client', 'freelancer', 'admin']] },
  },
  is_online: { type: DataTypes.BOOLEAN, defaultValue: false },
  last_seen: DataTypes.DATE,
  two_fa_secret: DataTypes.STRING(255),
  two_fa_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'users' });
module.exports = User;