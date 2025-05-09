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
        },
        ];    // Quote database

    
   // DOM elements
   const quoteText = document.getElementById('quote-text');
   const quoteAuthor = document.getElementById('quote-author');
   const generateBtn = document.getElementById('generate-btn');
   const prevBtn = document.getElementById('prev-btn');
   const nextBtn = document.getElementById('next-btn');
   const categorySelect = document.getElementById('category');

   // State variables
   let currentQuoteIndex = -1;
   let filteredQuotes = [];
   let quoteHistory = [];

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

   // Event listeners
   generateBtn.addEventListener('click', generateRandomQuote);
   prevBtn.addEventListener('click', goToPreviousQuote);
   nextBtn.addEventListener('click', goToNextQuote);
   categorySelect.addEventListener('change', filterQuotes);

   // Initialize
   filterQuotes();
   generateRandomQuote();
});