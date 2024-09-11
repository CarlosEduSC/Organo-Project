import './index.css'

interface CampoTextoProps {
  onAlterado: (value: string) => void
  label: string
  value: string
  required?: boolean
  placeHolder?: string
  type?: "date" | "text" | "email" | "password" | "number" | "color"
}

const CampoTexto = ({onAlterado, label, value, required = false, placeHolder = "", type = "text"}: CampoTextoProps) => {
  const onDigitado = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAlterado(event.target.value)
  }

  return (
    <div className='campo-texto'>
        <label>{label}</label>
        
        <input 
          value={value} 
          onChange={onDigitado} 
          required={required} 
          placeholder={placeHolder} 
          type={type}
        />
    </div>
  )
}

export default CampoTexto