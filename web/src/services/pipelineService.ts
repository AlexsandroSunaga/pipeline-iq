import { api } from "@/api/client";

export const pipelineService = {
  jobs: () => api<unknown[]>("/jobs"),
  sources: () => api<unknown[]>("/sources"),
  schedules: () => api<unknown[]>("/schedules"),
  quality: () => api<unknown[]>("/quality/rules"),
  records: () => api<unknown[]>("/records"),
  integrationStatus: () => api<Record<string, { enabled: boolean }>>("/integrations/status"),
};
