import style from '../../assets/scss/ui.module.scss'

const Logo = () => {
    return (
        <div className={style.logo}>
            <div className={style.logoicon}></div>
            <div className={style.logotext}>ProMBoard</div>
        </div>
    )
}

export default Logo