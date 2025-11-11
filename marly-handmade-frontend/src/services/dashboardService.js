// src/services/dashboardService.js

// Configuración de la API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Función para obtener todos los datos del dashboard
export const getDashboardData = async () => {
  try {
    // TODO: Cuando tengas el backend listo, descomenta esto:
    // const response = await fetch(`${API_BASE_URL}/dashboard`);
    // if (!response.ok) throw new Error('Error fetching dashboard data');
    // return await response.json();

    // Por ahora retornamos datos simulados (mock data)
    return getMockDashboardData();
  } catch (error) {
    console.error('Error in getDashboardData:', error);
    throw error;
  }
};

// Función para obtener ventas por representante
export const getSalesByRep = async () => {
  try {
    // TODO: Reemplazar con llamada real
    // const response = await fetch(`${API_BASE_URL}/sales-by-rep`);
    // return await response.json();
    
    return [
      { name: 'Ana García', sales: 250, avatar: 'AG' },
      { name: 'Carlos López', sales: 180, avatar: 'CL' },
      { name: 'María Torres', sales: 220, avatar: 'MT' },
      { name: 'Juan Pérez', sales: 280, avatar: 'JP' },
      { name: 'Laura Ruiz', sales: 240, avatar: 'LR' }
    ];
  } catch (error) {
    console.error('Error in getSalesByRep:', error);
    throw error;
  }
};

// Función para obtener datos del funnel
export const getFunnelData = async () => {
  try {
    // TODO: Reemplazar con llamada real
    // const response = await fetch(`${API_BASE_URL}/funnel`);
    // return await response.json();
    
    return [
      { stage: 'Qualified', value: 100, percentage: 100, count: 250 },
      { stage: 'Proposed', value: 75, percentage: 75, count: 188 },
      { stage: 'Negotiation', value: 50, percentage: 50, count: 125 },
      { stage: 'Contract', value: 35, percentage: 35, count: 88 },
      { stage: 'Win', value: 27, percentage: 27, count: 68 }
    ];
  } catch (error) {
    console.error('Error in getFunnelData:', error);
    throw error;
  }
};

// Función para obtener el valor promedio de deals ganados
export const getAverageValue = async () => {
  try {
    // TODO: Reemplazar con llamada real
    // const response = await fetch(`${API_BASE_URL}/average-value`);
    // return await response.json();
    
    return {
      value: 128100,
      currency: 'USD',
      change: '+12%', // cambio respecto al mes anterior
      previousMonth: 114375
    };
  } catch (error) {
    console.error('Error in getAverageValue:', error);
    throw error;
  }
};

// Función para obtener datos del pipeline de ventas
export const getPipelineData = async () => {
  try {
    // TODO: Reemplazar con llamada real
    // const response = await fetch(`${API_BASE_URL}/pipeline`);
    // return await response.json();
    
    return [
      { name: 'Won', value: 40, color: '#333', amount: 1200000 },
      { name: 'Contract', value: 25, color: '#666', amount: 750000 },
      { name: 'Proposed', value: 20, color: '#999', amount: 600000 },
      { name: 'Negotiation', value: 15, color: '#ccc', amount: 450000 }
    ];
  } catch (error) {
    console.error('Error in getPipelineData:', error);
    throw error;
  }
};

// Función para obtener la meta mensual
export const getMonthlyGoal = async () => {
  try {
    // TODO: Reemplazar con llamada real
    // const response = await fetch(`${API_BASE_URL}/monthly-goal`);
    // return await response.json();
    
    return {
      current: 6200000,
      goal: 8100000,
      percentage: 76.5,
      month: 'October 2025',
      daysRemaining: 24
    };
  } catch (error) {
    console.error('Error in getMonthlyGoal:', error);
    throw error;
  }
};

// Función helper que retorna todos los datos del dashboard (mock)
const getMockDashboardData = () => {
  return {
    salesByRep: [
      { name: 'Ana García', sales: 250, avatar: 'AG' },
      { name: 'Carlos López', sales: 180, avatar: 'CL' },
      { name: 'María Torres', sales: 220, avatar: 'MT' },
      { name: 'Juan Pérez', sales: 280, avatar: 'JP' },
      { name: 'Laura Ruiz', sales: 240, avatar: 'LR' }
    ],
    funnelData: [
      { stage: 'Qualified', value: 100, percentage: 100, count: 250 },
      { stage: 'Proposed', value: 75, percentage: 75, count: 188 },
      { stage: 'Negotiation', value: 50, percentage: 50, count: 125 },
      { stage: 'Contract', value: 35, percentage: 35, count: 88 },
      { stage: 'Win', value: 27, percentage: 27, count: 68 }
    ],
    averageValue: {
      value: 128100,
      currency: 'USD',
      change: '+12%',
      previousMonth: 114375
    },
    pipelineData: [
      { name: 'Won', value: 40, color: '#333', amount: 1200000 },
      { name: 'Contract', value: 25, color: '#666', amount: 750000 },
      { name: 'Proposed', value: 20, color: '#999', amount: 600000 },
      { name: 'Negotiation', value: 15, color: '#ccc', amount: 450000 }
    ],
    monthlyGoal: {
      current: 6200000,
      goal: 8100000,
      percentage: 76.5,
      month: 'October 2025',
      daysRemaining: 24
    }
  };
};

// Exportar todo como default también
export default {
  getDashboardData,
  getSalesByRep,
  getFunnelData,
  getAverageValue,
  getPipelineData,
  getMonthlyGoal
};