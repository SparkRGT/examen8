import type { Category } from './category'
import type { Paciente } from './paciente'
import type { Ticket } from './ticket'
import type { notificacion } from './notificaciones'
import type { resena } from './resena'
export interface JsonDatabase {
  categories: Category[]
  pacientes: Paciente[]
  tickets: Ticket[]
  notificaciones: notificacion[]
  resenas?: resena[] // Opcional, si se usa en la aplicación
}

export const database: JsonDatabase = {
  categories: [
    { id: 1, description: 'Medicina General', created_at: '2024-01-01' },
    { id: 2, description: 'Pediatría', created_at: '2024-01-01' },
    { id: 3, description: 'Cardiología', created_at: '2024-01-01' }
  ],
  pacientes: [
    {
      id: 1,
      nombre: 'Juan Carlos',
      apellido: 'González',
      fecha_nacimiento: '1985-03-15',
      genero: 'Masculino',
      telefono: '+1-555-0123',
      email: 'juan.gonzalez@email.com',
      direccion: 'Calle Principal 123, Ciudad'
    },
    {
      id: 2,
      nombre: 'María Elena',
      apellido: 'Rodríguez',
      fecha_nacimiento: '1992-07-22',
      genero: 'Femenino',
      telefono: '+1-555-0456',
      email: 'maria.rodriguez@email.com',
      direccion: 'Avenida Central 456, Ciudad'
    }
  ],
  tickets: [
    {
      id: 1,
      Tnumber: 'A001',
      time: new Date('2024-01-01T10:00:00Z'),
      estado: 'en cola',
      pacienteId: 1,
      categoryId: 1
    },
    {
      id: 2,
      Tnumber: 'A002',
      time: new Date('2024-01-01T10:05:00Z'),
      estado: 'atendido',
      pacienteId: 2,
      categoryId: 2
    }
  ],
  notificaciones: [
    {
      id: 1,
      mensaje: 'Su cita ha sido confirmada para el 15 de marzo a las 10:00 AM.',
      fecha: new Date('2024-01-01T09:00:00Z'),
      leido: false,
      pacienteId: 1,
      ticketId: 1
    },
    {
      id: 2,
      mensaje: 'Su ticket A002 ha sido atendido.',
      fecha: new Date('2024-01-01T10:10:00Z'),
      leido: true,
      pacienteId: 2,
      ticketId: 2
    },
    {
      id: 3,
      mensaje: 'Recuerde llevar sus documentos para la cita.',
      fecha: new Date('2024-01-01T09:30:00Z'),
      leido: false,
      pacienteId: 1,
      ticketId: 1
    }
  ],
  resenas: [
    {
      id: 1,
      comentario: 'Excelente atención y servicio.',
      calificacion: 5,
      fecha: new Date('2024-01-01T11:00:00Z'),
      pacienteId: 1,
      ticketId: 1
    },
    {
      id: 2,
      comentario: 'Muy satisfecho con la consulta.',
      calificacion: 4,
      fecha: new Date('2024-01-01T11:30:00Z'),
      pacienteId: 2,
      ticketId: 2
    }
  ]
}

// Contadores simples para IDs
export let nextCategoryId = 4
export let nextPacienteId = 3
export let nextNotificacionId = 4
export let nextresenaId = 3

export function getNextCategoryId(): number {
  return nextCategoryId++
}

export function getNextPacienteId(): number {
  return nextPacienteId++
} 
export function getNextTicketId(): number {
  return database.tickets.length > 0
    ? Math.max(...database.tickets.map(ticket => ticket.id)) + 1
    : 1
}
export function getNextNotificacionId(): number {
  return nextNotificacionId++
}
export function getNextResenaId(): number {
  return nextresenaId++
}