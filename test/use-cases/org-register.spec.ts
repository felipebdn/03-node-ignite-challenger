import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { OrgRegisterUseCase } from '@/use-cases/org-register'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: OrgRegisterUseCase

describe('Orgs Register Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new OrgRegisterUseCase(inMemoryOrgsRepository)
  })
  it('should be able to register org', async () => {
    const { org } = await sut.execute({
      name: 'example',
      organization: 'example',
      email: 'teste@example.com',
      number: '1234',
      road: 'example road',
      sector: 'example sector',
      state: 'PA',
      city: 'city example',
      cep: 12345678,
      whatsapp: '12345678910',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not be able to register with same email twice', async () => {
    const email = 'test@example.com'

    await sut.execute({
      name: 'example',
      organization: 'example',
      email,
      state: 'PA',
      city: 'city example',
      number: '1234',
      road: 'example road',
      sector: 'example sector',
      cep: 12345678,
      whatsapp: '12345678910',
      password: '123456',
    })

    expect(
      async () =>
        await sut.execute({
          name: 'example',
          organization: 'example',
          email,
          state: 'PA',
          city: 'city example',
          number: '1234',
          road: 'example road',
          sector: 'example sector',
          cep: 12345678,
          whatsapp: '12345678910',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
