import { PetsRespository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsAroundCityUseCaseRequest {
  state: string
  city: string
}
interface FetchPetsAroundCityUseCaseResponse {
  pets: Pet[]
}
export class FetchPetsAroundCityUseCase {
  constructor(private petsRepository: PetsRespository) {}
  async execute({
    city,
    state,
  }: FetchPetsAroundCityUseCaseRequest): Promise<FetchPetsAroundCityUseCaseResponse | null> {
    const pets = await this.petsRepository.findByStateAndCity(state, city)

    if (!pets) {
      return null
    }

    return { pets }
  }
}
