import React, { useState } from 'react';
import { X, Shield, Ship, Fuel, Anchor, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole?: string;
}

export const RoleModal: React.FC<RoleModalProps> = ({
  isOpen,
  onClose,
  selectedRole = 'Shipping Companies',
}) => {
  const [activeRole, setActiveRole] = useState(selectedRole);
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const roles = [
    {
      id: 'Shipping Companies',
      icon: Ship,
      color: 'text-sustainability-green',
      scope: 'Fleet Voyage Plans & BDN Submissions',
      badge: 'Operator Portal',
      description: 'Manage registered vessels, submit BDNs, review route carbon intensity, and view port clearance readiness.',
    },
    {
      id: 'Fuel Suppliers & Bunkers',
      icon: Fuel,
      color: 'text-sky-700',
      scope: 'Certified Fuel Batches & Mass-Balance Proof',
      badge: 'Supplier Portal',
      description: 'Upload certified biofuel/methanol batch data, verify physical delivery meters, and certify chain-of-custody.',
    },
    {
      id: 'Port Authorities',
      icon: Anchor,
      color: 'text-emerald-700',
      scope: 'Just-in-Time Berth Scheduling & Shore Power',
      badge: 'Port Operations',
      description: 'Coordinate Just-in-Time arrival windows at Singapore & Indian ports, monitor low-emission vessel queues.',
    },
    {
      id: 'Government & Policy Makers',
      icon: Landmark,
      color: 'text-maritime-navy',
      scope: 'Corridor Decarbonization Audits & Tariff Rebates',
      badge: 'Regulatory Oversight',
      description: 'Review macro corridor GHG reductions, inspect verified audit trails, and calculate green port rebate funding.',
    },
  ];

  const handleSimulateLogin = () => {
    setLoginStatus(`Authenticated successfully. Redirecting to ${activeRole} workspace...`);
    setTimeout(() => {
      setLoginStatus(null);
      onClose();
      window.location.href = '/dashboard';
    }, 1200);
  };

  const currentRoleData = roles.find((r) => r.id === activeRole) || roles[0];
  const IconComp = currentRoleData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maritime-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-subtle/80 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-muted hover:text-maritime-dark hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sustainability-light border border-sustainability-green/40 flex items-center justify-center text-sustainability-green">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-display font-extrabold text-maritime-dark">
              Corridor Access Portal
            </h3>
            <span className="text-xs text-slate-muted">
              Select your organization type to preview role permissions
            </span>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {roles.map((r) => {
            const RIcon = r.icon;
            const isSelected = activeRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveRole(r.id)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'border-sustainability-green bg-sustainability-subtle text-maritime-navy shadow-sm'
                    : 'border-slate-subtle/80 hover:bg-slate-50 text-slate-text'
                }`}
              >
                <RIcon className={`w-4 h-4 shrink-0 ${r.color}`} />
                <div className="truncate">
                  <span className="text-xs font-bold block truncate">
                    {r.id}
                  </span>
                  <span className="text-[10px] text-slate-muted block truncate">
                    {r.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Scope Card */}
        <div className="bg-warm-white rounded-2xl p-5 border border-slate-subtle mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <IconComp className={`w-5 h-5 ${currentRoleData.color}`} />
              <h4 className="text-sm font-bold text-maritime-dark">
                {currentRoleData.id} Scope
              </h4>
            </div>
            <span className="text-[10px] font-bold bg-mint-pale text-sustainability-green px-2 py-0.5 rounded-full">
              Verified Key
            </span>
          </div>
          <p className="text-xs text-slate-text leading-relaxed mb-3">
            {currentRoleData.description}
          </p>
          <div className="pt-2 border-t border-slate-subtle/50 text-[11px] text-slate-muted flex items-center gap-1.5 font-mono">
            <span className="font-semibold text-maritime-navy">Authorized Scope:</span>
            <span className="truncate">{currentRoleData.scope}</span>
          </div>
        </div>

        {/* Simulate Login action */}
        {loginStatus ? (
          <div className="p-3 rounded-xl bg-mint-soft text-sustainability-hover text-xs font-semibold flex items-center gap-2 justify-center">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{loginStatus}</span>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 text-xs font-semibold text-slate-muted hover:text-maritime-dark"
            >
              Cancel
            </button>
            <button
              onClick={handleSimulateLogin}
              type="button"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-warm-white bg-sustainability-green hover:bg-sustainability-hover active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-sustainability-green/20"
            >
              <span>Access {activeRole} Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
