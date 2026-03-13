import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface DebugSection {
  label: string;
  data: unknown;
}

interface DebugPanelProps {
  title: string;
  sections: DebugSection[];
}

/** 是否顯示 Debug 面板：僅當 VITE_DEBUG_PANEL=true 時顯示，其餘皆為正常模式 */
const SHOW_DEBUG_PANEL = String(import.meta.env.VITE_DEBUG_PANEL ?? '').toLowerCase() === 'true';

const DebugPanel: React.FC<DebugPanelProps> = ({ title, sections }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!SHOW_DEBUG_PANEL) return null;

  const formatData = (data: unknown): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <div className="mt-8 border-2 border-amber-200 rounded-2xl bg-amber-50/80 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-black text-gray-800 hover:bg-amber-100/80 transition-colors"
      >
        <span className="text-lg">🔧 {title}</span>
        {isExpanded ? (
          <ChevronDown className="w-6 h-6 text-amber-600" />
        ) : (
          <ChevronRight className="w-6 h-6 text-amber-600" />
        )}
      </button>
      {isExpanded && (
        <div className="border-t border-amber-200 p-6 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx}>
              <div className="text-sm font-black text-amber-700 uppercase tracking-wider mb-2">
                {section.label}
              </div>
              <pre className="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto max-h-96 overflow-y-auto">
                {formatData(section.data)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
