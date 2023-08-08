import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRegisterUseCase } from './register-pet'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'

// let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: PetRegisterUseCase

describe('Pets Register Use Case', () => {
  beforeEach(() => {
    // inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new PetRegisterUseCase(inMemoryPetsRepository)

    // const org = await inMemoryOrgsRepository.create({
    //   name: 'Felipe 1',
    //   organization: 'ze prequete 1',
    //   email: 'test@example.com',
    //   state: 'PA',
    //   city: 'Conceição do Araguaia',
    //   cep: 68552140,
    //   whatsapp: '(94) 99148-7963',
    //   password_hash: await hash('123456', 6),
    // })
  })
  it('should be able to register pet', async () => {
    const images = [{ url: 'teste1' }, { url: 'teste2' }]

    const { pet } = await sut.execute({
      collar: '86781211',
      name: 'Felipe',
      energy_level: 5,
      size: 'medium',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: 'org_id',
      images,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('should be able to register pet with same collar twice', async () => {
    const images = [{ url: 'teste1' }, { url: 'teste2' }]

    await sut.execute({
      collar: '86781211',
      name: 'Felipe',
      energy_level: 5,
      size: 'medium',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: 'org_id',
      images,
    })

    expect(async () => {
      await sut.execute({
        collar: '86781211',
        name: 'Felipe',
        energy_level: 5,
        size: 'medium',
        age: 'adolescent',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'Lugares fechados',
        org_id: 'org_id',
        images,
      })
    }).rejects.toBeInstanceOf(PetAlreadyExistsError)
  })
})
