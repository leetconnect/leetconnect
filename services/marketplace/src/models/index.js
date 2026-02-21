const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');

//job   
const Job = sequelize.define('Job',{
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  client_id: {type: DataTypes.UUID, allowNull: false},
  client_name: {type: DataTypes.STRING(100)},
  title: {type: DataTypes.STRING(200), allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: false},
  pricing_type:{
    type: DataTypes.STRING(20), allowNull: false,
    validate: {isIn: [['fixed', 'hourly']]},
  },
  budget_min: DataTypes.DECIMAL(10, 2),
  budget_max: DataTypes.DECIMAL(10, 2),
  hourly_rate_min: DataTypes.DECIMAL(10, 2),
  hourly_rate_max: DataTypes.DECIMAL(10, 2),
  location: DataTypes.STRING(200),
  is_remote: {type: DataTypes.BOOLEAN, defaultValue: false},
  category: DataTypes.STRING(100),
  skills: DataTypes.ARRAY(DataTypes.TEXT),     // Postgresql array type
  proposals_count: {type: DataTypes.INTEGER, defaultValue: 0},
  status: {
    type: DataTypes.STRING(20), defaultValue: 'open',
    validate: {isIn: [['open', 'in_progress', 'completed', 'closed']]},
  },
}, {tableName: 'jobs'});

//proposal
const Proposal = sequelize.define('Proposal', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  job_id: {type: DataTypes.UUID, allowNull: false},
  freelancer_id: {type: DataTypes.UUID, allowNull: false}, 
  cover_letter: DataTypes.TEXT,
  bid_amount: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
  status: {
    type: DataTypes.STRING(20), defaultValue: 'pending',
    validate: {isIn: [['pending', 'accepted', 'rejected']]},
  },
}, {tableName: 'proposals'});

//contract
const Contract = sequelize.define('Contract',{
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  job_id: DataTypes.UUID,
  client_id: {type: DataTypes.UUID, allowNull: false},
  freelancer_id: {type: DataTypes.UUID, allowNull: false},
  total_amount: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
  hours_worked: {type: DataTypes.DECIMAL(8, 2), defaultValue: 0},
  status: {
    type: DataTypes.STRING(20), defaultValue: 'draft',
    validate: {isIn: [['draft', 'active', 'completed', 'paid', 'disputed']]},
  },
  started_at: DataTypes.DATE,
  completed_at: DataTypes.DATE,
  due_date: DataTypes.DATEONLY,
}, {tableName: 'contracts'});

//review
const Review = sequelize.define('Review',{
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  contract_id: DataTypes.UUID,
  reviewer_id: {type: DataTypes.UUID, allowNull: false},
  reviewee_id: {type: DataTypes.UUID, allowNull: false},
  rating: {type: DataTypes.INTEGER, validate: {min: 1, max: 5}},
  comment: DataTypes.TEXT,
}, {tableName: 'reviews'});       

//associations
Job.hasMany(Proposal, {foreignKey: 'job_id'});
Proposal.belongsTo(Job, {foreignKey: 'job_id'});
Job.hasMany(Contract, {foreignKey: 'job_id'});
Contract.belongsTo(Job, {foreignKey: 'job_id'});
Contract.hasMany(Review, {foreignKey: 'contract_id'});
Review.belongsTo(Contract, {foreignKey: 'contract_id'});
module.exports = {Job, Proposal, Contract, Review};