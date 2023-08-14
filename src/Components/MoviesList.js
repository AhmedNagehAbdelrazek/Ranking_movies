import { useDispatch, useSelector } from "react-redux";
import { Movie } from "./Movie";
import { Button, Col, Row } from "react-bootstrap";
import { MAX_PAGE_NUM, fetchMoviesNextPage, fetchMoviesPreviosPage, fetchMoviesWithPageNumber } from "../rtk/Slices/MoviesSlice";

export function MoviesList() {

    const PageData = useSelector((state) => state.Movies);
    const movies = PageData.results;
    const dispatch = useDispatch();

    function PageNumbering(){
        let list = [];
        let pageNumbersList = [];
        const numberofShowingnumbers = 5;
        let firstnumber = PageData.page > MAX_PAGE_NUM - (numberofShowingnumbers ) ? MAX_PAGE_NUM - (numberofShowingnumbers) : PageData.page;

        list.push(<Col key={-1050} xs={1}>
            <Button variant="light" onClick={()=> dispatch(fetchMoviesPreviosPage())} disabled={PageData.page === 1 ? true: false}>Previos</Button>
        </Col>);
        if(firstnumber !== 1){
          pageNumbersList.push(
              <Button key={1} variant="outline-secondary" onClick={()=> dispatch(fetchMoviesWithPageNumber(1))} disabled={PageData.page === 1 ? true: false}>{1}</Button>
          );
        }
        for(let i = 1; i <= numberofShowingnumbers ; i++){
            
            let pageNum = i + firstnumber - 1;
            if(pageNum === MAX_PAGE_NUM || isNaN(pageNum)) continue;
            pageNumbersList.push(
                <Button id={pageNum} key={"" + pageNum} variant="outline-secondary" onClick={()=> dispatch(fetchMoviesWithPageNumber(pageNum))} disabled={PageData.page === pageNum ? true: false}>{pageNum}</Button>
            );
        }
        
        pageNumbersList.push(
            <Button key={MAX_PAGE_NUM} variant="outline-secondary" onClick={()=> dispatch(fetchMoviesWithPageNumber(MAX_PAGE_NUM))} disabled={PageData.page === MAX_PAGE_NUM ? true: false}>{MAX_PAGE_NUM}</Button>
        );
        
        list.push(<Col id="numbers" key={"numbers"} xs={3} md="auto" > {pageNumbersList} </Col>);

        list.push(<Col key={1050} xs={1}>
            <Button variant="light" onClick={()=> {dispatch(fetchMoviesNextPage())}} disabled={MAX_PAGE_NUM === PageData.page ? true: false}>Next</Button>
        </Col>);

        return list;
    }
    return (
    <>
      {movies != null ? movies.map(movie => {
        return <Movie key={movie.id} movie={movie}/>
      }) : null}
      <Row className="justify-content-md-center">
        {PageNumbering()}
      </Row>
    </>
  );
}