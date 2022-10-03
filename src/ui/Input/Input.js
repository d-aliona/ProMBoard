import style from '../../assets/scss/ui.module.scss'

const Input = ({ pad, type, placeholder, value, onChange, height }) => {
  return (
    <input
      style={{paddingLeft:pad, height:height}}
      className={style.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  )
}

export default Input