import type { notificacion } from '../types/notificaciones'

export class NotifiList {
    private container: HTMLElement;
    private onEdit: (notificacion: notificacion) => void;
    private onDelete: (id: number) => void;

    constructor(
        container: HTMLElement,
        onEdit: (notificacion: notificacion) => void,
        onDelete: (id: number) => void
    ) {
        this.container = container;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
    }
    render(notificaciones: notificacion[]): void {
        this.container.innerHTML = `
            <h2>Lista de Notificaciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                        <th>Leído</th>
                        <th>Paciente ID</th>
                        <th>Ticket ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${notificaciones.map(notificacion => `
                        <tr data-id="${notificacion.id}">
                            <td>${notificacion.id}</td>
                            <td>${notificacion.mensaje}</td>
                            <td>${new Date(notificacion.fecha).toLocaleString()}</td>
                            <td>${notificacion.leido ? 'Sí' : 'No'}</td>
                            <td>${notificacion.pacienteId}</td>
                            <td>${notificacion.ticketId || '-'}</td>
                            <td>
                                <button class="edit-btn" data-id="${notificacion.id}">Editar</button>
                                <button class="delete-btn" data-id="${notificacion.id}">Eliminar</button>
                            </td>
                        </tr>`).join('')}
                </tbody>
            </table>`;
        
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Agregar event listeners a los botones de editar
        this.container.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = Number(button.getAttribute('data-id'));
                const row = button.closest('tr');
                if (row) {
                    const notificacion: notificacion = {
                        id: id,
                        mensaje: row.cells[1].textContent || '',
                        fecha: new Date(row.cells[2].textContent || ''),
                        leido: row.cells[3].textContent === 'Sí',
                        pacienteId: Number(row.cells[4].textContent),
                        ticketId: row.cells[5].textContent !== '-' ? Number(row.cells[5].textContent) : undefined
                    };
                    this.onEdit(notificacion);
                }
            });
        });

        // Agregar event listeners a los botones de eliminar
        this.container.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = Number(button.getAttribute('data-id'));
                this.onDelete(id);
            });
        });
    }
}