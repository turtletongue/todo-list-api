import { ControllerResponse } from './controller-response.interface';

export interface Controller {
  handle(request: unknown): Promise<ControllerResponse>;
}
