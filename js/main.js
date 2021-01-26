$(document).ready(()=>{
    $('#searchForm').on('submit',(e)=> {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('https://api.themoviedb.org/3/search/multi?api_key=c51be791bc98adad9db779243cc396a3&language=en-US&page=1&include_adult=false')
    .then((response) => {
        console.log(response);
    })
    .catch((err) =>{
        console.log(err);
    })
}

