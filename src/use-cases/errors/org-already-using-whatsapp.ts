export class OrgAlreadyUsingWhatsappError extends Error {
  constructor() {
    super('WhatsApp is already in use.')
  }
}
