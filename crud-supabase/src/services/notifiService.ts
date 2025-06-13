import { NotificacionRepository } from "../repositories/notifiRepository";
import type { notificacion, NotificacionInput, NotificacionUpdate } from "../types/notificaciones";

export class NotifiService {
    static getAll(): Promise<notificacion[]> {
        console.log("📋 Obteniendo todas las notificaciones...");
        const notificaciones = NotificacionRepository.getAll();
        console.log(`✅ ${notificaciones.length} notificaciones obtenidas`);
        return Promise.resolve(notificaciones);
    }
    static getById(id: number): Promise<notificacion | null> {
        console.log(`🔍 Buscando notificación con ID: ${id}`);
        const notificacion = NotificacionRepository.findById(id);
        if (notificacion) {
            console.log(`✅ Notificación encontrada: ${notificacion.mensaje}`);
            return Promise.resolve(notificacion);
        } else {
            console.log(`❌ Notificación con ID ${id} no encontrada`);
            return Promise.resolve(null);
        }
    }
    static getByPacienteId(pacienteId: number): Promise<notificacion[]> {
        console.log(`🔍 Buscando notificaciones para paciente ID: ${pacienteId}`);
        const notificaciones = NotificacionRepository.findByPacienteId(pacienteId);
        console.log(`✅ ${notificaciones.length} notificaciones encontradas para paciente ID ${pacienteId}`);
        return Promise.resolve(notificaciones);
    }
    static create(notificacionData: NotificacionInput): Promise<notificacion> {
        console.log("➕ Creando nueva notificación:", notificacionData);
        const newNotificacion = NotificacionRepository.create(notificacionData);
        console.log(`✅ Notificación creada con ID: ${newNotificacion.id}`);
        return Promise.resolve(newNotificacion);
    }
    static update(id: number, updates: NotificacionUpdate): Promise<notificacion | null> {
        console.log(`✏️ Actualizando notificación ID ${id}:`, updates);
        const updatedNotificacion = NotificacionRepository.update(id, updates);
        if (updatedNotificacion) {
            console.log(` Notificación ${id} actualizada exitosamente`);
            return Promise.resolve(updatedNotificacion);
        } else {
            console.log(` Notificación con ID ${id} no encontrada`);
            return Promise.resolve(null);
        }
    }
    static delete(id: number): Promise<void> {
        console.log(` Eliminando notificación con ID: ${id}`);
        const deleted = NotificacionRepository.delete(id);
        if (deleted) {
            console.log(` Notificación ${id} eliminada exitosamente`);
            return Promise.resolve();
        } else {
            console.log(` Notificación con ID ${id} no encontrada`);
            return Promise.reject(new Error("Notificación no encontrada"));
        }
    }
    static getByTicketId(ticketId: number): Promise<notificacion[]> {
        console.log(` Buscando notificaciones para ticket ID: ${ticketId}`);
        const notificaciones = NotificacionRepository.findByTicketId(ticketId);
        console.log(` ${notificaciones.length} notificaciones encontradas para ticket ID ${ticketId}`);
        return Promise.resolve(notificaciones);
    }
    static getUnreadByPacienteId(pacienteId: number): Promise<notificacion[]> {
        console.log(` Buscando notificaciones no leídas para paciente ID: ${pacienteId}`);
        const notificaciones = NotificacionRepository.findUnreadByPacienteId(pacienteId);
        console.log(` ${notificaciones.length} notificaciones no leídas encontradas para paciente ID ${pacienteId}`);
        return Promise.resolve(notificaciones);
    }
    static getCount(): Promise<number> {
        const count = NotificacionRepository.getAll().length;
        console.log(`📊 Total de notificaciones: ${count}`);
        return Promise.resolve(count);
    }

    static getUnreadCountByPacienteId(pacienteId: number): Promise<number> {
        const unreadCount = NotificacionRepository.findUnreadByPacienteId(pacienteId).length;
        console.log(`📊 Total de notificaciones no leídas para paciente ID ${pacienteId}: ${unreadCount}`);
        return Promise.resolve(unreadCount);
    }
    
}