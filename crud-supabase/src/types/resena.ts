export interface resena {
    id: number
    comentario: string
    calificacion: number 
    fecha: Date
    pacienteId: number
    ticketId: number
}
export type ResenaInput = Omit<resena, 'id'>
export type ResenaUpdate = Partial<ResenaInput>