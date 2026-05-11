"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const socketIOClient = require("socket.io-client");

export interface ThreatAnalysisData {
  status: "secure" | "threat_detected";
  isSecure: boolean;
  kpis: {
    activeThreats: number;
    critical: number;
    high: number;
    medium: number;
    suspiciousLogins: number;
    botAttacks: number;
    apiAbuse: number;
    trafficSpikes: number;
    geoAnomalies: number;
    failedOtps: number;
    badIpScore: number;
    deviceMismatch: number;
    aiConfidence: number;
  };
  chartData: Array<{ hour: string; failed: number; critical: number }>;
  severityDistribution: Array<{ name: string; value: number; color: string }>;
  liveFeed: Array<{
    ip: string;
    country: string;
    label: string;
    path: string;
    time: string;
    severity: "critical" | "high" | "medium" | "low";
  }>;
  heatmap: Array<{ code: string; name: string; x: number; y: number; requests: number; intensity: number }>;
  registry: Array<{
    ip: string;
    country: string;
    type: string;
    score: number;
    severity: "critical" | "high" | "medium" | "low";
    lastSeen: string;
    action: string;
  }>;
  anomaly: {
    confidence: number;
    signals: Array<{ label: string; value: number }>;
  };
  settings: Array<{ key: string; label: string; enabled: boolean }>;
}

export interface FraudMonitoringData {
  kpis: {
    fraudRiskIndex: number;
    fakeAccountsBlocked: number;
    accountTakeovers: number;
    botTraffic: number;
  };
  anomalySeries: Array<{ day: string; score: number }>;
  distribution: Array<{ name: string; value: number }>;
  profiles: Array<{
    user: string;
    email: string;
    riskScore: number;
    signal: string;
    devices: number;
    edits: number;
    geo: string;
    status: string;
  }>;
  suspiciousEdits: Array<{
    title: string;
    actor: string;
    time: string;
    severity: string;
  }>;
  deviceAnomalies: Array<{
    label: string;
    detail: string;
    value: number;
  }>;
}

export interface SecurityStreamData {
  timestamp: string;
  threatAnalysis: ThreatAnalysisData;
  fraudMonitoring: FraudMonitoringData;
}

interface UseSecurityStreamOptions {
  enabled?: boolean;
}

export function useSecurityStream(options: UseSecurityStreamOptions = {}) {
  const { enabled = true } = options;

  const [data, setData] = useState<SecurityStreamData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const socketRef = useRef<any>(null);

  const connect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = (socketIOClient as any).io({
      path: "/api/socketio",
      addTrailingSlash: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      setIsLoading(false);
      setError(null);
      socket.emit("subscribe", "security");
    });

    socket.on("security:update", (payload: SecurityStreamData) => {
      setData(payload);
    });

    socket.on("threat:update", (payload: ThreatAnalysisData) => {
      setData((prev: SecurityStreamData | null) => prev ? { ...prev, threatAnalysis: payload } : null);
    });

    socket.on("fraud:update", (payload: FraudMonitoringData) => {
      setData((prev: SecurityStreamData | null) => prev ? { ...prev, fraudMonitoring: payload } : null);
    });

    socket.on("disconnect", (reason: string) => {
      setIsConnected(false);
    });

    socket.on("connect_error", (err: Error) => {
      setError(`Connection error: ${err.message}`);
      setIsLoading(false);
    });
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const refresh = useCallback(() => {
    disconnect();
    if (enabled) {
      connect();
    }
  }, [enabled, connect, disconnect]);

  useEffect(() => {
    if (enabled) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  return {
    data,
    isConnected,
    error,
    isLoading,
    refresh,
  };
}

export function useThreatAnalysis() {
  const { data, isConnected, error, isLoading, refresh } = useSecurityStream();

  return {
    data: data?.threatAnalysis ?? null,
    isConnected,
    error,
    isLoading,
    refresh,
  };
}

export function useFraudMonitoring() {
  const { data, isConnected, error, isLoading, refresh } = useSecurityStream();

  return {
    data: data?.fraudMonitoring ?? null,
    isConnected,
    error,
    isLoading,
    refresh,
  };
}