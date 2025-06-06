import type CategoriaEventoDto from "./categoriaEvento.dto";
import type TematicaDto from "./tematica.dto";

export default class EventoInfoDto {
    constructor(
      public orgId: number, // <-- con minúscula
      public nombreOrg: string,
      public nombreEvento: string,
      public descripcion: string,
      public fechaInicio: Date,
      public fechaFin: Date,
      public ubicacion: string,
      public enlace: string,
      public categorias: CategoriaEventoDto[],
      public tematicas: TematicaDto[]
    ) {}
  }
  