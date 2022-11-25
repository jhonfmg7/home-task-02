import Movie from "../types/movie.interface";

const sortedBy = (list: Movie[], typeSorted: string) => {
  switch (typeSorted) {
    case "date":
      return [...list].sort((a, b) => {
        let aDate = new Date(a.release_date);
        let bDate = new Date(b.release_date);
        return bDate.getTime() - aDate.getTime();
      });
    case "rating":
      return [...list].sort((a, b) => b.vote_average - a.vote_average);
    case "runtime":
      return [...list].sort((a, b) => b.runtime - a.runtime);
    default:
      return list;
  }
};

export default sortedBy;