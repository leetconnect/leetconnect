// shared constants, use these instead of raw strings to avoid typos
// roles: user roles : client freelancer admin
// job_status / proposal_status / contract_status: marketplace lifecycle (ner-roui)
// friendship_status: friend system (noben-ai)
// events: redis event names for inter-service communication (noben-ai, ner-roui, adbouras publish — abmahfou subscribes)
// services: internal urls to call other services via rest

const ROLES = { CLIENT: 'client', FREELANCER: 'freelancer', ADMIN: 'admin' };
const JOB_STATUS = { OPEN: 'open', IN_PROGRESS: 'in_progress', COMPLETED: 'completed', CLOSED: 'closed' };
const PROPOSAL_STATUS = { PENDING: 'pending', ACCEPTED: 'accepted', REJECTED: 'rejected' };
const CONTRACT_STATUS = { DRAFT: 'draft', ACTIVE: 'active', COMPLETED: 'completed', PAID: 'paid', DISPUTED: 'disputed' };
const FRIENDSHIP_STATUS = { PENDING: 'pending', ACCEPTED: 'accepted', BLOCKED: 'blocked' };
const EVENTS = {
    USER_REGISTERED: 'user.registered', USER_ONLINE: 'user.online', USER_OFFLINE: 'user.offline',
    JOB_CREATED: 'job.created', PROPOSAL_RECEIVED: 'proposal.received',
    CONTRACT_COMPLETED: 'contract.completed', MESSAGE_SENT: 'message.sent',
};
const SERVICES = {
    AUTH: process.env.AUTH_SERVICE_URL || 'http://auth:3001',
    MARKETPLACE: process.env.MARKETPLACE_SERVICE_URL || 'http://marketplace:3002',
    CHAT: process.env.CHAT_SERVICE_URL || 'http://chat:3003',
    ANALYTICS: process.env.ANALYTICS_SERVICE_URL || 'http://analytics:3004',
    ADMIN: process.env.ADMIN_SERVICE_URL || 'http://admin:3005',
};
module.exports = { ROLES, JOB_STATUS, PROPOSAL_STATUS, CONTRACT_STATUS, FRIENDSHIP_STATUS, EVENTS, SERVICES };