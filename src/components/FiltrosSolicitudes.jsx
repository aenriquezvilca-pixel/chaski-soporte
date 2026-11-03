import { Button } from "@/components/ui/button"

const opciones = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "pendiente", etiqueta: "Pendientes" },
  { valor: "en proceso", etiqueta: "En proceso" },
  { valor: "resuelta", etiqueta: "Resueltas" },
]

function FiltrosSolicitudes({ filtroActual, onCambiarFiltro, conteos }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opciones.map((op) => (
        <Button
          key={op.valor}
          type="button"
          variant={filtroActual === op.valor ? "default" : "outline"}
          className={
            filtroActual === op.valor
              ? "bg-[#163a3a]"
              : "border-[#163a3a]"
          }
          onClick={() => onCambiarFiltro(op.valor)}
        >
          {op.etiqueta} ({conteos[op.valor]})
        </Button>
      ))}
    </div>
  )
}

export default FiltrosSolicitudes
