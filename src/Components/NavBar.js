import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export function MainNavBar(){
    const SelectedMovies = useSelector(state => state.SelectedMovies);
    return(
    <>
    <Navbar bg="dark" data-bs-theme="dark" className='sticky-top'>
        <Container>
          <Link to={"/"} className='navbar-brand'>RankingMovies</Link>
          <Nav className="ms-lg-auto pe-lg-3">
            <Link to={"/"} className='nav-link'>Home</Link>
            <Link to={"/RankItems"} className='nav-link'>Ranking{SelectedMovies.length > 0 ? `(${SelectedMovies.length})`: null}</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    );
}