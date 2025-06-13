export interface Ticket {
    id: number
    Tnumber: string
    time: Date
    estado: 'en cola' | 'atendido' | 'cancelado'
    pacienteId: number
    categoryId: number
    }
export type TicketInput = Omit<Ticket, 'id'>
export type TicketUpdate = Partial<TicketInput>