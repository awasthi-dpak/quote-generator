document.addEventListener('DOMContentLoaded', function() {
   
    const quotes = [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs",
            category: "inspiration"
        },
       
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt",
            category: "motivation"
        },
        {
            text: "The important thing is to never stop questioning.",
            author: "Albert Einstein",
            category: "science"
        },

        
        {
            text: "Do not watch the clock. Do what it does. Keep going.",
            author: "Sam Levenson",
            category: "motivation"
        },
        {
            text: "The only limit to our realization of tomorrow is our doubts of today.",
            author: "Franklin D. Roosevelt",
            category: "inspiration"
        },
        {
            text: "Science is not only a discipline of reason but also one of romance and passion.",
            author: "Stephen Hawking",
            category: "science"
        }
        ];    // Quote database

    
   // DOM elements
   const quoteText = document.getElementById('quote-text');
   const quoteAuthor = document.getElementById('quote-author');
   const generateBtn = document.getElementById('generate-btn');
   const prevBtn = document.getElementById('prev-btn');
   const nextBtn = document.getElementById('next-btn');
   const categorySelect = document.getElementById('category');
   const themeBtn = document.getElementById('theme-btn');
   const body = document.body;
   
   // Zoom controls
   const zoomInBtn = document.getElementById('zoom-in-btn');
   const zoomOutBtn = document.getElementById('zoom-out-btn');
   const zoomResetBtn = document.getElementById('zoom-reset-btn');

   // State variables
   let currentQuoteIndex = -1;
   let filteredQuotes = [];
   let quoteHistory = [];
   let isDarkMode = false;
   let currentZoomLevel = 1;
   const ZOOM_INCREMENT = 0.1;
   const MAX_ZOOM = 1.5;
   const MIN_ZOOM = 0.8;

  // Theme toggle function
  function toggleTheme() {
      isDarkMode = !isDarkMode;
      if (isDarkMode) {
          body.setAttribute('data-theme', 'dark');
          themeBtn.textContent = '☀️ Light Mode';
          localStorage.setItem('theme', 'dark');
      } else {
          body.removeAttribute('data-theme');
          themeBtn.textContent = '🌙 Dark Mode';
          localStorage.setItem('theme', 'light');
      }
  }

  // Check for saved theme preference
  function checkTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
          isDarkMode = true;
          body.setAttribute('data-theme', 'dark');
          themeBtn.textContent = '☀️ Light Mode';
      }
  }

  // Filter quotes based on category
  function filterQuotes() {
      const selectedCategory = categorySelect.value;
      filteredQuotes = selectedCategory === 'all' 
          ? [...quotes] 
          : quotes.filter(quote => quote.category === selectedCategory);
      
      // Reset history when category changes
      quoteHistory = [];
      currentQuoteIndex = -1;
  }

  // Display quote
  function displayQuote(index) {
      if (filteredQuotes.length === 0) {
          quoteText.textContent = "No quotes available for this category.";
          quoteAuthor.textContent = "";
          return;
      }

      const quote = filteredQuotes[index];
      quoteText.textContent = `"${quote.text}"`;
      quoteAuthor.textContent = `— ${quote.author}`;
      
      // Update navigation buttons state
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= filteredQuotes.length - 1;
  }

  // Generate random quote
  function generateRandomQuote() {
      if (filteredQuotes.length === 0) return;
      
      let randomIndex;
      do {
          randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      } while (randomIndex === currentQuoteIndex && filteredQuotes.length > 1);
      
      currentQuoteIndex = randomIndex;
      quoteHistory.push(currentQuoteIndex);
      displayQuote(currentQuoteIndex);
  }

  // Navigate to previous quote
  function goToPreviousQuote() {
      if (currentQuoteIndex > 0) {
          currentQuoteIndex--;
          displayQuote(currentQuoteIndex);
      }
  }

  // Navigate to next quote
  function goToNextQuote() {
      if (currentQuoteIndex < filteredQuotes.length - 1) {
          currentQuoteIndex++;
          displayQuote(currentQuoteIndex);
      }
  }

  

  function updateZoom() {
    quoteText.style.fontSize = `${1.5 * currentZoomLevel}rem`;
    zoomOutBtn.disabled = currentZoomLevel <= MIN_ZOOM;
    zoomInBtn.disabled = currentZoomLevel >= MAX_ZOOM;
}

function zoomIn() {
    if (currentZoomLevel < MAX_ZOOM) {
        currentZoomLevel += ZOOM_INCREMENT;
        updateZoom();
    }
}

function zoomOut() {
    if (currentZoomLevel > MIN_ZOOM) {
        currentZoomLevel -= ZOOM_INCREMENT;
        updateZoom();
    }
}

function resetZoom() {
    currentZoomLevel = 1;
    updateZoom();
}

   // Event listeners
   generateBtn.addEventListener('click', generateRandomQuote);
   prevBtn.addEventListener('click', goToPreviousQuote);
   nextBtn.addEventListener('click', goToNextQuote);
   categorySelect.addEventListener('change', filterQuotes);
   themeBtn.addEventListener('click', toggleTheme);
   zoomInBtn.addEventListener('click', zoomIn);
   zoomOutBtn.addEventListener('click', zoomOut);
   zoomResetBtn.addEventListener('click', resetZoom);

   // Initialize
   checkTheme();
   filterQuotes();
   generateRandomQuote();
});