import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const colorPrioridad = {
  baja: "bg-emerald-100 text-emerald-800",
  media: "bg-amber-100 text-amber-800",
  alta: "bg-red-100 text-red-800",
}

const colorEstado = {
  pendiente: "border-l-[#e8895b]",
  "en proceso": "border-l-[#3b82f6]",
  resuelta: "border-l-emerald-500",
}

const normalizarEstado = (estado) => {
  const valor = String(estado ?? "").trim().toLowerCase()
  return valor in colorEstado ? valor : "pendiente"
}

const normalizarPrioridad = (prioridad) => {
  const valor = String(prioridad ?? "").trim().toLowerCase()
  return valor in colorPrioridad ? valor : "media"
}

function SolicitudItem({ solicitud, onCambiarEstado, onEliminar }) {
  const { id, titulo, descripcion, solicitante, prioridad, estado } = solicitud
  const estadoNormalizado = normalizarEstado(estado)
  const prioridadNormalizada = normalizarPrioridad(prioridad)

  return (
    <Card className={`border-l-8 bg-white ${colorEstado[estadoNormalizado]}`}>
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold">{titulo}</h3>
          <Badge className={colorPrioridad[prioridadNormalizada]}>
            {prioridadNormalizada}
          </Badge>
        </div>
        <p className="text-sm text-[#163a3a]/80">{descripcion}</p>
        <p className="text-xs text-[#163a3a]/60">Solicitado por: {solicitante}</p>

        <div className="flex items-center gap-2">
          <Select
            value={estadoNormalizado}
            onValueChange={(nuevo) => onCambiarEstado?.(id, nuevo)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en proceso">En proceso</SelectItem>
              <SelectItem value="resuelta">Resuelta</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onEliminar?.(id)}
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default SolicitudItem
