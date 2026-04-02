'use client'

import { useState, useEffect } from 'react'
import GlassCard from '@/components/GlassCard'
import ScoreRing from '@/components/ScoreRing'
import { getDashboardMetrics, getWeeklyTrends, getSkillDistribution, getCategoryStats, type DashboardMetrics } from '@/lib/api'

const PERIODS = ['Today', 'This Week', 'This Month', 'All Time'] as const
const PERIOD_KEYS: Record<(typeof PERIODS)[number], string> = {
  'Today': 'today',
  'This Week': 'this_week',
  'This Month': 'this_month',
  'All Time': 'all_time',
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>('All Time')
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [trends, setTrends] = useState<{ dates: string[]; submissions: number[] } | null>(null)
  const [skills, setSkills] = useState<{ categories: string[]; counts: number[] } | null>(null)
  const [categoryStats, setCategoryStats] = useState<{ categories: string[]; success_rates: number[] } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getDashboardMetrics().catch(() => null),
      getWeeklyTrends().catch(() => null),
      getSkillDistribution().catch(() => null),
      getCategoryStats().catch(() => null),
    ]).then(([m, t, s, c]) => {
      if (m) setMetrics(m)
      if (t) setTrends(t)
      if (s) setSkills(s)
      if (c) setCategoryStats(c)
      setLoading(false)
    })
  }, [])

  const currentStats = metrics?.[PERIOD_KEYS[period]]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2 stagger-1">
        <p className="label">Performance Metrics</p>
        <h1 className="font-display text-3xl font-semibold tracking-wider text-text-primary uppercase">
          Dashboard
        </h1>
      </div>

      {/* Period Tabs */}
      <div className="flex gap-6 border-b border-border-subtle">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`
              font-display text-xs tracking-[0.2em] uppercase pb-3 transition-all duration-200 border-b-2
              ${period === p
                ? 'text-text-primary border-text-primary'
                : 'text-text-muted border-transparent hover:text-text-secondary'
              }
            `}
          >
            {p}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-sm font-body animate-pulse-subtle">Loading metrics...</p>
        </div>
      ) : (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <GlassCard>
              <div className="flex flex-col items-center gap-3">
                <span className="font-display text-4xl font-semibold text-text-primary">
                  {currentStats?.total_resumes ?? 0}
                </span>
                <span className="label">Total Resumes</span>
              </div>
            </GlassCard>
            <GlassCard>
              <ScoreRing score={Math.round(currentStats?.avg_ats_score ?? 0)} label="Avg ATS" />
            </GlassCard>
            <GlassCard>
              <ScoreRing score={Math.round(currentStats?.avg_keyword_score ?? 0)} label="Avg Keywords" />
            </GlassCard>
            <GlassCard>
              <div className="flex flex-col items-center gap-3">
                <span className="font-display text-4xl font-semibold text-score-high">
                  {currentStats?.high_scoring ?? 0}
                </span>
                <span className="label">High Scoring</span>
              </div>
            </GlassCard>
          </div>

          {/* Data Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassCard title="Weekly Submissions">
              {trends && trends.dates.length > 0 ? (
                <div className="space-y-3">
                  {trends.dates.map((date, i) => (
                    <div key={date} className="flex items-center gap-4">
                      <span className="text-text-muted text-xs font-body w-12 shrink-0">{date}</span>
                      <div className="flex-1 h-2 bg-border-subtle rounded-full overflow-hidden">
                        <div
                          className="h-full bg-text-secondary rounded-full transition-all"
                          style={{ width: `${Math.max(trends.submissions[i] * 10, 2)}%` }}
                        />
                      </div>
                      <span className="text-text-secondary text-xs font-body w-6 text-right">{trends.submissions[i]}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted text-xs font-body text-center py-8">No submission data yet</p>
              )}
            </GlassCard>

            <GlassCard title="Skill Distribution">
              {skills && skills.categories.length > 0 ? (
                <div className="space-y-3">
                  {skills.categories.map((cat, i) => (
                    <div key={cat} className="flex items-center gap-4">
                      <span className="text-text-muted text-xs font-body w-24 shrink-0 truncate">{cat}</span>
                      <div className="flex-1 h-2 bg-border-subtle rounded-full overflow-hidden">
                        <div
                          className="h-full bg-text-secondary rounded-full transition-all"
                          style={{ width: `${Math.max(skills.counts[i] * 10, 2)}%` }}
                        />
                      </div>
                      <span className="text-text-secondary text-xs font-body w-6 text-right">{skills.counts[i]}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted text-xs font-body text-center py-8">No skill data yet</p>
              )}
            </GlassCard>

            <GlassCard title="Category Performance">
              {categoryStats && categoryStats.categories.length > 0 ? (
                <div className="space-y-3">
                  {categoryStats.categories.map((cat, i) => (
                    <div key={cat} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                      <span className="text-text-secondary text-sm font-body">{cat}</span>
                      <span className="font-display text-sm text-text-primary">{categoryStats.success_rates[i]}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted text-xs font-body text-center py-8">No category data yet</p>
              )}
            </GlassCard>

            <GlassCard title="Overview">
              <div className="space-y-4 py-4">
                <div className="flex justify-between">
                  <span className="label">Period</span>
                  <span className="text-text-secondary text-sm font-body">{period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="label">Resumes Analyzed</span>
                  <span className="text-text-secondary text-sm font-body">{currentStats?.total_resumes ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="label">Avg ATS Score</span>
                  <span className="text-text-secondary text-sm font-body">{Math.round(currentStats?.avg_ats_score ?? 0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="label">High Scoring</span>
                  <span className="text-text-secondary text-sm font-body">{currentStats?.high_scoring ?? 0}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </>
      )}
    </div>
  )
}
