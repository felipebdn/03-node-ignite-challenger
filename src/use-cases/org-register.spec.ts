import { beforeEach, describe, expect, it } from 'vitest'
import { OrgRegisterUseCase } from './org-register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: OrgRegisterUseCase

describe('Orgs Register Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new OrgRegisterUseCase(inMemoryOrgsRepository)
  })
  it('should be able to register org', async () => {
    const { org } = await sut.execute({
      name: 'Felipe',
      organization: 'Dev pet',
      email: 'teste@example.com',
      number: '1370',
      road: 'nova prata',
      sector: 'alto parana',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '(94) 99148-7963',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'Felipe',
      organization: 'Dev pet',
      email,
      state: 'PA',
      city: 'Redenção',
      number: '1370',
      road: 'nova prata',
      sector: 'alto parana',
      cep: 84874000,
      whatsapp: '(94) 99148-7963',
      password: '123456',
    })

    expect(
      async () =>
        await sut.execute({
          name: 'Felipe',
          organization: 'Dev pet',
          email,
          state: 'PA',
          city: 'Redenção',
          number: '1370',
          road: 'nova prata',
          sector: 'alto parana',
          cep: 84874000,
          whatsapp: '(94) 99148-7963',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
  it('should hash org password upon regsitration', async () => {
    const { org } = await sut.execute({
      name: 'Felipe',
      organization: 'Dev pet',
      email: 'teste@example.com',
      state: 'PA',
      number: '1370',
      road: 'nova prata',
      sector: 'alto parana',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '(94) 99148-7963',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
