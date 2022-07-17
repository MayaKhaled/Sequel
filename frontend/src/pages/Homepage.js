import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import axios from "axios";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [list, setList] = React.useState([]);
  const headers = localStorage.getItem("token");
  const navigate = useNavigate();

  const options = {
    method: "GET",
    url: "https://movies-app1.p.rapidapi.com/api/movies",
    params: { page: "15", limit: "9" },
    headers: {
      "X-RapidAPI-Key": "dfd1b62e6fmshddc7874a6f12766p18752cjsn3529d472beae",
      "X-RapidAPI-Host": "movies-app1.p.rapidapi.com",
    },
  };

  const checkInList = (list, item) => {
    for (let i = 0; i < list.length; i++) {
      if (item.title === list[i].title) return true;
    }
    return false;
  };

  const fetchMovies = (currentPage) => {
    axios
      .request({
        method: "GET",
        url: "https://movies-app1.p.rapidapi.com/api/movies",
        params: { page: currentPage, limit: "9" },
        headers: {
          "X-RapidAPI-Key":
            "dfd1b62e6fmshddc7874a6f12766p18752cjsn3529d472beae",
          "X-RapidAPI-Host": "movies-app1.p.rapidapi.com",
        },
      })
      .then(function (response) {
        const movies = response.data.results;
        const l = [];
        for (let i = 0; i < movies.length; i++) {
          l.push({
            id: i,
            title: movies[i].title,
            image: movies[i].image,
            description: movies[i].description,
            genre: movies[i].genres[0].name,
            fav: false,
          });
        }
        if (!headers) {
          setList(l);
        } else {
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
              if (res.data.data === []) {
                setList(l);
              } else {
                const fav = res.data.data;
                const lnew = [];
                for (let i = 0; i < l.length; i++) {
                  if (checkInList(fav, l[i])) {
                    lnew.push({
                      title: movies[i].title,
                      image: movies[i].image,
                      description: movies[i].description,
                      genre: movies[i].genres[0].name,
                      fav: true,
                    });
                  } else {
                    lnew.push({
                      title: movies[i].title,
                      image: movies[i].image,
                      description: movies[i].description,
                      genre: movies[i].genres[0].name,
                      fav: false,
                    });
                  }
                }
                setList(lnew);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        const movies = response.data.results;
        const l = [];
        for (let i = 0; i < movies.length; i++) {
          l.push({
            id: i,
            title: movies[i].title,
            image: movies[i].image,
            description: movies[i].description,
            genre: movies[i].genres[0].name,
            fav: false,
          });
        }
        if (!headers || headers === undefined) {
          setList(l);
        } else {
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
              if (res.data.data === []) {
                setList(l);
              } else {
                const fav = res.data.data;
                const lnew = [];
                for (let i = 0; i < l.length; i++) {
                  console.log(fav, "Included in fav ");
                  if (checkInList(fav, l[i])) {
                    lnew.push({
                      id: i,
                      title: l[i].title,
                      description: l[i].description,
                      genre: l[i].genre,
                      image: l[i].image,
                      fav: true,
                    });
                  } else {
                    lnew.push({
                      id: i,
                      title: l[i].title,
                      description: l[i].description,
                      genre: l[i].genre,
                      image: l[i].image,
                      fav: false,
                    });
                  }
                }
                setList(lnew);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    await fetchMovies(currentPage);
  };

  const handleFavClick = async (event, movie) => {
    event.preventDefault();
    if (!headers) {
      navigate("/login");
    } else {
      let l = [];
      let fav = false;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === movie.id) {
          l.push({
            id: list[i].id,
            title: list[i].title,
            image: list[i].image,
            description: list[i].description,
            genre: list[i].genre,
            fav: !list[i].fav,
          });
          fav = !list[i].fav;
        } else {
          l.push(list[i]);
        }
      }
      setList(l);
      if (fav === true) {
        axios
          .post(
            "http://localhost:2000/api/user/addMovie",
            {
              movie: {
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                image: movie.image,
              },
            },
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
      } else {
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
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row m-2">
          {list.map((item) => (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <Card item={item} handleFavClick={handleFavClick} />
            </div>
          ))}
        </div>
      </div>

      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={15}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}
