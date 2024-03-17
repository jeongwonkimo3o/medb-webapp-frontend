import { Drug } from "./Drug";

export interface LogWithDetails {
  log_id: number;
  created_at: string;
  drug_details: Drug;
}

export interface LogsResponse {
  total_drugs: number; // 복용 중인 약의 총 개수
  logs_with_details: LogWithDetails[];
}