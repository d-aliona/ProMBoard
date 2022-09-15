import style from '../../assets/scss/ui.module.scss'

const CloseButton = ({ width, height, border, onClick }) => {
  return (
    <span
        className={style.closeButton} 
        style={{width: width, height: height, border: border}}
        onClick={onClick}> 
        × 
    </span>
  )
}

export default CloseButton