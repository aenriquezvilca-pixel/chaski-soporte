import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SolicitudForm({ onAgregar }) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [solicitante, setSolicitante] = useState("")
  const [prioridad, setPrioridad] = useState("media")
  const [errores, setErrores] = useState({})

  const manejarEnvio = (e) => {
    e.preventDefault()
    const nuevosErrores = {}
    if (!titulo.trim()) nuevosErrores.titulo = "El título es obligatorio."
    if (!descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria."
    if (!solicitante.trim()) nuevosErrores.solicitante = "Indica el nombre del solicitante."

    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    onAgregar({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      solicitante: solicitante.trim(),
      prioridad,
      estado: "pendiente",
    })
    setTitulo("")
    setDescripcion("")
    setSolicitante("")
    setPrioridad("media")
  }

  return (
    <Card className="h-fit border-2 border-[#163a3a] bg-white shadow-[6px_6px_0_#e8895b]">
      <CardHeader>
        <CardTitle className="text-xl">Nueva solicitud</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarEnvio} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              aria-invalid={Boolean(errores.titulo)}
              aria-describedby={errores.titulo ? "error-titulo" : undefined}
            />
            {errores.titulo && (
              <p id="error-titulo" role="alert" className="text-sm font-medium text-red-600">
                {errores.titulo}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              aria-invalid={Boolean(errores.descripcion)}
              aria-describedby={errores.descripcion ? "error-descripcion" : undefined}
            />
            {errores.descripcion && (
              <p id="error-descripcion" role="alert" className="text-sm font-medium text-red-600">
                {errores.descripcion}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="solicitante">Solicitante</Label>
            <Input
              id="solicitante"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              aria-invalid={Boolean(errores.solicitante)}
              aria-describedby={errores.solicitante ? "error-solicitante" : undefined}
            />
            {errores.solicitante && (
              <p id="error-solicitante" role="alert" className="text-sm font-medium text-red-600">
                {errores.solicitante}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="prioridad">Prioridad</Label>
            <Select value={prioridad} onValueChange={setPrioridad}>
              <SelectTrigger id="prioridad" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baja">Baja</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-[#163a3a] hover:bg-[#245454]">
            Registrar solicitud
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SolicitudForm
