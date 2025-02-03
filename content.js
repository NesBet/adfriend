// List of motivational quotes, activity reminders, fun facts, and Bible verses
const positiveContent = [
  // Motivational Quotes
  { text: "Believe in yourself and all that you are." },
  { text: "Keep pushing, the results will come!" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts." },
  { text: "The only way to do great work is to love what you do." },
  { text: "You are never too old to set another goal or to dream a new dream." },
  { text: "Do not wait for opportunities, create them." },
  { text: "Your time is limited, don’t waste it living someone else’s life." },
  { text: "Hard work beats talent when talent doesn’t work hard." },
  { text: "Every accomplishment starts with the decision to try." },
  { text: "The future belongs to those who believe in the beauty of their dreams." },
  // Activity Reminders
  { text: "Have you done your burpees today?" },
  { text: "Take a deep breath and relax." },
  { text: "Remember to drink water and stay hydrated!" },
  { text: "Stretch your body to keep it flexible." },
  { text: "Don't forget to take a walk after lunch." },
  { text: "Stand up and move every hour to stay active." },
  { text: "Try a quick meditation session to clear your mind." },
  { text: "Do some light yoga to relieve stress." },
  { text: "Take a break from screens and rest your eyes." },
  { text: "Go outside and get some fresh air." },
  // Fun Facts
  { text: "Did you know that octopuses have three hearts? Now you know" },
  { text: "Bananas are berries, but strawberries aren't." },
  { text: "The Eiffel Tower can be 15 cm taller during the summer." },
  { text: "Cows have best friends and get stressed when they are apart." },
  { text: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible." },
  { text: "A day on Venus is longer than a year on Venus." },
  { text: "Octopuses have blue blood due to copper-based hemocyanin." },
  { text: "The shortest war in history was between Britain and Zanzibar on August 27, 1896. It lasted just 38 minutes." },
  { text: "Wombat poop is cube-shaped to prevent it from rolling away." },
  { text: "Pineapples were once so expensive that people rented them for parties." },
  // Bible Verses
  { text: "Philippians 4:13 - I can do all things through Christ who strengthens me." },
  { text: "Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
  { text: "Psalm 23:4 - Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
  { text: "Isaiah 41:10 - So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
  { text: "Matthew 6:34 - Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." },
  { text: "Proverbs 3:5-6 - Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { text: "Romans 8:28 - And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  { text: "Joshua 1:9 - Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
  { text: "Psalm 46:1 - God is our refuge and strength, an ever-present help in trouble." },
  { text: "John 3:16 - For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." }
];

// Function to replace ad elements with positive content
async function replaceAds() {
  // Check if the extension is enabled
  chrome.storage.sync.get(['isEnabled'], async ({ isEnabled }) => {
    if (!isEnabled) return; // If disabled, don't replace ads

    // Common ad selectors (you can add more)
    const adSelectors = [
      'iframe[id*="google_ads"]',
      'div[class*="ad-"]',
      'div[id*="ad-"]',
      'div[data-ad]',
      'ins.adsbygoogle'
    ];

    // Combine all selectors into one query
    const adElements = document.querySelectorAll(adSelectors.join(','));

    adElements.forEach((ad) => {
      // Create a new div to replace the ad
      const positiveDiv = document.createElement('div');
      positiveDiv.style.backgroundColor = '#f0f8ff';
      positiveDiv.style.padding = '10px';
      positiveDiv.style.border = '1px solid #ccc';
      positiveDiv.style.borderRadius = '5px';
      positiveDiv.style.textAlign = 'center';
      positiveDiv.style.fontFamily = 'Arial, sans-serif';
      positiveDiv.style.fontSize = '14px';
      positiveDiv.style.color = '#333';

      // Set a custom GIF as the background
      positiveDiv.style.backgroundImage = "url('https://media.giphy.com/media/26n6CMeAdLDYmk1Py/giphy.gif?cid=ecf05e475jluo83xf6ft7l2w5c9rseuwi0ccgmj9veebp7yg&ep=v1_gifs_search&rid=giphy.gif&ct=g')"; // Replace with your GIF URL
      positiveDiv.style.backgroundSize = 'cover'; // Ensures the GIF covers the entire div
      positiveDiv.style.backgroundPosition = 'center'; // Centers the GIF
      positiveDiv.style.backgroundRepeat = 'no-repeat'; // Prevents the GIF from repeating

      // Randomly select a positive message or use the fetched fun fact
      const randomContent = positiveContent[Math.floor(Math.random() * positiveContent.length)];
      const messageText = randomContent.text;

      // Add the text
      const text = document.createElement('p');
      text.textContent = messageText;
      text.style.position = 'relative'; // Ensures text stays above the background
      text.style.zIndex = '1'; // Ensures text is visible over the background
      text.style.color = 'red'; // Change text color to red
      text.style.fontSize = '16px'; // Increase font size slightly

      // Add a footer with 'Adfriend'
      const footer = document.createElement('div');
      footer.style.marginTop = '10px';
      footer.style.fontSize = '14px'; // Increase footer font size slightly
      footer.style.color = 'red'; // Change footer color to red
      footer.textContent = 'Adfriend';

      // Append the text and footer to the div
      positiveDiv.appendChild(text);
      positiveDiv.appendChild(footer);

      // Replace the ad with the positive content
      ad.replaceWith(positiveDiv);
    });
  });
}

// Run the function when the page loads
replaceAds();

// Optionally, observe DOM changes to handle dynamically loaded ads
const observer = new MutationObserver(replaceAds);
observer.observe(document.body, { childList: true, subtree: true });
