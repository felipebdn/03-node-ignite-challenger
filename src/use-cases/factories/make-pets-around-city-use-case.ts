import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsAroundCityUseCase } from '../fetch-pets-around-city-use-case'

export function makePestAroundCityUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const fetchPetsAroundCityUseCase = new FetchPetsAroundCityUseCase(
    prismaPetsRepository,
  )

  return fetchPetsAroundCityUseCase
}
