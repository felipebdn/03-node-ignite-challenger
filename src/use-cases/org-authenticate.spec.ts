import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAuthenticateUseCase } from './org-authenticate'
import { hash } from 'bcryptjs'
import { OrgInvalidCredentialError } from './errors/org-invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: OrgAuthenticateUseCase

describe('Orgs Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new OrgAuthenticateUseCase(orgsRepository)
  })
  it('should be able to authenticate', async () => {
    await orgsRepository.create({
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
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'teste@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    expect(
      async () =>
        await sut.execute({
          email: 'teste@example.com',
          password: '123456aa',
        }),
    ).rejects.toBeInstanceOf(OrgInvalidCredentialError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
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
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await sut.execute({
          email: 'teste@example.com',
          password: '123456a',
        }),
    ).rejects.toBeInstanceOf(OrgInvalidCredentialError)
  })
})
