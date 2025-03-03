export default class EventoBuscadorDto {
    constructor(
      public nombreOrg: string,
      public nombreEvento: string,
      public fechaInicio: Date,
      public enlace: string,
      public idevento: number
    ) {}
  }
  