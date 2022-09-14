import style from '../../assets/scss/ui.module.scss'

const CloseButton = ({ height, border, onClick }) => {
  return (
    <span
        className={style.closeButton} 
        style={{height: height, border: border}}
        onClick={onClick}> 
        × 
    </span>
  )
}

export default CloseButton