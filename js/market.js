import { fetchMarketplaceItems } from '../backend/index.js'; 

// Function to generate the HTML for a single item card
const createMarketCard = (item) => {
    // Set default values in case a field is missing in Firestore
    const name = item.name || 'Unknown Product';
    const price = item.price ? `₹${item.price}` : 'Price not listed';
    const sellerName = item.name || 'N/A';
    const sellerPhone = item.phone || 'N/A';
    const imageUrl = item.imgUrl || 'https://via.placeholder.com/900x600?text=No+Image'; // Use a placeholder image

    // Use backticks (template literals) for easy multi-line HTML
    return `
        <div class="card" data-id="${item.id}">
            <div class="tilt">
                <div class="img-market">
                    <img src="${imageUrl}" alt="${name}">
                </div>
            </div>
            <div class="info">
                <h2 class="title" id="product-name">${name}</h2>
                <div class="feats">
                    <span class="feat" id="sell-name">Name: ${sellerName}</span>
                    <span class="feat" id="sell-num">Phone: ${sellerPhone}</span>
                </div>
                <div class="bottom">
                    <div class="price">
                        <span class="new" id="product-price">${price}</span>
                    </div>
                    <button class="btn">
                        <span>Buy Now</span>
                    </button>
                </div>
            </div>
        </div>
    `;
};


document.addEventListener('DOMContentLoaded', async () => {
    const marketContainer = document.querySelector('.market-container');
    
    // Clear any loading text/placeholders
    marketContainer.innerHTML = '<h2>Loading items...</h2>';
    
    try {
        const items = await fetchMarketplaceItems();
        
        // Clear loading text again before rendering data
        marketContainer.innerHTML = ''; 

        if (items.length === 0) {
            marketContainer.innerHTML = '<p>No items found in the marketplace.</p>';
            return;
        }

        // Generate and append the HTML for all items
        items.forEach(item => {
            const cardHTML = createMarketCard(item);
            marketContainer.innerHTML += cardHTML; // Append the HTML for each card
        });

    } catch (error) {
        marketContainer.innerHTML = '<h2>Error loading items. Please try again later.</h2>';
        // error is already logged in backend.js
    }
});