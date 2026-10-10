import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  CORRIDOR_KPIS,
  EMISSIONS_TREND_DATA,
  FUEL_DISTRIBUTION_DATA,
  RECENT_VOYAGES,
} from '../../data/mockAnalytics';
import {
  TrendingDown,
  TrendingUp,
  Ship,
  Sparkles,
  ArrowUpRight,
  Info,
} from 'lucide-react';

interface AnalyticsPreviewProps {
  onExploreAnalytics?: () => void;
}

export const AnalyticsPreview: React.FC<AnalyticsPreviewProps> = ({
  onExploreAnalytics,
}) => {
  return (
    <section id="analytics" className="py-20 lg:py-28 bg-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sustainability-green bg-sustainability-light px-3 py-1 rounded-full border border-sustainability-green/30 inline-block">
            MEASURABLE MARITIME PROGRESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-maritime-dark tracking-tight">
            Turn Verified Data Into Meaningful Decisions.
          </h2>
          <p className="text-base sm:text-lg text-slate-text leading-relaxed font-normal">
            A preview of how corridor operators and authorities monitor cross-border carbon abatement, fuel transition milestones, and green berthing incentives.
          </p>
        </div>

        {/* Dashboard Frame (White Card with Elevation) */}
        <div className="bg-white rounded-3xl border border-slate-subtle/80 shadow-elevated overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="bg-maritime-navy px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-warm-white border-b border-maritime-border">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-sustainability-green animate-pulse"></span>
              <div>
                <h3 className="text-sm font-bold tracking-tight">
                  GreenPulse Corridor Sustainability Intelligence
                </h3>
                <span className="text-[11px] text-slate-subtle block">
                  Bilateral Testbed • JNPA (Mumbai) / Chennai ⇄ Singapore PSA
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] bg-maritime-surface px-3 py-1 rounded-full border border-maritime-border text-mint-soft font-mono">
                Model: IMO CII 2026 Ready
              </span>
            </div>
          </div>

          {/* 4 Illustrative KPI Cards */}
          <div className="p-6 lg:p-8 border-b border-slate-subtle/60 bg-warm-white/40">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CORRIDOR_KPIS.map((kpi) => (
                <div
                  key={kpi.id}
                  className="bg-white p-5 rounded-2xl border border-slate-subtle/80 shadow-subtle flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-muted uppercase tracking-wider">
                      {kpi.label}
                    </span>
                    {kpi.trendDirection === 'down' ? (
                      <span className="p-1 rounded bg-mint-pale text-sustainability-green">
                        <TrendingDown className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="p-1 rounded bg-sky-50 text-sky-700">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-3xl font-display font-extrabold text-maritime-dark">
                      {kpi.value}
                    </span>
                    {kpi.unit && (
                      <span className="text-xs font-medium text-slate-muted">
                        {kpi.unit}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-subtle/50 text-[11px] flex flex-col gap-0.5">
                    <span className="font-semibold text-sustainability-green">
                      {kpi.trendText}
                    </span>
                    <span className="text-slate-muted truncate">
                      {kpi.helperText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Row */}
          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Chart: Emissions Trajectory (7 cols) */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-subtle/80 shadow-subtle">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-subtle/50 gap-2">
                <div>
                  <h4 className="text-sm font-bold text-maritime-dark">
                    Corridor Emissions Trend (kt CO₂e)
                  </h4>
                  <p className="text-[11px] text-slate-muted">
                    Standard Baseline vs. Verified Corridor Actual Voyages
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-slate-muted">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                    <span>Standard</span>
                  </span>
                  <span className="flex items-center gap-1 text-sustainability-green font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-sustainability-green"></span>
                    <span>Corridor Verified</span>
                  </span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={EMISSIONS_TREND_DATA}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      domain={[25, 50]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#102D3A',
                        borderRadius: '8px',
                        color: '#FAFBF8',
                        fontSize: '12px',
                        border: 'none',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="standardVoyages"
                      name="Standard Baseline"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="corridorVerified"
                      name="Verified Actual"
                      stroke="#2F8F68"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#2F8F68' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Chart: Fuel Categories Abatement Breakdown (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-subtle/80 shadow-subtle">
              <div className="pb-4 mb-4 border-b border-slate-subtle/50">
                <h4 className="text-sm font-bold text-maritime-dark">
                  Bunkered Fuel Category Distribution
                </h4>
                <p className="text-[11px] text-slate-muted">
                  Share of registered corridor fuel volume & abatement rating
                </p>
              </div>

              <div className="space-y-3.5">
                {FUEL_DISTRIBUTION_DATA.map((fuel) => (
                  <div key={fuel.fuelType} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-dark">
                        {fuel.fuelType}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-sustainability-green font-bold">
                          {fuel.reductionScore}
                        </span>
                        <span className="text-slate-muted">
                          {fuel.sharePercentage}%
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${fuel.sharePercentage}%`,
                          backgroundColor: fuel.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-xl bg-ocean-subtle border border-ocean-border text-[11px] text-slate-text flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <span>
                  High-blend Bio-Methanol and B24 qualify for Class-A green port rebate status at Singapore and JNPA.
                </span>
              </div>
            </div>

          </div>

          {/* Sample Activity Table */}
          <div className="p-6 lg:p-8 bg-warm-white/60 border-t border-slate-subtle/60">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
                <Ship className="w-4 h-4 text-sustainability-green" />
                <span>Recent Corridor Voyage Verifications</span>
              </h4>
              <span className="text-[11px] text-slate-muted">
                Showing 4 latest records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-subtle/80 text-[11px] font-bold uppercase tracking-wider text-slate-muted">
                    <th className="pb-2.5 font-semibold">Voyage ID</th>
                    <th className="pb-2.5 font-semibold">Vessel</th>
                    <th className="pb-2.5 font-semibold">Corridor Transit</th>
                    <th className="pb-2.5 font-semibold">Fuel Mix</th>
                    <th className="pb-2.5 font-semibold">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-subtle/50 text-slate-dark">
                  {RECENT_VOYAGES.map((v) => (
                    <tr key={v.id} className="hover:bg-white/80 transition-colors">
                      <td className="py-3 font-mono font-bold text-maritime-navy">
                        {v.id}
                      </td>
                      <td className="py-3 font-semibold">
                        {v.vesselName}
                      </td>
                      <td className="py-3 text-slate-text">
                        {v.route}
                      </td>
                      <td className="py-3 text-slate-text">
                        {v.fuelType}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            v.statusColor === 'green'
                              ? 'bg-mint-soft text-sustainability-hover'
                              : v.statusColor === 'blue'
                              ? 'bg-ocean-blue text-sky-800'
                              : v.statusColor === 'amber'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Illustrative Disclaimer and CTA Footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-muted">
              <Info className="w-4 h-4 text-slate-light shrink-0" />
              <span>
                Illustrative interface preview — sample data, not live corridor statistics.
              </span>
            </div>

            <button
              onClick={onExploreAnalytics}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs text-warm-white bg-maritime-navy hover:bg-maritime-surface transition-all shadow-sm"
            >
              <span>Explore Sustainability Intelligence</span>
              <ArrowUpRight className="w-4 h-4 text-sustainability-green" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
