export default class EventoDto {
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public ubicacion: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public idTematica: number | null,
        public enlace: string,
        public idCategoria: number | null,
        public idOrganizador: number
        
    ) {}
}


