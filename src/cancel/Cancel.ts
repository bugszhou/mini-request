export default class Cancel {
  message = "";

  isCancel = true;

  constructor(message: string) {
    this.message = message;
  }

  toString(): string {
    return `Cancel: ${this.message || ""}`;
  }
}
