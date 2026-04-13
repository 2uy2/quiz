import NavDropDown from  'react-bootstrap/NavDropDown'
import { useTranslation, Trans } from 'react-i18next';
const Language = (props)=>{
    const { t, i18n } = useTranslation();

const handleChangeLanguage= (Language)=>{
    i18n.changeLanguage(Language);
}

    return(
        <NavDropDown title={i18n.language ==='vi'? 'Việt Nam' :'English'} id="basic-nav-dropdown2" className='languages'>
            <NavDropDown.Item onClick={()=>handleChangeLanguage('en')}>English</NavDropDown.Item>
            <NavDropDown.Item onClick={()=>handleChangeLanguage('vi')}>Việt Nam</NavDropDown.Item>
        </NavDropDown>
    )
}
export default Language;