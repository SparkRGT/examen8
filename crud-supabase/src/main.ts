
// import { PacientePresentation } from './presentations/PacientePresentation'
import { CategoryPresentation } from './presentations/CategoryPresentation'
import { CategoryRepository, PacienteRepository } from './repositories'

// Mostrar datos iniciales en consola
console.log('📊 Datos iniciales cargados:')
console.log('📋 Categorías:', CategoryRepository.getAll())
console.log('👥 Pacientes:', PacienteRepository.getAll())

console.log('📈 Estadísticas:')
console.log(`   - Total categorías: ${CategoryRepository.count()}`)
console.log(`   - Total pacientes: ${PacienteRepository.count()}`)
console.log(`   - Total tickets: ${CategoryRepository.getAll().reduce((acc, cat) => acc + cat.tickets.length, 0)}`)

// Inicializar la presentación de categorías
new CategoryPresentation()
// new PacientePresentation()

