import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRespository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsAroundCityUseCaseRequest {
  state: string
  city: string
  age?: 'cub' | 'adolescent' | 'elderly'
  energy_level?: number
  size?: 'small' | 'medium' | 'big'
  independence?: 'low' | 'medium' | 'high'
}
interface FetchPetsAroundCityUseCaseResponse {
  pets: Pet[]
}
export class FetchPetsAroundCityUseCase {
  constructor(
    private petsRepository: PetsRespository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
    state,
    age,
    energy_level,
    independence,
    size,
  }: FetchPetsAroundCityUseCaseRequest): Promise<FetchPetsAroundCityUseCaseResponse | null> {
    const orgs = await this.orgsRepository.findByStateAndCidy(state, city)

    if (!orgs) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findByFilter({
      orgs_ids: orgs.map((org) => org.id),
      age,
      energy_level,
      independence,
      size,
    })

    if (!pets) {
      return null
    }

    return { pets }
  }
}
