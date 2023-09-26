import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { UpdateOrgUseCase } from '@/use-cases/update-org'
import { OrgAlreadyUsingWhatsappError } from '@/use-cases/errors/org-already-using-whatsapp'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: UpdateOrgUseCase

describe('Update Org Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new UpdateOrgUseCase(inMemoryOrgsRepository)
  })
  it('should be able to update org', async () => {
    const createOrg = await inMemoryOrgsRepository.create({
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
      data: {
        name: 'John Doe',
        organization: 'Dev pet',
        email: 'johndoe@example.com',
        number: '1370',
        road: 'nova prata',
        sector: 'alto parana',
        state: 'PA',
        city: 'Redenção',
        cep: 84874000,
        whatsapp: '12345678912',
      },
      orgId: createOrg.id,
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: createOrg.id,
        name: 'John Doe',
        organization: 'Dev pet',
        email: 'johndoe@example.com',
        number: '1370',
        road: 'nova prata',
        sector: 'alto parana',
        state: 'PA',
        city: 'Redenção',
        cep: 84874000,
        whatsapp: '12345678912',
      }),
    )
  })
  it('should not be able to update org with same email twice', async () => {
    await inMemoryOrgsRepository.create({
      name: 'example',
      organization: 'Dev pet',
      email: 'johndoe@example.com',
      number: '000',
      road: 'nova prata',
      sector: 'alto parana',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '12345678912',
      password_hash: await hash('123456', 6),
    })
    const createOrg = await inMemoryOrgsRepository.create({
      name: 'example',
      organization: 'Dev pet',
      email: 'johndoe1@example.com',
      number: '000',
      road: 'nova prata',
      sector: 'alto parana',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '12345678913',
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await sut.execute({
          data: {
            name: 'John Doe',
            organization: 'Dev pet',
            email: 'johndoe@example.com',
            number: '1370',
            road: 'nova prata',
            sector: 'alto parana',
            state: 'PA',
            city: 'Redenção',
            cep: 84874000,
            whatsapp: '12345678913',
          },
          orgId: createOrg.id,
        }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
  it('should not be able to update org with same whatsapp twice', async () => {
    await inMemoryOrgsRepository.create({
      name: 'example',
      organization: 'Dev pet',
      email: 'johndoe@example.com',
      number: '000',
      road: 'nova prata',
      sector: 'alto parana',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '12345678912',
      password_hash: await hash('123456', 6),
    })
    const createOrg = await inMemoryOrgsRepository.create({
      name: 'example',
      organization: 'Dev pet',
      email: 'johndoe1@example.com',
      number: '000',
      road: 'nova prata',
      sector: 'alto parana',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '12345678913',
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await sut.execute({
          data: {
            name: 'John Doe',
            organization: 'Dev pet',
            email: 'johndoe1@example.com',
            number: '1370',
            road: 'nova prata',
            sector: 'alto parana',
            state: 'PA',
            city: 'Redenção',
            cep: 84874000,
            whatsapp: '12345678912',
          },
          orgId: createOrg.id,
        }),
    ).rejects.toBeInstanceOf(OrgAlreadyUsingWhatsappError)
  })
})
