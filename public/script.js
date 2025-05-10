document.addEventListener('DOMContentLoaded', function() {
    // Toggle Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    
    // Toggle Search Form
const searchIcon = document.querySelector('.search-icon');
const searchForm = document.querySelector('.search-form');

// Create notification element
const createNotification = () => {
  const notification = document.createElement('div');
  notification.id = 'search-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: #ff4444;
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 10000;
    display: none;
    font-family: 'Poppins', sans-serif;
  `;
  document.body.appendChild(notification);
  return notification;
};

const notification = createNotification();

if (searchIcon) {
  searchIcon.addEventListener('click', function() {
    searchForm.classList.toggle('active');
    if (searchForm.classList.contains('active')) {
      document.querySelector('.search-form input').focus();
    }
  });
}

// Search functionality
const searchInput = document.querySelector('.search-form input');
const searchButton = document.querySelector('.search-form button');

// Remove previous highlights
function removeHighlights() {
  const highlightedElements = document.querySelectorAll('.search-highlight');
  highlightedElements.forEach(el => {
    const parent = el.parentNode;
    if (parent) {
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  });
  notification.style.display = 'none';
}

// Show notification (updated to English)
function showNotification(message, isError = true) {
  notification.textContent = message;
  notification.style.backgroundColor = isError ? '#ff4444' : '#4CAF50';
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Highlight matching text
function highlightMatches(text) {
  if (!text) {
    removeHighlights();
    return false;
  }

  removeHighlights();

  let matchCount = 0;
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  const textNodes = [];
  
  // First collect all text nodes
  while (node = walker.nextNode()) {
    if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
      textNodes.push(node);
    }
  }

  // Then process them
  textNodes.forEach(node => {
    const content = node.nodeValue;
    const regex = new RegExp(text, 'gi');
    
    if (regex.test(content)) {
      const span = document.createElement('span');
      span.innerHTML = content.replace(regex, match => 
        `<span class="search-highlight">${match}</span>`
      );
      node.parentNode.replaceChild(span, node);
      matchCount += content.match(regex).length;
    }
  });

  if (matchCount === 0) {
    showNotification(`No results found for "${text}"`, true);
    return false;
  } else {
    showNotification(`Found ${matchCount} matches for "${text}"`, false);
    const firstMatch = document.querySelector('.search-highlight');
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return true;
  }
}

// Perform search
function performSearch() {
  const searchTerm = searchInput.value.trim();
  
  if (searchTerm) {
    highlightMatches(searchTerm);
    searchForm.classList.remove('active');
  } else {
    removeHighlights();
    showNotification('Please enter a search term', true);
  }
}

// Event listeners
if (searchForm) {
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
  });
}

if (searchButton) {
  searchButton.addEventListener('click', function(e) {
    e.preventDefault();
    performSearch();
  });
}

// Close when clicking outside
document.addEventListener('click', function(e) {
  if (!searchForm.contains(e.target) && e.target !== searchIcon) {
    searchForm.classList.remove('active');
  }
});

// Clear on icon click
searchIcon.addEventListener('click', function() {
  if (!searchForm.classList.contains('active')) {
    removeHighlights();
  }
});

    
    // Current Date
    const dateElement = document.querySelector('.top-left span:first-child');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.innerHTML = `<i class="fas fa-calendar-alt"></i> ${today.toLocaleDateString('en-US', options)}`;
    }
    
    // Sticky Navigation
    const mainNav = document.querySelector('.main-nav');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    if (mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > headerHeight) {
                mainNav.classList.add('sticky');
                document.body.style.paddingTop = mainNav.offsetHeight + 'px';
            } else {
                mainNav.classList.remove('sticky');
                document.body.style.paddingTop = 0;
            }
        });
    }
    
    // Video Play Functionality
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, this would open a video player or redirect to a video page
            alert('Video player would open here in the actual implementation.');
        });
    });
    
    // Newsletter Subscription Form
    const subscribeForm = document.querySelector('.subscribe-form form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '') {
                alert('Please enter your email address.');
                return;
            }
            
            // In a real implementation, this would send the email to a server
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
    
    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Breaking News Ticker Control
    const marquee = document.querySelector('.breaking-content marquee');
    
    if (marquee) {
        // Pause on hover is already implemented with HTML attributes
        // This is just an example of how to control it with JS if needed
        const breakingNews = document.querySelector('.breaking-news');
        
        breakingNews.addEventListener('mouseenter', function() {
            marquee.stop();
        });
        
        breakingNews.addEventListener('mouseleave', function() {
            marquee.start();
        });
    }
});



