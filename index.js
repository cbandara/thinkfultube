const YOUTUBE_DATA_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyCd3_d7M_NMTGnnpwFdZSiYej1lsAJOQls',
    q: `${searchTerm}`
    
  }
  $.getJSON(YOUTUBE_DATA_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}"  target="_blank">
      <img src="${result.snippet.thumbnails.medium.url}">
      </a>
    </div>
  `;
  
}

function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);

}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);
