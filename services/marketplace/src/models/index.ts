import { DataTypes, Model, Optional, HasManyGetAssociationsMixin, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';


//job   
interface JobAttributes {
  id: string;
  client_id: string;
  client_name?: string;
  title: string;
  description: string;
  pricing_type: 'fixed' | 'hourly';
  budget_min?: number;
  budget_max?: number;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  location?: string;
  is_remote: boolean;
  category?: string;
  skills?: string[];
  proposals_count: number;
  status: 'open' | 'in_progress' | 'completed' | 'closed';
}
interface JobCreationAttributes extends Optional<JobAttributes, 'id' | 'is_remote' | 'proposals_count' | 'status'> {}
class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  declare id: string;
  declare client_id: string;
  declare client_name?: string;
  declare title: string;
  declare description: string;
  declare pricing_type: 'fixed' | 'hourly';
  declare budget_min?: number;
  declare budget_max?: number;
  declare hourly_rate_min?: number;
  declare hourly_rate_max?: number;
  declare location?: string;
  declare is_remote: boolean;
  declare category?: string;
  declare skills?: string[];
  declare proposals_count: number;
  declare status: 'open' | 'in_progress' | 'completed' | 'closed';

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getProposals: HasManyGetAssociationsMixin<Proposal>;
  declare getContracts: HasManyGetAssociationsMixin<Contract>;
}

Job.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  client_id: { type: DataTypes.UUID, allowNull: false },
  client_name: DataTypes.STRING(100),
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  pricing_type: { type: DataTypes.STRING(20), allowNull: false, validate: { isIn: [['fixed', 'hourly']] } },
  budget_min: DataTypes.DECIMAL(10, 2),
  budget_max: DataTypes.DECIMAL(10, 2),
  hourly_rate_min: DataTypes.DECIMAL(10, 2),
  hourly_rate_max: DataTypes.DECIMAL(10, 2),
  location: DataTypes.STRING(200),
  is_remote: { type: DataTypes.BOOLEAN, defaultValue: false },
  category: DataTypes.STRING(100),
  skills: DataTypes.ARRAY(DataTypes.TEXT),
  proposals_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.STRING(20), defaultValue: 'open', validate: { isIn: [['open', 'in_progress', 'completed', 'closed']] } },
}, { sequelize, tableName: 'jobs' });

//proposal
interface ProposalAttributes {
  id: string;
  job_id: string;
  freelancer_id: string;
  cover_letter?: string;
  bid_amount: number;
  status: 'pending' | 'accepted' | 'rejected';
}

interface ProposalCreationAttributes extends Optional<ProposalAttributes, 'id' | 'status'> {}

class Proposal extends Model<ProposalAttributes, ProposalCreationAttributes> implements ProposalAttributes {
  declare id: string;
  declare job_id: string;
  declare freelancer_id: string;
  declare cover_letter?: string;
  declare bid_amount: number;
  declare status: 'pending' | 'accepted' | 'rejected';

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getJob: BelongsToGetAssociationMixin<Job>;
}

Proposal.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  job_id: { type: DataTypes.UUID, allowNull: false },
  freelancer_id: { type: DataTypes.UUID, allowNull: false },
  cover_letter: DataTypes.TEXT,
  bid_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.STRING(20), defaultValue: 'pending', validate: { isIn: [['pending', 'accepted', 'rejected']] } },
}, { sequelize, tableName: 'proposals' });


//contract
interface ContractAttributes {
  id: string;
  job_id?: string;
  client_id: string;
  freelancer_id: string;
  total_amount: number;
  hours_worked: number;
  status: 'draft' | 'active' | 'completed' | 'paid' | 'disputed';
  started_at?: Date;
  completed_at?: Date;
  due_date?: string;
}

interface ContractCreationAttributes extends Optional<ContractAttributes, 'id' | 'hours_worked' | 'status'> {}

class Contract extends Model<ContractAttributes, ContractCreationAttributes> implements ContractAttributes {
  declare id: string;
  declare job_id?: string;
  declare client_id: string;
  declare freelancer_id: string;
  declare total_amount: number;
  declare hours_worked: number;
  declare status: 'draft' | 'active' | 'completed' | 'paid' | 'disputed';
  declare started_at?: Date;
  declare completed_at?: Date;
  declare due_date?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getJob: BelongsToGetAssociationMixin<Job>;
  declare getReviews: HasManyGetAssociationsMixin<Review>;
}

Contract.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  job_id: DataTypes.UUID,
  client_id: { type: DataTypes.UUID, allowNull: false },
  freelancer_id: { type: DataTypes.UUID, allowNull: false },
  total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  hours_worked: { type: DataTypes.DECIMAL(8, 2), defaultValue: 0 },
  status: { type: DataTypes.STRING(20), defaultValue: 'draft', validate: { isIn: [['draft', 'active', 'completed', 'paid', 'disputed']] } },
  started_at: DataTypes.DATE,
  completed_at: DataTypes.DATE,
  due_date: DataTypes.DATEONLY,
}, { sequelize, tableName: 'contracts' });

