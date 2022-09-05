import style from '../../assets/scss/topbar.module.scss'

const Initials = ({user}) => {
    return (
        <div className={style.circle}>
            {user?.firstName[0] + user?.lastName[0]}
        </div>
    )
}

export default Initials