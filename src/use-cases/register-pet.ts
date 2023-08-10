import { Pet } from '@prisma/client'
import { PetsRespository } from '@/repositories/pets-repository'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'
import { ImagesRepository } from '@/repositories/images-repository'
import { RequirementRepository } from '@/repositories/requirements-repository'

interface PetRegisterUseCaseRequest {
  data: {
    collar: string
    name: string
    energy_level: number
    size: 'small' | 'medium' | 'big'
    age: 'cub' | 'adolescent' | 'elderly'
    description: string
    independence: 'low' | 'medium' | 'high'
    anvironment: string
    org_id: string
  }
  requirements: {
    title: string
  }[]
  images: { url: string }[]
}

interface PetRegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(
    private petsRepository: PetsRespository,
    private imagesRepository: ImagesRepository,
    private requirementRepository: RequirementRepository,
  ) {}

  async execute({
    data,
    images,
    requirements,
  }: PetRegisterUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const petWithSameCollar = await this.petsRepository.findByCollar(
      data.collar,
    )

    if (petWithSameCollar) {
      throw new PetAlreadyExistsError()
    }

    const pet = await this.petsRepository.create(data)

    await this.imagesRepository.create(images, pet.id)

    await this.requirementRepository.create(requirements, pet.id)

    return { pet }
  }
}
