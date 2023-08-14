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
        let numbersList = [];
        let firstnumber = PageData.page > MAX_PAGE_NUM - 3 ? MAX_PAGE_NUM - 3 : PageData.page;

        list.push(<Col key={"Previos"} xs={1}>
            <Button variant="light" onClick={()=> dispatch(fetchMoviesPreviosPage())} disabled={PageData.page == 1 ? true: false}>Previos</Button>
        </Col>);

        for(let i= firstnumber; i < firstnumber + 3 ;i++){
            if(i == firstnumber && i != 1){
                numbersList.push(
                    <Button key={1} variant="outline-secondary" onClick={()=> dispatch(fetchMoviesWithPageNumber(1))} disabled={PageData.page == 1 ? true: false}>{1}</Button>
                );
            }
            numbersList.push(
                <Button key={i} variant="outline-secondary" onClick={()=> dispatch(fetchMoviesWithPageNumber(i))} disabled={PageData.page == i ? true: false}>{i}</Button>
            );
            if(i == (2 + firstnumber) && i != MAX_PAGE_NUM){
                numbersList.push(
                    <Button key={MAX_PAGE_NUM} variant="outline-secondary" onClick={()=> dispatch(fetchMoviesWithPageNumber(MAX_PAGE_NUM))} disabled={PageData.page == MAX_PAGE_NUM ? true: false}>{MAX_PAGE_NUM}</Button>
                );
            }
        }

        list.push(<Col key={"numbers"} xs={3} md="auto" > {numbersList} </Col>);

        list.push(<Col key={"Next"} xs={1}>
            <Button variant="light" onClick={()=> dispatch(fetchMoviesNextPage())} disabled={MAX_PAGE_NUM == PageData.page ? true: false}>Next</Button>
        </Col>);
        
        return list;
    }
    return (
    <>
      {movies != null ? movies.map(movie => {
        return <Movie movie={movie}/>
      }) : null}
      <Row className="justify-content-md-center">
        {PageNumbering()}

      </Row>
    </>
  );
}