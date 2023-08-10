import { Requirement } from '@prisma/client'
import { RequirementRepository } from '../requirements-repository'
import { randomUUID } from 'crypto'

export class InMemoryRequirementsRepository implements RequirementRepository {
  public requirements: Requirement[] = []
  async create(data: { title: string }[], petId: string) {
    data.map((requirement) => {
      return this.requirements.push({
        id: randomUUID(),
        pet_id: petId,
        title: requirement.title,
      })
    })
  }

  async findManyByPetId(id: string) {
    return this.requirements.filter((requirement) => requirement.pet_id === id)
  }
}
