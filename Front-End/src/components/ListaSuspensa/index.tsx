import './index.css'

interface ListaSuspensaProps {
  onAlterado: (value: string) => void
  label: String
  required: boolean
  value: String
  timesNomes: String[]
}

const ListaSuspensa = ({onAlterado, label, required, value, timesNomes}: ListaSuspensaProps) => {
  const onSelecionado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onAlterado(event.target.value)
  }
  
  return (
    <div className='lista-suspensa'>
      <label>{label}</label>

      <select required={required} value={value} onChange={onSelecionado}>
        {timesNomes.map(timeNome => <option key={timeNome}>{timeNome}</option>)}
      </select>
    </div>
  )
}

export default ListaSuspensa