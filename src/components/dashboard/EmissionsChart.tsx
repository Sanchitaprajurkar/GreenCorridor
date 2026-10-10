import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  MOCK_EMISSIONS_30D,
  MOCK_EMISSIONS_90D,
  MOCK_EMISSIONS_YTD,
} from '../../data/dashboardMockData';
import { TrendingDown, Sparkles, AlertCircle } from 'lucide-react';

interface EmissionsChartProps {
  currentRange?: string;
}

export const EmissionsChart: React.FC<EmissionsChartProps> = ({ currentRange = '30D' }) => {
  const [activeTab, setActiveTab] = useState<'30D' | '90D' | 'YTD'>((currentRange as any) || '30D');

  const getData = () => {
    switch (activeTab) {
      case '90D':
        return MOCK_EMISSIONS_90D;
      case 'YTD':
        return MOCK_EMISSIONS_YTD;
      case '30D':
      default:
        return MOCK_EMISSIONS_30D;
    }
  };

  const chartData = getData();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-subtle/80 shadow-subtle flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-subtle/60 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-display font-bold text-maritime-dark">
              Voyage & Emissions Trends
            </h2>
            <span className="text-[10px] bg-sustainability-light text-sustainability-green px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              <span>-18.4% Abatement</span>
            </span>
          </div>
          <p className="text-xs text-slate-muted">
            Well-to-Wake (WtW) carbon emissions: Standard Baseline vs. Estimated vs. Verified
          </p>
        </div>

        {/* Range Toggle Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs">
          {(['30D', '90D', 'YTD'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-maritime-dark shadow-subtle'
                  : 'text-slate-muted hover:text-maritime-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      {chartData.length === 0 ? (
        <div className="h-72 flex flex-col items-center justify-center text-slate-muted">
          <AlertCircle className="w-8 h-8 mb-2 text-slate-300" />
          <p className="text-xs font-semibold">No emissions data for selected range.</p>
        </div>
      ) : (
        <div className="h-72 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                unit="t"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#102D3A',
                  borderRadius: '12px',
                  color: '#FAFBF8',
                  fontSize: '12px',
                  border: 'none',
                  boxShadow: '0 8px 24px rgba(16, 45, 58, 0.2)',
                }}
                formatter={(value: any, name: any) => [`${value} tonnes CO₂e`, name]}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="baselineEmissions"
                name="IMO Standard Baseline"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="estimatedEmissions"
                name="GreenTwin Estimated"
                stroke="#38bdf8"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="verifiedEmissions"
                name="FuelTrust Verified"
                stroke="#2F8F68"
                strokeWidth={3}
                dot={{ r: 4, fill: '#2F8F68' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Footer Callout */}
      <div className="mt-4 pt-3 border-t border-slate-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-muted gap-2">
        <div className="flex items-center gap-1.5 text-maritime-navy font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sustainability-green" />
          <span>Calculations adhere to IMO Marine Environment Protection Committee (MEPC) guidelines.</span>
        </div>
        <span className="italic">Illustrative sample dataset</span>
      </div>

    </div>
  );
};
