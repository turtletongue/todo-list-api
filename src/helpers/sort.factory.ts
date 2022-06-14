export class SortFactory {
  constructor(
    private readonly validField: string[],
    private readonly validDirection: string[],
  ) {}

  build(field: string, direction: string) {
    const isFieldValid = this.validField.includes(field);
    const isDirectionValid = this.validDirection.includes(direction);

    if (isFieldValid && isDirectionValid) {
      return {
        field,
        direction,
      };
    }
  }
}
