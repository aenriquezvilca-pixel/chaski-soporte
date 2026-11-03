import { useState } from "react"
import SolicitudForm from "@/components/SolicitudForm"
import ListaSolicitudes from "@/components/ListaSolicitudes"
import FiltrosSolicitudes from "@/components/FiltrosSolicitudes"

function App() {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      titulo: "Conexión Wi-Fi inestable",
      descripcion: "La señal se interrumpe con frecuencia en la sala de reuniones.",
      solicitante: "Lucía Mendoza",
      prioridad: "media",
      estado: "pendiente",
    },
  ])
  const [filtro, setFiltro] = useState("todas")

  const agregarSolicitud = (nueva) => {
    setSolicitudes([...solicitudes, { ...nueva, id: Date.now(), estado: "pendiente" }])
  }

  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(
      solicitudes.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    )
  }

  const eliminarSolicitud = (id) => {
    setSolicitudes(solicitudes.filter((s) => s.id !== id))
  }

  const solicitudesFiltradas =
    filtro === "todas" ? solicitudes : solicitudes.filter((s) => s.estado === filtro)

  const conteos = {
    todas: solicitudes.length,
    pendiente: solicitudes.filter((s) => s.estado === "pendiente").length,
    "en proceso": solicitudes.filter((s) => s.estado === "en proceso").length,
    resuelta: solicitudes.filter((s) => s.estado === "resuelta").length,
  }

  return (
    <div className="min-h-screen bg-[#e8f2ed] text-[#163a3a]">
      <header className="bg-[#163a3a] px-6 py-8 text-[#e8f2ed]">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e8895b]">Chaski · Soporte cercano</p>
          <h1 className="text-3xl font-bold">Centro de ayuda del equipo</h1>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-8 md:grid-cols-[360px_1fr]">
        <SolicitudForm onAgregar={agregarSolicitud} />
        <section className="space-y-4">
          <FiltrosSolicitudes
            filtroActual={filtro}
            onCambiarFiltro={setFiltro}
            conteos={conteos}
          />
          <ListaSolicitudes
            solicitudes={solicitudesFiltradas}
            onCambiarEstado={cambiarEstado}
            onEliminar={eliminarSolicitud}
          />
        </section>
      </main>
    </div>
  )
}

export default App
