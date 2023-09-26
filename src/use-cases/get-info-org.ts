import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetInfoOrgUseCaseResponse {
  id: string
  name: string
  organization: string
  email: string
  road: string
  number: string
  sector: string
  city: string
  state: string
  cep: number
  whatsapp: string
}

export class GetInfoOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(id: string): Promise<GetInfoOrgUseCaseResponse | null> {
    const org = await this.orgsRepository.findById(id)

    return org
  }
}
