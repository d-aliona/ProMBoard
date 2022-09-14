import style from '../../assets/scss/ui.module.scss'

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
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