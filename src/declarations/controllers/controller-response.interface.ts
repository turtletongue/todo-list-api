export interface ControllerResponse {
  headers?: Record<string, unknown>;
  body: Record<string, unknown>;
  statusCode?: number;
}
