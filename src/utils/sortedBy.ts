import Movie from "../types/movie.interface";

const sortedBy = (list: Movie[], typeSorted: string) => {
    let sortedList = [ ...list ];
    if (typeSorted === "date") {
        sortedList = list.sort( (a, b) => {
            let aDate = new Date(a.release_date)
            let bDate = new Date(b.release_date)
            return bDate.getTime() - aDate.getTime();
        });
    } else if (typeSorted === "rating") {
        sortedList = list.sort( (a, b) =>  b.vote_average - a.vote_average );
    } else if (typeSorted === "runtime") {
        sortedList = list.sort( (a, b) =>  b.runtime - a.runtime );
    }
    return sortedList;
}

export default sortedBy;