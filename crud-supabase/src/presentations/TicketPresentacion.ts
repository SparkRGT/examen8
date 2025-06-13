import { TicketList } from "../components/TicketList";
import type { Ticket, TicketInput } from "../types/ticket";
import { TicketServices } from "../services/TicketServices";
 
export class TicketPresentacion {
    private ticketList: TicketList;
    // Inicializar la estructura del DOM
    constructor() {
        document.querySelector<HTMLDivElement>("#ticket-lis`t")!.innerHTML = `
            <div class="container">'
                <h1>Gestión de Tickets</h1>
                <div id="ticketList"></div>
                <button id="createTicketBtn">Crear Ticket</button>
            </div>
        `;
        // Obtener referencia al contenedor de la lista de tickets
        const ticketListContainer = document.getElementById("ticketList")!;
        // Inicializar el componente de lista de tickets
        this.ticketList = new TicketList(
            ticketListContainer,
            this.handleDelete.bind(this),
            this.handleView.bind(this)
        );
        // Cargar los tickets al iniciar
        this.loadTickets();
        // Configurar el botón de crear ticket
        const createTicketBtn = document.getElementById("createTicketBtn")!;        
        createTicketBtn.addEventListener("click", () => {
            this.handleCreate();
        });
    }
    private async loadTickets(): Promise<void> {    
        try {
            const tickets = await TicketServices.getAll();
            this.ticketList.render(tickets);
        } catch (error) {
            console.error("Error al cargar los tickets:", error);
            alert("Error al cargar la lista de tickets");
        }
    }
    private async handleCreate(): Promise<void> {
        const ticketInput: TicketInput = {
            estado: "en cola",
            pacienteId: 1, // Cambiar según sea necesario
            categoryId: 1,
            
        };
        try {
            await TicketServices.create(ticketInput);
            alert("Ticket creado exitosamente");
            this.loadTickets(); // Recargar la lista de tickets
        }
        catch (error) {
            console.error("Error al crear el ticket:", error);
            alert("Error al crear el ticket");
        }
    }
    private async handleDelete(id: number): Promise<void> {
        try {
            await TicketServices.delete(id);
            alert("Ticket eliminado exitosamente");
            this.loadTickets(); // Recargar la lista de tickets
        } catch (error) {
            console.error("Error al eliminar el ticket:", error);
            alert("Error al eliminar el ticket");
        }
    }
    private handleView(ticket: Ticket): void {
        // Aquí puedes implementar la lógica para ver los detalles del ticket
        alert(`Detalles del Ticket:\nID: ${ticket.id}\nEstado: ${ticket.estado}\nPaciente ID: ${ticket.pacienteId}\nCategoría ID: ${ticket.categoryId}`);
    }
}
    
        