//review
interface ReviewAttributes {
  id: string;
  contract_id?: string;
  reviewer_id: string;
  reviewee_id: string;
  rating?: number;
  comment?: string;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  declare id: string;
  declare contract_id?: string;
  declare reviewer_id: string;
  declare reviewee_id: string;
  declare rating?: number;
  declare comment?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getContract: BelongsToGetAssociationMixin<Contract>;
}

Review.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  contract_id: DataTypes.UUID,
  reviewer_id: { type: DataTypes.UUID, allowNull: false },
  reviewee_id: { type: DataTypes.UUID, allowNull: false },
  rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
  comment: DataTypes.TEXT,
}, { sequelize, tableName: 'reviews' });

//associations
Job.hasMany(Proposal, { foreignKey: 'job_id' });
Proposal.belongsTo(Job, { foreignKey: 'job_id' });
Job.hasMany(Contract, { foreignKey: 'job_id' });
Contract.belongsTo(Job, { foreignKey: 'job_id' });
Contract.hasMany(Review, { foreignKey: 'contract_id' });
Review.belongsTo(Contract, { foreignKey: 'contract_id' });

export { Job, Proposal, Contract, Review };
export type { JobAttributes, ProposalAttributes, ContractAttributes, ReviewAttributes };
























// const { DataTypes} = require('sequelize');
// const sequelize = require('../config/database');

// //job   
// const Job = sequelize.define('Job',{
//   id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
//   client_id: {type: DataTypes.UUID, allowNull: false},
//   client_name: {type: DataTypes.STRING(100)},
//   title: {type: DataTypes.STRING(200), allowNull: false},
//   description: {type: DataTypes.TEXT, allowNull: false},
//   pricing_type:{
//     type: DataTypes.STRING(20), allowNull: false,
//     validate: {isIn: [['fixed', 'hourly']]},
//   },
//   budget_min: DataTypes.DECIMAL(10, 2),
//   budget_max: DataTypes.DECIMAL(10, 2),
//   hourly_rate_min: DataTypes.DECIMAL(10, 2),
//   hourly_rate_max: DataTypes.DECIMAL(10, 2),
//   location: DataTypes.STRING(200),
//   is_remote: {type: DataTypes.BOOLEAN, defaultValue: false},
//   category: DataTypes.STRING(100),
//   skills: DataTypes.ARRAY(DataTypes.TEXT),     // Postgresql array type
//   proposals_count: {type: DataTypes.INTEGER, defaultValue: 0},
//   status: {
//     type: DataTypes.STRING(20), defaultValue: 'open',
//     validate: {isIn: [['open', 'in_progress', 'completed', 'closed']]},
//   },
// }, {tableName: 'jobs'});

// //proposal
// const Proposal = sequelize.define('Proposal', {
//   id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
//   job_id: {type: DataTypes.UUID, allowNull: false},
//   freelancer_id: {type: DataTypes.UUID, allowNull: false}, 
//   cover_letter: DataTypes.TEXT,
//   bid_amount: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
//   status: {
//     type: DataTypes.STRING(20), defaultValue: 'pending',
//     validate: {isIn: [['pending', 'accepted', 'rejected']]},
//   },
// }, {tableName: 'proposals'});

// //contract
// const Contract = sequelize.define('Contract',{
//   id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
//   job_id: DataTypes.UUID,
//   client_id: {type: DataTypes.UUID, allowNull: false},
//   freelancer_id: {type: DataTypes.UUID, allowNull: false},
//   total_amount: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
//   hours_worked: {type: DataTypes.DECIMAL(8, 2), defaultValue: 0},
//   status: {
//     type: DataTypes.STRING(20), defaultValue: 'draft',
//     validate: {isIn: [['draft', 'active', 'completed', 'paid', 'disputed']]},
//   },
//   started_at: DataTypes.DATE,
//   completed_at: DataTypes.DATE,
//   due_date: DataTypes.DATEONLY,
// }, {tableName: 'contracts'});

// //review
// const Review = sequelize.define('Review',{
//   id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
//   contract_id: DataTypes.UUID,
//   reviewer_id: {type: DataTypes.UUID, allowNull: false},
//   reviewee_id: {type: DataTypes.UUID, allowNull: false},
//   rating: {type: DataTypes.INTEGER, validate: {min: 1, max: 5}},
//   comment: DataTypes.TEXT,
// }, {tableName: 'reviews'});       

// //associations
// Job.hasMany(Proposal, {foreignKey: 'job_id'});
// Proposal.belongsTo(Job, {foreignKey: 'job_id'});
// Job.hasMany(Contract, {foreignKey: 'job_id'});
// Contract.belongsTo(Job, {foreignKey: 'job_id'});
// Contract.hasMany(Review, {foreignKey: 'contract_id'});
// Review.belongsTo(Contract, {foreignKey: 'contract_id'});
// module.exports = {Job, Proposal, Contract, Review};