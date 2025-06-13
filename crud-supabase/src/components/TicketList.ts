import type { Ticket } from "../types/ticket";

export class TicketList {
    container: HTMLElement;
    onDelete: (id: number) => Promise<void>;
    onView: (ticket: Ticket) => void;

    constructor(
        container: HTMLElement,
        onDelete: (id: number) => Promise<void>,
        onView: (ticket: Ticket) => void
    ) {
        this.container = container;
        this.onDelete = onDelete;
        this.onView = onView;
    }
    render(tickets: Ticket[]): void {
        this.container.innerHTML = `
            <h2>Lista de Tickets</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Fecha de Creación</th>
                        <th>Paciente ID</th>
                        <th>Categoría ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${tickets.map(ticket => `
                        <tr data-id="${ticket.id}">
                            <td>${ticket.id}</td>
                            <td>${ticket.estado}</td>
                            <td>${ticket.pacienteId}</td>
                            <td>${ticket.categoryId || '-'}</td>
                            <td>
                                <button class="view-btn" data-id="${ticket.id}">Ver</button>
                                <button class="delete-btn" data-id="${ticket.id}">Eliminar</button>
                            </td>
                        </tr>`).join('')}
                </tbody>
            </table>`;
        
        this.setupEventListeners();
    }
    private setupEventListeners(): void {
        // Agregar event listeners a los botones de ver
        this.container.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = Number(button.getAttribute('data-id'));
                const row = button.closest('tr');
                if (row) {
                    const ticket: Ticket = {
                        id: id,
                        estado: row.cells[2].textContent as 'en cola' | 'atendido' | 'cancelado',  
                        pacienteId: Number(row.cells[4].textContent || 0),
                        categoryId: Number(row.cells[5].textContent || 0),
                    };
                    this.onView(ticket);
                }
            });
        });

        // Agregar event listeners a los botones de eliminar
        this.container.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const id = Number(button.getAttribute('data-id'));
                await this.onDelete(id);
            });
        });
    }
}