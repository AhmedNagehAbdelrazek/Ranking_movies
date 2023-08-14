import { useDispatch, useSelector } from "react-redux";
import MovieImage from "../Data/MoviesImage";
import RankingGrid from "./RankingGrid";
import { IMG_W500 } from "../Utilies";
import { ClearSelectedMovies, ResetAllMovies, updateMovies } from "../rtk/Slices/SelectedMoviesSlice";
import { Button, Col, Row } from "react-bootstrap";

export function RankItems() {
  const movies = useSelector(state => state.SelectedMovies);
  const dispatch = useDispatch();
  console.log("selected Movies",movies);

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("drag",ev);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev) {
    console.log("drop" ,ev);

    ev.preventDefault();
    const targetElm = ev.target;
    const targetId = parseInt(targetElm.id.substring(5));
    console.log("targetId",targetId);
    if (targetElm.nodeName === "IMG") {
      return false;
    }
    if(targetElm.className === "items-not-ranked"){
      var data = parseInt(ev.dataTransfer.getData("text").substring(5));
      console.log("data",data);
      const transformedCollection = movies.map((item) =>
      parseInt(item.id) == parseInt(data)
          ? { ...item, ranking: 0}
          : { ...item, ranking: item.ranking }
      );
      dispatch(updateMovies(transformedCollection));
      return;
    }
    if (targetElm.childNodes.length === 0) {
      var data = parseInt(ev.dataTransfer.getData("text").substring(5));
      console.log("data",data);
      const transformedCollection = movies.map((item) =>
      parseInt(item.id) == parseInt(data)
          ? { ...item, ranking: targetId}
          : { ...item, ranking: item.ranking }
      );
      dispatch(updateMovies(transformedCollection));
    }
  }
  return (
    <main className="center-elements">
      <RankingGrid
        items={movies}
        imgArr={MovieImage}
        drag={drag}
        allowDrop={allowDrop}
        drop={drop}
      />
      <div className="items-not-ranked" onDrop={drop} onDragOver={allowDrop}>
        {movies.length > 0 ? (
          movies.filter(i => i.ranking == 0).map((item) => (
            <div className="unranked-cell" key={item.Id}>
              <img
                id={`item-${item.id}`}
                src={IMG_W500 + item.poster_path}
                style={{ cursor: "pointer" }}
                draggable="true"
                onDragStart={drag}
              />
            </div>
          ))
        ) : (
          <div>No Movies To Rank</div>
        )}
      </div>
      <Row className="justify-content-center">
          <Col>
            <Button variant="primary" className="mb-2" onClick={()=> dispatch(ResetAllMovies())}>Rest all</Button>
          </Col>
          <Col>
            <Button variant="primary" className="mb-2" onClick={()=> dispatch(ClearSelectedMovies())}>DeleteAllSelected</Button>
          </Col>
      </Row>
    </main>
  );
}
