export interface notificacion {
    id: number 
    mensaje: string
    fecha: Date
    leido: boolean
    pacienteId: number
    ticketId?: number 
}
export type NotificacionInput = Omit<notificacion, 'id'>
export type NotificacionUpdate = Partial<NotificacionInput>