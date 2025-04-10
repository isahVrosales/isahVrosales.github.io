let current = {
    question: ""
  };
  
  const quoteText = document.querySelector('#js-quote-text');
  const tweetBtn = document.querySelector('#js-tweet-quote');
  const endpoint = "https://meowfacts.herokuapp.com/";
  
  async function getQuote() {
    try {
      quoteText.textContent = "Loading...";
  
      const response = await fetch(endpoint);
      if (!response.ok) throw Error(response.statusText);
  
      const json = await response.json();
      const fact = json.data[0];
  
      current.question = fact;
  
      displayQuote(fact);
      updateTweetLink();
      updateBackground();
    } catch (err) {
      console.error(err);
      quoteText.textContent = "Oops! Something went wrong.";
    }
  }
  
  function displayQuote(quote) {
    quoteText.textContent = quote;
  }
  
  function updateTweetLink() {
    const tweet = current.question;
    tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
  }
  
  function updateBackground() {
    const url = `https://source.unsplash.com/random/1920x1080/?cat,space&sig=${Math.floor(Math.random() * 1000)}`;
    document.body.style.backgroundImage = `url('${url}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }
  
  document.querySelector('#js-new-quote').addEventListener('click', getQuote);
  
  // Load first fact on page load
  getQuote();
  