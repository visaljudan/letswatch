import React, { useState, useEffect } from "react";
import { Logo } from "../components/Logo";
import { FaArrowDown, FaArrowUp, FaSearch, FaTimes } from "react-icons/fa";
import Tag from "../components/Tag";
import { useNavigate } from "react-router-dom";

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();
  const [genres, setGenres] = useState<any>([]);
  const [tvShows, setTvShows] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [years, setYears] = useState<any>([]);
  const [formData, setFormData] = useState<{ selectedGenres: string[] }>({
    selectedGenres: [],
  });

  const [isGenresVisible, setIsGenresVisible] = useState(false);

  const handleDown = () => {
    setIsGenresVisible(!isGenresVisible);
  };

  const handleClear = () => {
    setFormData({ selectedGenres: [] });
    setSelectedTags([]);
    if (selectedTags.length === 0 && formData.selectedGenres.length === 0) {
      navigate("/"); // Redirect to homepage
    }
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagSelect = (tag: string): void => {
    let updatedSelectedTags: string[] = [];

    if (selectedTags.includes(tag)) {
      updatedSelectedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
    } else {
      updatedSelectedTags = [...selectedTags, tag];
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedGenres: updatedSelectedTags,
    }));

    setSelectedTags(updatedSelectedTags);
  };

  // Fetch Genres
  const fetchGenres = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/genres", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setGenres(data.data);
    } catch (error) {
      setMessage("");
    }
  };

  // Fetch TV Shows
  const fetchTVShow = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/tv_shows", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      setTvShows(data.data);
    } catch (error) {
      setMessage("");
    }
  };

  // Fetch Countries
  const fetchCountries = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/countries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      setCountries(data.data);
    } catch (error) {
      setMessage("");
    }
  };

  // Fetch Years
  const fetchYears = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/years", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      setYears(data.data);
    } catch (error) {
      setMessage("An error occurred while fetching the years.");
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchTVShow();
    fetchCountries();
    fetchYears();
  }, []);

  return (
    <>
      <div className="w-full h-18 flex items-center justify-start ">
        <Logo />
        <form className="flex items-center justify-between text-lg border border-secondary px-4 py-1 rounded w-full">
          <div className="flex items-center w-full ">
            <FaSearch className="mr-4" />
            <input
              className="w-11/12 p-2 text-base bg-primary text-text rounded"
              placeholder="Search by selected tags"
              id="search"
              type="text"
              value={formData.selectedGenres.join(", ")}
              readOnly
            />
          </div>
          <FaTimes onClick={handleClear} className="right-0 cursor-pointer" />
        </form>
      </div>
      <div>
        <div
          onClick={handleDown}
          className="w-full border flex items-center group cursor-pointer font-bold text-aprimary"
        >
          <div className="w-full py-2 px-4">
            <label>Genre</label>
          </div>
          <div className="w-full py-2 px-4">
            <label>TV-Show</label>
          </div>
          <div className="w-full py-2 px-4">
            <label>Countries</label>
          </div>
          <div className="w-full py-2 px-4 flex justify-between items-center">
            <label>Years</label>
            {isGenresVisible ? (
              <FaArrowUp className="text-xl" />
            ) : (
              <FaArrowDown className="text-xl" />
            )}
          </div>
        </div>
        {isGenresVisible && (
          <div className="w-full h-60 flex justify-between overflow-hidden border-b border-x">
            <div className="w-full py-2 px-3 overflow-y-auto max-h-60">
              <div className="flex flex-wrap">
                {genres?.map((genre: any) => (
                  <Tag
                    key={genre.id}
                    label={genre.genre_name}
                    onSelect={handleTagSelect}
                    isSelected={selectedTags.includes(genre.genre_name)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full py-2 px-3 overflow-y-auto max-h-60">
              <div className="flex flex-wrap">
                {tvShows?.map((tvShow: any) => (
                  <Tag
                    key={tvShow.id}
                    label={tvShow.tv_show_name}
                    onSelect={handleTagSelect}
                    isSelected={selectedTags.includes(tvShow.tv_show_name)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full py-2 px-3 overflow-y-auto max-h-60">
              <div className="flex flex-wrap">
                {countries?.map((country: any) => (
                  <Tag
                    key={country.id}
                    label={country.country_name}
                    onSelect={handleTagSelect}
                    isSelected={selectedTags.includes(country.country_name)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full py-2 px-3 overflow-y-auto max-h-60">
              <div className="flex flex-wrap">
                {years?.map((year: any) => (
                  <Tag
                    key={year.id}
                    label={year.year}
                    onSelect={handleTagSelect}
                    isSelected={selectedTags.includes(year.year)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
