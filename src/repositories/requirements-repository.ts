import { Requirement } from '@prisma/client'

export interface RequirementRepository {
  create(data: { title: string }[], petId: string): Promise<void>
  findManyByPetId(id: string): Promise<Requirement[]>
}
