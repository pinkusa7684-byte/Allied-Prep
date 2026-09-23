import React, { useState } from 'react';
import { Flag, X, Check, AlertCircle } from 'lucide-react';
import { MCQQuestion } from '../../types';

interface ReportQuestionModalProps {
  question: MCQQuestion;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (reason: string, details: string) => void;
}

export const ReportQuestionModal: React.FC<ReportQuestionModalProps> = ({
  question,
  isOpen,
  onClose,
  onSubmitReport,
}) => {
  const [selectedReason, setSelectedReason] = useState('Incorrect Answer Key');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const reasons = [
    'Incorrect Answer Key',
    'Typographical / Grammatical Error',
    'Ambiguous / Confusing Question',
    'Outdated Syllabus / Fact',
    'Explanation Inadequate',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(selectedReason, details);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDetails('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Report Question</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Thank you for reporting!</h4>
            <p className="text-xs text-slate-500">
              Our academic medical review committee will verify this question shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700">
              <p className="font-semibold text-slate-900 truncate">Q: {question.question}</p>
              <p className="text-slate-500 mt-0.5">Topic: {question.topic} • ID: {question.id}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Issue Category</label>
              <div className="space-y-1.5">
                {reasons.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedReason === r
                        ? 'bg-blue-50/70 border-blue-900 text-blue-950 font-semibold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={r}
                      checked={selectedReason === r}
                      onChange={() => setSelectedReason(r)}
                      className="text-blue-900 focus:ring-blue-900"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Additional Details (Optional)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Explain why the option or key may be incorrect..."
                rows={3}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
