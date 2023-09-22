import React, { useState, useEffect } from "react";

function Home() {
  const [open, setopen] = useState(false);
  const [getNews, setGetNews] = useState([]);
  const [getCategories, setgetCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [uniqueAuthors, setUniqueAuthors] = useState([]);
  const [category, setcategory] = useState("");

  //   useEffect(() => {
  //     fetch(
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setGetNews(data.articles);

  //         // Mengambil nama-nama penulis yang unik dan mengubahnya menjadi array
  //         const authorsSet = new Set(data.articles.map((news) => news.author));
  //         const authorsArray = Array.from(authorsSet);
  //         setUniqueAuthors(authorsArray);

  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);

  const handleCategoryChange = (newCategory) => {
    setcategory(newCategory);
  };

  useEffect(() => {
    fetch(
      //   "https://newsapi.org/v2/top-headlines?country=us&apiKey=33505a2f008d48319c0237e193f93cc3"
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=c053857c273e4cab9070a358522f1c99`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setgetCategories(data.articles);
        } else {
          setgetCategories([]);
        }

        const authorsSet = new Set(data.articles.map((news) => news.author));
        const authorsArray = Array.from(authorsSet);
        setUniqueAuthors(authorsArray);

        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [category]); // Tambahkan category ke dalam dependencies useEffect

  return (
    <>
      <nav className="fixed w-full h-16">
        <div className="bg-indigo-400 h-full  top-0 right-0 left-0 rounded-sm w-full flex items-center px-5 shadow-md">
          <div className="text-white sm:text-3xl text-xl font-bold w-full lg:w-1/2 h-full my-auto lg:pr-0 flex items-center">
            News
          </div>
          <button
            onClick={() => setopen(!open)}
            className="text-white sm:text-3xl bg-transparent text-4xl font-extrabold h-full my-auto flex items-center lg:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </button>

          <div className=" w-1/2 h-full hidden lg:flex items-center justify-between text-white text-lg font-semibold">
            <button
              className=""
              onClick={() => handleCategoryChange("business")}
            >
              Business
            </button>
            <button
              className=""
              onClick={() => handleCategoryChange("entertainment")}
            >
              Entertainment
            </button>
            <button className="" onClick={() => handleCategoryChange("health")}>
              Health
            </button>
            <button
              className=""
              onClick={() => handleCategoryChange("science")}
            >
              Science
            </button>
            <button className="" onClick={() => handleCategoryChange("sports")}>
              Sports
            </button>
            <button
              className=""
              onClick={() => handleCategoryChange("technology")}
            >
              Technology
            </button>
          </div>
        </div>
        <div
          className={`lg:hidden absolute bg-black pr-8 py-5 w-1/2 h-screen transition-all duration-300 backdrop-blur-3xl ${
            open ? "right-0" : "-right-[120%]"
          } bg-opacity-80`}
        >
          <div className="grid h-auto gap-3 place-items-end text-white text-lg font-semibold">
            <button
              className="hover:border-b-2 border-white"
              onClick={() => handleCategoryChange("business")}
            >
              Business
            </button>
            <button
              className="hover:border-b-2 border-white"
              onClick={() => handleCategoryChange("entertainment")}
            >
              Entertainment
            </button>
            <button
              className="hover:border-b-2 border-white"
              onClick={() => handleCategoryChange("health")}
            >
              Health
            </button>
            <button
              className="hover:border-b-2 border-white"
              onClick={() => handleCategoryChange("science")}
            >
              Science
            </button>
            <button
              className="hover:border-b-2 border-white"
              onClick={() => handleCategoryChange("sports")}
            >
              Sports
            </button>
            <button
              className="hover:border-b-2 border-white"
              onClick={() => handleCategoryChange("technology")}
            >
              Technology
            </button>
          </div>
        </div>
      </nav>
      <section className="text-gray-600 body-font bg-white">
        <div className="container px-5 py-24 mx-auto">
          <p className="capitalize text-2xl font-bold">{category}</p>
          <div className="flex w-full mb-4 p-4 items-center text-black">
            <div className="grid place-items-end lg:flex w-full gap-2">
              <input
                type="text"
                className="bg-[#F6F6FB] w-full py-1 px-4 rounded-md"
                placeholder="Search by title..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <select
                className="bg-[#F6F6FB] w-full lg:w-2/3 rounded-md py-1 px-4 ml-2"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
              >
                <option value="">Select Author</option>
                {uniqueAuthors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {getCategories.length > 0 ? (
              getCategories
                .filter((news) => {
                  if (authorFilter && authorFilter !== "") {
                    return news.author === authorFilter;
                  }
                  return true;
                })
                .filter((news) => {
                  if (searchKeyword && searchKeyword !== "") {
                    return news.title
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase());
                  }
                  return true;
                })
                .map((news, index) => (
                  <div className="xl:w-1/3 md:w-1/2 p-4 h-full" key={index}>
                    <div className="bg-white shadow-xl rounded-lg h-[500px] grid place-items-stretch">
                      <img
                        className="lg:h-60 xl:h-56 md:h-64 sm:h-48 rounded w-full object-cover object-center mb-6"
                        src={news.urlToImage}
                        alt={news.title}
                      />
                      <h3 className="mx-6 tracking-widest text-indigo-500 text-xs font-medium title-font">
                        {news.author}
                      </h3>
                      <h2 className="mx-6 text-lg text-gray-900 font-medium title-font mb-4">
                        {news.title}
                      </h2>
                      <p className="mx-6 leading-relaxed text-base text-justify truncate">
                        {news.description}
                      </p>
                      <a
                        href={news.url}
                        className="mx-6 bg-indigo-400 hover:bg-indigo-600 rounded-lg p-2 w-fit h-fit text-black hover:text-white"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))
            ) : (
              <p className="flex items-center justify-center w-full h-full bg-white text-gray-500">
                Loading...
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
