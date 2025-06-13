import { NotifiList } from "../components/NotifiList";
import type { notificacion, NotificacionInput } from "../types/notificaciones";
import { NotifiService } from "../services/notifiService";

export class NotifiPresentacion {
    private notifiList: NotifiList;

    constructor(){
        document.querySelector<HTMLButtonElement>("#btnCrearNotifi")?.addEventListener("click", () => {
            this.handleCreate();
        }
        );
        document.querySelector<HTMLDivElement>("#notifi-list")!.innerHTML = `
            <div class="container">
                <h1>Gestión de Notificaciones</h1>
                <div id="notifiList"></div>
            </div>
        `;
        const notifiListContainer = document.getElementById("notifiList")!;
        this.notifiList = new NotifiList(
            notifiListContainer,
            this.handleEdit.bind(this),
            this.handleDelete.bind(this)
        );
        this.loadNotificaciones();
    }
    private async loadNotificaciones(): Promise<void> {
        try {
            const notificaciones = await NotifiService.getAll();
            this.notifiList.render(notificaciones);
        } catch (error) {
            console.error("Error al cargar las notificaciones:", error);
            alert("Error al cargar la lista de notificaciones");
        }
    }
    private async handleCreate(): Promise<void> {
        const notificacionInput: NotificacionInput = {
            mensaje: "Nueva notificación",
            fecha: new Date().toISOString(),
            leido: false,
            pacienteId: 1, // Cambiar según sea necesario
            ticketId: null // Cambiar según sea necesario
        };
        try {
            await NotifiService.create(notificacionInput);
            alert("Notificación creada exitosamente");
            this.loadNotificaciones(); // Recargar la lista de notificaciones
        } catch (error) {
            console.error("Error al crear la notificación:", error);
            alert("Error al crear la notificación");
        }
    }
    private async handleEdit(id: number): Promise<void> {
        // Aquí puedes implementar la lógica para editar una notificación
        console.log(`Editar notificación con ID: ${id}`);
        // Por ejemplo, podrías abrir un formulario de edición
    }
    private async handleDelete(id: number): Promise<void> {
        try {
            await NotifiService.delete(id);
            alert("Notificación eliminada exitosamente");
            this.loadNotificaciones(); // Recargar la lista de notificaciones
        } catch (error) {
            console.error("Error al eliminar la notificación:", error);
            alert("Error al eliminar la notificación");
        }
    }
    private handleView(notificacion: notificacion): void {
        // Aquí puedes implementar la lógica para ver los detalles de la notificación
        console.log(`Ver notificación: ${notificacion.mensaje}`);
        // Por ejemplo, podrías mostrar un modal con los detalles
    }   
}
