export default class EventoInfoDto {
constructor(
    public nombreOrg: string,
    public nombreEvento: string,
    public descripcion: string,
    public fechaInicio: Date,
    public fechaFin: Date,
    public ubicacion: string,
    public eventoCategoria: string,
    public tematica: string,
    public enlace: string
) {}
};