import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsAroundCityUseCase } from '../search-pets'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeSearchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const fetchPetsAroundCityUseCase = new FetchPetsAroundCityUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return fetchPetsAroundCityUseCase
}
