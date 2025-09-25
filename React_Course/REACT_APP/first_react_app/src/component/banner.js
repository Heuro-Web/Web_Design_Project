import logo1 from '../images/logo1.png'
function Header(){
    const title_app = 'Jungle House'
    return(
        <div className='header'>
            <img src={logo1} alt='le logo principal' className='img' />
            <h1 className="title_app">{title_app}</h1>
        </div>
    )
}
export default Header