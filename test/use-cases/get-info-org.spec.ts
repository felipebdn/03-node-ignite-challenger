import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetInfoOrgUseCase } from '@/use-cases/get-info-org'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: GetInfoOrgUseCase

describe('Pets Get Info Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new GetInfoOrgUseCase(inMemoryOrgsRepository)
  })
  it('should be able to get info of pet', async () => {
    const org = await inMemoryOrgsRepository.create({
      name: 'example',
      organization: 'Dev pet',
      email: 'teste@example.com',
      number: '1370',
      road: 'nova prata',
      sector: 'alto parana',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '12345678912',
      password_hash: await hash('123456', 6),
    })

    const data = await sut.execute(org.id)

    expect(data).toEqual({
      id: expect.any(String),
      name: 'example',
      organization: 'Dev pet',
      email: 'teste@example.com',
      number: '1370',
      road: 'nova prata',
      sector: 'alto parana',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '12345678912',
    })
  })
})
