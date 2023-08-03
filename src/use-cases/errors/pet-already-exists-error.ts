export class PetAlreadyExistsError extends Error {
  constructor() {
    super('Already exists error.')
  }
}
