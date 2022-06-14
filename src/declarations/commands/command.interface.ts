export interface Command {
  execute(dto: unknown): Promise<Readonly<unknown>>;
}
