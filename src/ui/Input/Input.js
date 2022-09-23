import style from '../../assets/scss/ui.module.scss'

const Input = ({ pad, type, placeholder, value, onChange }) => {
  return (
    <input
      style={{paddingLeft:pad}}
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