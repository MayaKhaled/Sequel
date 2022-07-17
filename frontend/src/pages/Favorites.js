import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import Card from "../components/Card/Card";
import ReactPaginate from "react-paginate";
import "../stylesheets/list.css";

export default function Favorites() {
  const [list, setList] = React.useState([]);
  const headers = localStorage.getItem("token");
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color,
        backgroundColor: color,
        height: " 0.2vw",
        width: "94vw",
      }}
    />
  );
  useEffect(() => {
    axios
      .get(
        "http://localhost:2000/api/user/getList",

        {
          headers: {
            auth: headers,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.data === []) {
          setList([]);
        } else {
          const fav = res.data.data;
          const lnew = [];
          for (let i = 0; i < fav.length; i++) {
            lnew.push({
              id: i,
              title: fav[i].title,
              description: fav[i].description,
              genre: fav[i].genre,
              image: fav[i].image,
              fav: true,
            });
          }
          setList(fav);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFavClick = async (event, movie) => {
    event.preventDefault();
    {
      let l = [];
      let fav = true;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === movie.id) {
          fav = false;
        } else {
          l.push(list[i]);
        }
      }
      setList(l);
      console.log(movie, "Movie");
      axios
        .post(
          "http://localhost:2000/api/user/removeMovie",
          { title: movie.title },
          {
            headers: {
              auth: headers,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const handlePageClick = async (data) => {
  //   let currentPage = data.selected + 1;

  //   await fetchMovies(currentPage);
  // };

  // const fetchMovies = (currentPage) => {
  //   axios
  //     .request({
  //       method: "GET",
  //       url: "https://movies-app1.p.rapidapi.com/api/movies",
  //       params: { page: currentPage, limit: "9" },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "dfd1b62e6fmshddc7874a6f12766p18752cjsn3529d472beae",
  //         "X-RapidAPI-Host": "movies-app1.p.rapidapi.com",
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //       const movies = response.data.results;
  //       const l = [];
  //       for (let i = 0; i < movies.length; i++) {
  //         l.push({
  //           id: i,
  //           title: movies[i].title,
  //           image: movies[i].image,
  //           description: movies[i].description,
  //           genre: movies[i].genres[0].name,
  //           fav: false,
  //         });
  //       }
  //       console.log(!headers, "Headers");
  //       if (!headers) {
  //         setList(l);
  //       } else {
  //         axios
  //           .get(
  //             "http://localhost:2000/api/user/getList",

  //             {
  //               headers: {
  //                 auth: headers,
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             console.log(res.data.data);
  //             if (res.data.data === []) {
  //               setList(l);
  //             } else {
  //               const fav = res.data.data;
  //               const lnew = [];
  //               for (let i = 0; i < l.length; i++) {
  //                 if (checkInList(fav, l[i])) {
  //                   lnew.push({
  //                     title: movies[i].title,
  //                     image: movies[i].image,
  //                     description: movies[i].description,
  //                     genre: movies[i].genres[0].name,
  //                     fav: true,
  //                   });
  //                 } else {
  //                   lnew.push({
  //                     title: movies[i].title,
  //                     image: movies[i].image,
  //                     description: movies[i].description,
  //                     genre: movies[i].genres[0].name,
  //                     fav: false,
  //                   });
  //                 }
  //               }
  //               setList(lnew);
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  return (
    <div>
      <Navbar />
      <div className="favourite">Favourite List</div>
      <ColoredLine color="black" />

      <div className="container">
        <div className="row m-2">
          {list.map((item) => (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <Card item={item} handleFavClick={handleFavClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
