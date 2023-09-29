export class OperationNotAuthorizedError extends Error {
  constructor() {
    super('This user cannot perform this operation.')
  }
}
