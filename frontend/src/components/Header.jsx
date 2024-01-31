import{Navbar,Nav,Container} from 'react-bootstrap';
import logo from '../assets/logo.png';

const Header =()=>{
    return(
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>
                        <img src={logo} alt='Minicore'/>
                        MiniCore</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <Nav.Link href='/filter'>Buscar</Nav.Link>
                            <Nav.Link href='/progreso'>Progresos</Nav.Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header