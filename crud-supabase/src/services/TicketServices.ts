import { TicketRepository } from "../repositories";
import type { Ticket, TicketInput, TicketUpdate } from "../types/ticket";

export class TicketServices {
    static getAll():Promise<Ticket[]> {
        console.log("📋 Obteniendo todos los tickets...");
        const tickets = TicketRepository.getAll();
        console.log(`✅ ${tickets.length} tickets obtenidos`);
        return Promise.resolve(tickets);
    }
    static getById(id: number): Promise<Ticket | null> {
        console.log(`🔍 Buscando ticket con ID: ${id}`);
        const ticket = TicketRepository.findById(id);
        if (ticket) {
            console.log(`✅ Ticket encontrado: ${ticket.Tnumber}`);
            return Promise.resolve(ticket);
        } else {
            console.log(`❌ Ticket con ID ${id} no encontrado`);
            return Promise.resolve(null);
        }
    }
    static create(ticket: TicketInput): Promise<void> {
        console.log("➕ Creando nuevo ticket:", ticket);
        const newTicket = TicketRepository.create(ticket);
        console.log(`✅ Ticket creado con ID: ${newTicket.id}`);
        return Promise.resolve();
    }
    static update(id: number, ticket: TicketUpdate): Promise<void> {
        console.log(`✏️ Actualizando ticket ID ${id}:`, ticket);
        const updated = TicketRepository.update(id, ticket);
        if (!updated) {
            throw new Error("Ticket no encontrado");
        }
        console.log(`✅ Ticket ${id} actualizado exitosamente`);
        return Promise.resolve();
    }
    static delete(id: number): Promise<void> {
        console.log(`🗑️ Eliminando ticket con ID: ${id}`);
        const deleted = TicketRepository.delete(id);
        if (!deleted) {
            throw new Error("Ticket no encontrado");
        }
        console.log(`✅ Ticket ${id} eliminado exitosamente`);
        return Promise.resolve();
    }
    static getByPacienteId(pacienteId: number): Promise<Ticket[]> {
        console.log(`🔍 Buscando tickets para paciente ID: ${pacienteId}`);
        const tickets = TicketRepository.findByPacienteId(pacienteId);
        console.log(`✅ ${tickets.length} tickets encontrados para paciente ID ${pacienteId}`);
        return Promise.resolve(tickets);
    }
    static getByCategoryId(categoryId: number): Promise<Ticket[]> {
        console.log(`🔍 Buscando tickets para categoría ID: ${categoryId}`);
        const tickets = TicketRepository.findByCategoryId(categoryId);
        console.log(`✅ ${tickets.length} tickets encontrados para categoría ID ${categoryId}`);
        return Promise.resolve(tickets);
    }
    static getByStatus(status: string): Promise<Ticket[]> {
        console.log(`🔍 Buscando tickets con estado: ${status}`);
        const tickets = TicketRepository.findByStatus(status);
        console.log(`✅ ${tickets.length} tickets encontrados con estado ${status}`);
        return Promise.resolve(tickets);
    }
}