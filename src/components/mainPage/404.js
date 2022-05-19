import { NavLink } from "react-router-dom"

const Page404 = () => {
    return(
        <div>
            <p>Вы попали на не существующую страницу</p>
            <NavLink to="/">Перейти на главную</NavLink>
        </div>
    )
}

export default Page404;