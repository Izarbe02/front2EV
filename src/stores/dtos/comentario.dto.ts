export default interface ComentarioDto {
  id: number;
  idUsuario: number;
  idEvento: number;
  contenido: string;
  fecha: string;
  nombreUsuario: string;
}
