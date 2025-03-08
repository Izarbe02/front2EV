export default class EventoDto {
    constructor(
      public id: number,
      public nombre: string,
      public descripcion: string,
      public ubicacion: string,
      public fechaInicio: Date ,
      public fechaFin: Date ,
      public idTematica: number | null,
      public enlace: string,
      public idCategoria: number | null,
      public idOrganizador: number
    ) {

    //   this.fecha_inicio = typeof fecha_inicio === "string" ? new Date(fecha_inicio) : fecha_inicio;
    //   this.fecha_fin = typeof fecha_fin === "string" ? new Date(fecha_fin) : fecha_fin;
    }
  }
  