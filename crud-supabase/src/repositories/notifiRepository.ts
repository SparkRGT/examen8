import { database, getNextNotificacionId } from "../types/database";
import type { notificacion, NotificacionInput, NotificacionUpdate } from "../types/notificaciones";

export class NotificacionRepository {
    
    static getAll(): notificacion[] {
        return database.notificaciones;
    }
    static findById(id: number): notificacion | undefined {
        return database.notificaciones.find(notificacion => notificacion.id === id);
    }
    static findByPacienteId(pacienteId: number): notificacion[] {
        return database.notificaciones.filter(notificacion => notificacion.pacienteId === pacienteId);
    }
    static create(notificacionData: NotificacionInput): notificacion {
        const newNotificacion: notificacion = {
            ...notificacionData,
            id: getNextNotificacionId()
        };
        database.notificaciones.push(newNotificacion);
        return newNotificacion;
    }
    static update(id: number, updates: NotificacionUpdate): notificacion | null {
        const index = database.notificaciones.findIndex(notificacion => notificacion.id === id);
        if (index === -1) {
            return null;
        }
        database.notificaciones[index] = { 
            ...database.notificaciones[index], 
            ...updates 
        };
        return database.notificaciones[index];
    }
    static delete(id: number): boolean {
        const index = database.notificaciones.findIndex(notificacion => notificacion.id === id);
        if (index === -1) {
            return false;
        }
        database.notificaciones.splice(index, 1);
        return true;
    }
    static findByTicketId(ticketId: number): notificacion[] {
        return database.notificaciones.filter(notificacion => notificacion.ticketId === ticketId);
    }
    static findUnreadByPacienteId(pacienteId: number): notificacion[] {
        return database.notificaciones.filter(notificacion => 
            notificacion.pacienteId === pacienteId && !notificacion.leido
        );
    }


}

