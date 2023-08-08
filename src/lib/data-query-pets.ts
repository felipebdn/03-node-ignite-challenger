import { FindByAttributesProps } from '@/repositories/pets-repository'

export function DataQueryFilterPets(data: FindByAttributesProps) {
  const query = Object.fromEntries(
    Object.entries(data).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([c, v]) => v != null && c !== 'city' && c !== 'state',
    ),
  )
  return { query }
}
