import SolicitudItem from "@/components/SolicitudItem"

function ListaSolicitudes({ solicitudes, onCambiarEstado, onEliminar }) {
  if (solicitudes.length === 0) {
    return (
      <p className="rounded-lg border-2 border-dashed border-[#163a3a]/30 p-8 text-center text-[#163a3a]/60">
        No hay solicitudes para mostrar.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {solicitudes.map((s) => (
        <SolicitudItem
          key={s.id}
          solicitud={s}
          onCambiarEstado={onCambiarEstado}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}

export default ListaSolicitudes
