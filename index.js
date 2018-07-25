
let title;
let year;
let urlData;
let imbdId;



$(document).ready(() => { // Start of document.ready()

    $('#getDataById').click(()=>{
    imbdId = document.getElementById("imdbno").value;
    document.getElementById("imdbno").value = "";
     getData();
});

$('#getDataByTitle').click(()=>{
title = document.getElementById("title").value;
document.getElementById("title").value = "";

year = document.getElementById("year").value;
document.getElementById("year").value = "";

 getData();
});

}); // end of document.ready()




let getData = () => {

     let api = `https://www.omdbapi.com/?`;
    let apiKey = `&apikey=2947caaf`;


    if (title != '' && title != 'undefined' && title != null) {
        api = api.concat(`&t=${title}`);

    }

    if (year != '' && year != 'undefined' && year != null) {
        api = api.concat(`&y=${year}`);
    }


    if (imbdId != '' && imbdId != 'undefined' && imbdId != null) {
         api = api.concat(`&i=${imbdId}`);

    }

    api = api.concat(apiKey);

    $.ajax({
            type: 'GET',
            dataType: 'json',
            async: true,
            url: api,
            success: (response) => {
                api ="";
                imbdId= "";
                title = "";
                year = "";

                let responseStatus;
                let display;
                if(response.Response === 'True') {

                    let imageData;

                if (response.Poster != "N/A") {

                    imageData = response.Poster;
                }
                else {
                    imageData = "nophoto.png";

                }

                display = `
                        <tr><td colspan="2" style="text-align: center;"><img src="${imageData}" height="200px"></td></tr>
                        <tr><td>Title</td><td>${response.Title}</td></tr>
                        <tr><td>Year</td><td>${response.Year}</td></tr>
                        <tr><td>ImdbRating</td><td>${response.imdbRating}/10</td></tr>
                        <tr><td>ImdbID</td><td>${response.imdbID}</td></tr>
                        <tr><td>Released</td><td>${response.Released}</td></tr>
                        <tr><td>Runtime</td><td>${response.Runtime}</td></tr>
                        <tr><td>Genre</td><td>${response.Genre}</td></tr>
                        <tr><td>Director</td><td>${response.Director}</td></tr>
                        <tr><td>Actors</td><td>${response.Actors}</td></tr>
                        <tr><td>Actors</td><td>${response.Country}</td></tr>
                       `;


            } else if (response.Response == "False") {
                display = `<tr><td colspan="2" style="text-align: center;">Sorry No Result Found</td></tr>`;
            }

            $("#infoTable").html(display);


            }, error: (err) => {

        },
        timeout: 3000,

    beforeSend: () => {
            },

    complete: () => {
            }

    });// end ajax call

}
