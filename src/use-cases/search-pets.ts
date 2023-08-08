import { PetsRespository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsAroundCityUseCaseRequest {
  state: string
  city: string
  age?: string
  energy_level?: number
  size?: string
  independence?: string
}
interface FetchPetsAroundCityUseCaseResponse {
  pets: Pet[]
}
export class FetchPetsAroundCityUseCase {
  constructor(private petsRepository: PetsRespository) {}
  async execute({
    city,
    state,
    age,
    energy_level,
    independence,
    size,
  }: FetchPetsAroundCityUseCaseRequest): Promise<FetchPetsAroundCityUseCaseResponse | null> {
    const pets = await this.petsRepository.findByFilter({
      city,
      state,
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
