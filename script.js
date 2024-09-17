// Sample restaurant data
const restaurants = [
  { 
    id: 1, 
    name: "The Flying Elephant", 
    menu: [
      { 
        id: 101, 
        name: "Roasted Corn And Coconut", 
        price: 725,
      },
      { 
        id: 102, 
        name: "Lobster And Pumpkin Bisque", 
        price: 850,
      }
    ]
  },
  { 
    id: 2, 
    name: "Annalakshmi Restaurant", 
    menu: [
      { 
        id: 201, 
        name: "Roti", 
        price: 80,
      },
      { 
        id: 202, 
        name: "Garlic Naan", 
        price: 900,
      }
    ]
  },
  { 
    id: 3, 
    name: "Basil With a Twist",  
    menu: [
      { 
        id: 301, 
        name: "Fillet Mignon", 
        price: 1200,
      },
      { 
        id: 302, 
        name: "Grilled Chicken", 
        price: 1500,
      }
    ]
  }
];
// Sample reviews data
const reviews = [];

// Populate restaurant list
const restaurantList = document.getElementById('restaurant-list');
restaurants.forEach(restaurant => {
  const restaurantDiv = document.createElement('div');
  restaurantDiv.classList.add('restaurant-item');
  restaurantDiv.innerHTML = `<strong>${restaurant.name}</strong><br>Menu: ${restaurant.menu.map(item => item.name).join(', ')}`;
  restaurantList.appendChild(restaurantDiv);
});

// Populate restaurant dropdowns
const restaurantSelect = document.getElementById('restaurantSelect');
const restaurantReviewSelect = document.getElementById('restaurantReview');
restaurants.forEach(restaurant => {
  const option = document.createElement('option');
  option.value = restaurant.id;
  option.textContent = restaurant.name;
  restaurantSelect.appendChild(option);

  const reviewOption = option.cloneNode(true);
  restaurantReviewSelect.appendChild(reviewOption);
});

// Handle restaurant selection and populate menu
restaurantSelect.addEventListener('change', () => {
  const selectedRestaurantId = restaurantSelect.value;
  const foodItemSelect = document.getElementById('foodItem');
  foodItemSelect.innerHTML = '';

  const selectedRestaurant = restaurants.find(r => r.id == selectedRestaurantId);
  selectedRestaurant.menu.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `${item.name} - $${item.price}`;
    foodItemSelect.appendChild(option);
  });
});

// Handle order submission
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const restaurantId = restaurantSelect.value;
  const foodItemId = document.getElementById('foodItem').value;
  const quantity = document.getElementById('quantity').value;

  const restaurant = restaurants.find(r => r.id == restaurantId);
  const foodItem = restaurant.menu.find(f => f.id == foodItemId);

  const totalPrice = foodItem.price * quantity;
  alert(`Order placed for ${quantity} x ${foodItem.name}. Total: $${totalPrice}`);
});

// Handle review submission
const reviewForm = document.getElementById('reviewForm');
reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const restaurantId = restaurantReviewSelect.value;
  const reviewText = document.getElementById('reviewText').value;

  const review = {
    restaurantId,
    text: reviewText,
  };
  reviews.push(review);

  alert('Review submitted!');
  displayReviews();
});

// Display reviews
const displayReviews = () => {
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';

  reviews.forEach(review => {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review-item');
    const restaurant = restaurants.find(r => r.id == review.restaurantId);
    reviewDiv.innerHTML = `<strong>${restaurant.name}</strong>: ${review.text}`;
    reviewList.appendChild(reviewDiv);
  });
};

  