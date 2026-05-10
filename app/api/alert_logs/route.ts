import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type AlertStatus = 'OPEN' | 'ACKED' | 'DISMISSED';
type TabKey = 'OPEN' | 'ACKED' | 'DISMISSED' | 'ALL';

interface Alert {
  id: string;
  status: AlertStatus;
  severity: Severity;
  title: string;
  description: string;
  serviceName: string;
  serviceIcon: string | null;
  createdAt: string;
  acknowledgedAt: string | null;
  dismissedAt: string | null;
}

interface CategoryBarItem {
  label: string;
  count: number;
  total: number;
  color: string;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hr ago`;
  return `${Math.floor(diffMins / 1440)} day ago`;
};

const SEVERITY_STYLES: Record<Severity, { badge: string; dot: string }> = {
  CRITICAL: { badge: "bg-red-600 text-white", dot: "bg-red-600" },
  HIGH: { badge: "bg-red-50 text-red-600 border border-red-200", dot: "bg-red-400" },
  MEDIUM: { badge: "bg-orange-50 text-orange-600 border border-orange-200", dot: "bg-orange-400" },
  LOW: { badge: "bg-gray-100 text-gray-600 border border-gray-200", dot: "bg-gray-400" },
};

// ─── API ENDPOINTS ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab') as TabKey || 'ALL';
    const days = parseInt(searchParams.get('days') || '30');

    // ─── GET ALERTS ─────────────────────────────────────────────────────────────
    const alertsQuery = {
      where: tab === 'ALL' ? {} : { status: tab.toUpperCase() as 'OPEN' | 'ACKED' | 'DISMISSED' },
      orderBy: { createdAt: 'desc' as const },
      take: 50,
    };

    const alerts = await prisma.alert.findMany(alertsQuery);
    const formattedAlerts: Alert[] = alerts.map(alert => ({
      id: alert.id,
      status: alert.status as AlertStatus,
      severity: alert.severity,
      title: alert.title,
      description: alert.description,
      serviceName: alert.serviceName,
      serviceIcon: alert.serviceIcon,
      createdAt: formatTimeAgo(alert.createdAt),
      acknowledgedAt: alert.acknowledgedAt ? formatTimeAgo(alert.acknowledgedAt) : null,
      dismissedAt: alert.dismissedAt ? formatTimeAgo(alert.dismissedAt) : null,
    }));

    // Filter alerts by tab status
    const alertsForTab = tab === 'ALL' ? formattedAlerts : formattedAlerts.filter(alert => alert.status === tab);

    // ─── GET FREQUENCY DATA (24h) ────────────────────────────────────────────────
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const frequencyData = await prisma.alertFrequencyMetric.findMany({
      where: { date: { gte: yesterday } },
      orderBy: { date: 'asc' },
      take: days,
    });

    const frequencyChartData = Array.from({ length: 24 }, (_, i) => {
      const hourData = frequencyData.find(d => d.hour === i);
      return {
        hour: `${i}:00`,
        total: hourData?.totalAlerts || 0,
        critical: hourData?.criticalAlerts || 0,
      };
    });

    // ─── GET HISTORICAL DATA (${days}d opened vs resolved) ─────────────────────────────
    const daysAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    const historicalData = await prisma.alertHistoricalMetric.findMany({
      where: { date: { gte: daysAgo } },
      orderBy: { date: 'asc' },
      take: days,
    });

    const openedResolvedData = historicalData.map((metric, index) => ({
      day: `${index + 1}`,
      opened: metric.openedCount,
      resolved: metric.resolvedCount,
    }));

    // ─── GET CATEGORY BREAKDOWN ───────────────────────────────────────────────────
    const categories = await prisma.alertCategory.findMany({
      include: {
        _count: {
          select: { alerts: true },
        },
      },
    });

    const totalAlerts = await prisma.alert.count();
    const categoryData: CategoryBarItem[] = categories.map(category => ({
      label: category.name,
      count: category._count.alerts,
      total: totalAlerts,
      color: category.color,
    }));

    // ─── GET HEATMAP DATA ─────────────────────────────────────────────────────────
    const heatmapData = await prisma.alertHeatmapMetric.findMany({
      where: { date: { gte: daysAgo } },
      orderBy: { date: 'asc' },
    });

    // Create 7x12 matrix (days x hours)
    const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const HOURS = ["0","2","4","6","8","10","12","14","16","18","20","22"];
    const heatmapMatrix: number[][] = DAYS.map((_, dayIndex) => 
      HOURS.map((_, hourIndex) => {
        const dayOfWeek = dayIndex; // 0 = Sunday
        const data = heatmapData.find(h => h.dayOfWeek === dayOfWeek && h.hour === parseInt(HOURS[hourIndex]));
        return data?.alertCount || 0;
      })
    );

    // ─── CALCULATE KPIS ──────────────────────────────────────────────────────────
    const totalAlertsCount = alerts.length;
    const resolvedRate = totalAlertsCount > 0 
      ? Math.round(((totalAlertsCount - alertsForTab.filter(a => a.status === 'OPEN').length) / totalAlertsCount) * 100)
      : 0;

    // Return all data
    return NextResponse.json({
      alerts: alertsForTab,
      frequencyData: frequencyChartData,
      openedResolvedData,
      categoryData,
      heatmapData: heatmapMatrix,
      severityStyles: SEVERITY_STYLES,
      kpis: {
        totalAlerts: totalAlertsCount,
        resolvedRate: `${resolvedRate}%`,
        mttr: "14 min",
        escalations: 3,
      },
    });

  } catch (error) {
    console.error('Error fetching alert logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, alertId } = await request.json();

    if (action === 'ack') {
      await prisma.alert.update({
        where: { id: alertId },
        data: { 
          status: 'ACKED',
          acknowledgedAt: new Date(),
        },
      });
      return NextResponse.json({ success: true, message: 'Alert acknowledged' });
    }

    if (action === 'dismiss') {
      await prisma.alert.update({
        where: { id: alertId },
        data: { 
          status: 'DISMISSED',
          dismissedAt: new Date(),
        },
      });
      return NextResponse.json({ success: true, message: 'Alert dismissed' });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error updating alert:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}