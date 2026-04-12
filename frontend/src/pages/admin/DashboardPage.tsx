import { useAuth } from '../../context/AuthContext';
import { CanAccess } from '../../components/CanAccess';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { MOCK_JOBS, MOCK_USERS } from '../../lib/mockData';
import type { Role } from '../../types';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBookmarkSlash, HiOutlineCheckCircle, HiOutlineMinusCircle, HiOutlineShieldCheck, HiOutlineUsers } from 'react-icons/hi2'

const ROLES: Role[] = ['admin', 'moderator', 'user', 'guest'];

const STAT_CARDS = [
  {
    label: 'Total Users',
    getValue: (u: typeof MOCK_USERS) => u.length,
    getSub: (u: typeof MOCK_USERS) => `↑ ${u.filter(x => x.status === 'active').length} active`,
    subColor: 'text-primary',
    iconBg: 'bg-primary/10',
    icon: <HiOutlineUsers className="h-5 w-5 text-primary" />
  },
  {
    label: 'Active',
    getValue: (u: typeof MOCK_USERS) => u.filter(x => x.status === 'active').length,
    getSub: (u: typeof MOCK_USERS) => `${u.filter(x => x.status === 'pending').length} pending`,
    subColor: 'text-amber-400',
    iconBg: 'bg-blue-500/10',
    icon: <HiOutlineCheckCircle className="w-5 h-5 text-blue-400" />
  },
  {
    label: 'Roles',
    getValue: () => 4,
    getSub: () => 'admin · mod · user · guest',
    subColor: 'text-muted-foreground',
    iconBg: 'bg-purple-500/10',
    icon: <HiOutlineShieldCheck className="w-5 h-5 text-purple-400" />
  },
  {
    label: 'Suspended',
    getValue: (u: typeof MOCK_USERS) => u.filter(x => x.status === 'suspended').length,
    getSub: () => 'accounts restricted',
    subColor: 'text-muted-foreground',
    iconBg: 'bg-destructive/10',
    icon: <HiOutlineMinusCircle className="w-5 h-5 text-destructive" />
	}
];

const JOB_STATUS_STYLES = {
  active:  { badge: 'bg-primary/10 text-primary border-primary/20', dot: 'bg-primary' },
  closed:  { badge: 'bg-muted text-muted-foreground border-border', dot: 'bg-muted-foreground' },
  flagged: { badge: 'bg-destructive/10 text-destructive border-destructive/20', dot: 'bg-destructive' },
  draft:   { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-400' },
} as const;

export const DashboardPage = () => {
  const { user } = useAuth();
	const navigate = useNavigate();

	function manageUser() {navigate('/admin/users');}
	function manageJobs() {navigate('/admin/jobs');}

	const recentJobs = [...MOCK_JOBS].sort((a, b) => {
		if(a.status === 'flagged' && b.status !== 'flagged') return -1;
		if(b.status === 'flagged' && a.status !== 'flagged') return 1;
		return 0;
	}).slice(0, 5);

	const flaggedCount = MOCK_JOBS.filter(j => j.status === 'flagged').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here's what's happening with your platform today.
        </p>
      </div>

      
      <div className="grid grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(card => (
          <div key={card.label} className="bg-card border border-border p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-foreground">{card.getValue(MOCK_USERS)}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}>
                {card.icon}
              </div>
            </div>
            <p className={`text-xs ${card.subColor}`}>{card.getSub(MOCK_USERS)}</p>
          </div>
        ))}
      </div>

      
      <CanAccess minRole="moderator">
        <div className="bg-card border border-border overflow-hidden mb-6">
          <div className="px-6 py-4 flex items-center justify-between border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent Users</h2>
            <a href="/admin/users" className="text-xs text-primary hover:text-primary-light font-medium transition-colors">
              View all
            </a>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_USERS.slice(0, 5).map(u => (
                <tr key={u.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5"><RoleBadge role={u.role} /></td>
                  <td className="px-6 py-3.5 text-xs text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                      u.status === 'active'    ? 'bg-primary/10 text-primary border-primary/20' :
                      u.status === 'suspended' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                                                 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button onClick={manageUser} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CanAccess>

			<CanAccess minRole="moderator">
			 <div className='bg-card border border-border overflow-hidden mb-6'>
				<div className='px-6 py-4 flex items-center justify-between border-b border-border'>
					<div className='flex items-center gap-3'>
						<h2 className='text-sm font-semibold text-foreground'>Recent Jobs</h2>
						{flaggedCount > 0 && (
							<span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                {flaggedCount} flagged
              </span>
						)}
					</div>
					<button onClick={manageJobs} className="text-xs text-primary hover:text-primary-light font-medium transition-colors">View all</button>
				</div>
				<table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Job</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Budget</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Proposals</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentJobs.map(job => {
                const s = JOB_STATUS_STYLES[job.status];
                const budget = job.budgetType === 'hourly' ? `$${job.budget}/hr` : `$${job.budget.toLocaleString()}`;
                return (
                  <tr key={job.id}
                    	className={`hover:bg-secondary/40 transition-colors ${job.status === 'flagged' ? 'bg-destructive/5' : ''}`}>
                    <td className="px-6 py-3.5 max-w-[220px]">
                      <div className="flex items-center gap-2">
                        {job.status === 'flagged' && (
                          <HiOutlineBookmarkSlash className="w-3.5 h-3.5 text-destructive shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{job.title}</p>
                          <p className="text-xs text-muted-foreground">{job.category}</p>
                        </div>
                      </div>
                    </td>
 
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
                          {job.postedByAvatar}
                        </div>
                        <span className="text-sm text-foreground">{job.postedByName}</span>
                      </div>
                    </td>
 
                    <td className="px-6 py-3.5">
                      <span className="text-sm font-medium text-foreground">{budget}</span>
                    </td>
 
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-foreground">
                          {job.proposalCount}
                        </span>
                      </div>
                    </td>
 
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${s.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>
 
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={manageJobs}
                        className={`text-xs font-medium transition-colors ${
                          job.status === 'flagged' ? 'text-destructive hover:text-destructive/80' : 'text-muted-foreground hover:text-primary'
                        }`}>
                        {job.status === 'flagged' ? 'Review' : 'Manage'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
			 </div>
			</CanAccess>

      <CanAccess minRole="moderator">
        <div className="bg-card border border-border p-6">
          <h2 className="text-sm font-semibold text-foreground mb-5">Users by role</h2>
          <div className="space-y-3">
            {ROLES.map(role => {
              const count = MOCK_USERS.filter(u => u.role === role).length;
              const pct   = Math.round((count / MOCK_USERS.length) * 100);
              return (
                <div key={role} className="flex items-center gap-4">
                  <div className="w-24 shrink-0"><RoleBadge role={role} size="sm" /></div>
                  <div className="flex-1 bg-background rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%`, opacity: role === 'admin' ? 1 : role === 'moderator' ? 0.75 : role === 'user' ? 0.5 : 0.3 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-right tabular-nums">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </CanAccess>
    </div>
  );
}