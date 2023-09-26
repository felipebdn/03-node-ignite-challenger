import Ajv from 'ajv'
export const ajv = new Ajv({
  removeAdditional: true, // remove additional properties
  useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
  coerceTypes: true, // change data type of data to match type keyword
})
ajv.addFormat('binary', { type: 'string', validate: () => true })
ajv.addFormat('byte', { type: 'string', validate: () => true })
ajv.addFormat('int32', { type: 'number', validate: () => true })
ajv.addFormat('int64', { type: 'number', validate: () => true })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validatorCompiler({ schema }: any) {
  return ajv.compile(schema)
}
