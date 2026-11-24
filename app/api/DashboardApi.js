import { apiFetch } from '../api/ApiClient';
import { API_END_POINTS } from '../api/apiEndPoints';

export const dashboardApi = async (moduleId, fromDate, toDate) => {
  const response = await apiFetch(
    `${API_END_POINTS.DASHBOARD_API}?ModuleId=${moduleId}&FromDate=${fromDate}&ToDate=${toDate}`,
    {
      method: 'GET',
    },
  );
  return response;
};

export const DashboardGraph = async (ModuleId, Period) => {
  const response = await apiFetch(
    `${API_END_POINTS.DASBOARD_GRAPH}?ModuleId=${ModuleId}&Period=${Period}`,
    {
      method: 'GET',
    },
  );
  return response;
};
