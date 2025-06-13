import { database, getNextTicketId } from '../types/database'
import type { Ticket, TicketInput, TicketUpdate } from '../types/ticket'

export class TicketRepository {
  static getAll(): Ticket[] {
    return database.tickets
  }
  static findById(id: number): Ticket | undefined {
    return database.tickets.find(ticket => ticket.id === id)
  }
  static findByPacienteId(pacienteId: number): Ticket[] {
    return database.tickets.filter(ticket => ticket.pacienteId === pacienteId)
  }
  static create(ticketData: TicketInput): Ticket {
    const newTicket: Ticket = {
      ...ticketData,
      id: getNextTicketId()
    }
    database.tickets.push(newTicket)
    return newTicket
  }
  static update(id: number, updates: TicketUpdate): Ticket | null {
    const index = database.tickets.findIndex(ticket => ticket.id === id)
    if (index === -1) {
      return null
    }
    database.tickets[index] = { 
      ...database.tickets[index], 
      ...updates 
    }
    return database.tickets[index]
  }
  static delete(id: number): boolean {
    const index = database.tickets.findIndex(ticket => ticket.id === id)
    if (index === -1) {
      return false
    }
    database.tickets.splice(index, 1)
    return true
  }
  static findByCategoryId(categoryId: number): Ticket[] {
    return database.tickets.filter(ticket => ticket.categoryId === categoryId)
  }
  static findByStatus(status: string): Ticket[] {
    return database.tickets.filter(ticket => ticket.estado === status)
  }
}