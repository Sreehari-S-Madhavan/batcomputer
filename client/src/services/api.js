// Batcomputer Central Tactical API Client

const BASE_URL = '/api';

const handleResponse = async (res) => {
  if (!res.ok) {
    throw new Error(`Batcomputer Link Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const fetchBatmanStatus = async () => {
  try {
    const res = await fetch(`${BASE_URL}/batman/status`);
    return await handleResponse(res);
  } catch {
    return {
      status: "BROODING",
      location: "Standing dramatically on a gargoyle",
      suit: "Mark 9000",
      energy: 88,
      mood: "Sternly contemplative",
      current_activity: "Analyzing why this system exists"
    };
  }
};

export const fetchThreat = async () => {
  try {
    const res = await fetch(`${BASE_URL}/gotham/threat`);
    return await handleResponse(res);
  } catch {
    return {
      threat_level: "EXTREME",
      threat_score: 97,
      reason: "Batman feels something in the wind",
      crime_detected: 0,
      message: "Gotham is suspiciously peaceful."
    };
  }
};

export const fetchCrimeStats = async () => {
  try {
    const res = await fetch(`${BASE_URL}/gotham/crime`);
    return await handleResponse(res);
  } catch {
    return {
      crime_detected: 0,
      robberies: 0,
      villains: 0,
      suspicious_clowns: 0,
      suspicious_pigeons: 2,
      stolen_pizzas: 0,
      dramatic_rooftop_incidents: 0,
      missing_socks: 47,
      illegal_bat_signals: 0,
      unexplained_screaming: 0,
      bad_parking: 23,
      late_night_snacking: 156,
      suspicious_umbrella_usage: 12,
      overly_dramatic_posing: 4,
      slow_walking: 89,
      public_humming: 34,
      status: "Gotham is suspiciously peaceful."
    };
  }
};

export const fetchWayneBalance = async () => {
  try {
    const res = await fetch(`${BASE_URL}/wayne/balance`);
    return await handleResponse(res);
  } catch {
    return {
      currency: "USD",
      balance: 84729381204,
      change: "+$3,420,110",
      message: "Bruce made money while brooding."
    };
  }
};

export const fetchGothamWeather = async () => {
  try {
    const res = await fetch(`${BASE_URL}/weather`);
    return await handleResponse(res);
  } catch {
    return {
      temperature: 11,
      unit: "C",
      condition: "Dramatic Fog & Heavy Rain",
      visibility: "Dramatic",
      humidity: 92,
      message: "Ideal weather for a dramatic rooftop entrance."
    };
  }
};

export const fetchSystemDiagnostics = async () => {
  try {
    const res = await fetch(`${BASE_URL}/system`);
    return await handleResponse(res);
  } catch {
    return {
      system: "BATCOMPUTER",
      version: "7.1.0",
      cpu_usage: "99%",
      memory_usage: "78%",
      reason: "Rendering unnecessary bat animations",
      security: "Batman secure",
      alfred_status: "Making tea"
    };
  }
};

export const fetchUselessIntel = async () => {
  try {
    const res = await fetch(`${BASE_URL}/useless`);
    return await handleResponse(res);
  } catch {
    return {
      message: "Justice is loading... Purpose not found."
    };
  }
};

export const fetchMissions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/missions`);
    return await handleResponse(res);
  } catch {
    return {
      total: 10,
      missions: [
        { id: "MISSION-001", name: "Operation Dramatic Entrance", status: "PENDING", description: "Practice dramatic rooftop entrance", priority: "HIGH" },
        { id: "MISSION-002", name: "Project Brooding", status: "IN PROGRESS", description: "Continue brooding in the Batcave", priority: "CRITICAL" },
        { id: "MISSION-003", name: "Alfred Communication", status: "PENDING", description: "Respond to Alfred's tea requests", priority: "MEDIUM" }
      ],
      active_focus: { id: "MISSION-002", name: "Project Brooding", status: "IN PROGRESS", description: "Continue brooding in the Batcave", priority: "CRITICAL" }
    };
  }
};

export const executeMission = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/missions/${id}/execute`, { method: "POST" });
    return await handleResponse(res);
  } catch {
    return {
      id,
      name: "Tactical Operation",
      status: "EXTREMELY PENDING",
      outcome: "Mission postponed. Batman resumed brooding.",
      justice_level: "Unchanged (100%)"
    };
  }
};

export const fetchAlfredComms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/messages/alfred`);
    return await handleResponse(res);
  } catch {
    return {
      sender: "Alfred Pennyworth",
      channel: "SECURE_BUTLER_FEED",
      timestamp: new Date().toLocaleTimeString(),
      message: "Threat level is 97%. Crime level is 0%. I recommend ignoring both, sir."
    };
  }
};

export const triggerVillainScan = async () => {
  const res = await fetch(`${BASE_URL}/scan/villains`, { method: "POST" });
  return await handleResponse(res);
};

export const triggerBatSignal = async () => {
  const res = await fetch(`${BASE_URL}/signal/bat-signal`, { method: "POST" });
  return await handleResponse(res);
};

export const triggerEmergencyProtocol = async () => {
  const res = await fetch(`${BASE_URL}/emergency`, { method: "POST" });
  return await handleResponse(res);
};
