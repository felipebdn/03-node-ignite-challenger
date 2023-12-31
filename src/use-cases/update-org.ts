import {
  OrgsRepository,
  orgWithOutPasswordHash,
} from '@/repositories/orgs-repository'
import { OrgAlreadyUsingWhatsappError } from './errors/org-already-using-whatsapp'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface UpdateOrgRequest {
  data: {
    name: string
    organization: string
    email: string
    state: string
    city: string
    cep: number
    road: string
    number: string
    sector: string
    whatsapp: string
  }
  orgId: string
}

interface UpdateOrgResponse {
  org: orgWithOutPasswordHash
}

export class UpdateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ data, orgId }: UpdateOrgRequest): Promise<UpdateOrgResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(data.email)
    const orgWithSameWhatsapp = await this.orgsRepository.findByWhatsapp(
      data.whatsapp,
    )
    if (orgWithSameEmail && orgWithSameEmail.id !== orgId) {
      throw new OrgAlreadyExistsError()
    }

    if (orgWithSameWhatsapp && orgWithSameWhatsapp.id !== orgId) {
      throw new OrgAlreadyUsingWhatsappError()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...org } = await this.orgsRepository.updateOrg({
      ...data,
      id: orgId,
    })

    return { org }
  }
}
