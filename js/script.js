// this is the new release endpoint
// const endpointURL = "https://api.spotify.com/v1/browse/new-releases";
//this is a serach endpoint
// "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=yourkey"
//M5djkKGzUnzsSnHOtH2rUSjHuiCGJPsc

const endpointURL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?";

const searchendpoint = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

const apiKey = "api-key=M5djkKGzUnzsSnHOtH2rUSjHuiCGJPsc";
const result = document.getElementById("result");

const url = "https:api.nytimes.com/svc/archive/v1/2022/1.json?api-key=awAKsGsQhUQ19GDU4C0jl6kLKLTk46WY";

let showNews = (articles) => {
    articles.forEach((item, index) => {
       // console.log(item);
     let imagedata = item.media[0]["media-metadata"][2].url;
    
        result.innerHTML += `
        <div id="news-wrapper">
            <a href="${item.url}"><img id="news-hero" src="${imagedata}" alt="news image"></a>
            <div id="text-wrapper">
                <h4>${item.title}</h4>
                <p>${item.abstract}</p>
                <h6>${item.byline}</h6> 
  
            </div>
    
        </div>
        `
    });
} 

$.ajax({
    type: 'GET',
    url: endpointURL + apiKey,
    
    success: (data) => {
        console.log(data);
        showNews(data.results);
    },
    error: (error) => {
        console.log(error);
    } 
});


//search section 
const searchTerms = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");



searchBtn.onclick = () => {
    searchString = searchTerms.value;
    console.log(searchString);

    $.ajax({
        type: 'GET',
        url: searchendpoint + "q=" + searchString + "&" + apiKey,
        
        success: (data) => {
            console.log(data);
            result.innerHTML ="";
            searchedNews(data.response.docs);
        },
        error: (error) => {
            console.log(error);
        } 
    });

}

let searchedNews = (articles) => {
    
    articles.forEach((item, index) => {
       // console.log(item);
     let imagedata = "https://www.nytimes.com/" + item.multimedia[0].url;
  
      
     console.log(imagedata);

        result.innerHTML += `
        <div id="news-wrapper">
        <a href="${imagedata}"><img id="news-hero" src="${imagedata}" alt="news image"></a>
            <div id="text-wrapper">
                <h4>${item.abstract}</h4>
                <h6 class="chevron" id="${index}">Read More <i class="bi bi-chevron-down"></i></h6>
            </div>
            <div id="article-detail">
                <p>${item.lead_paragraph}...</p>
            </div>

        </div>
        `
    });
 
 

} 


