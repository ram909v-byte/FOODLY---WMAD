const foods = [{
                name: "Paneer Tikka",
                price: 180,
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2BTCodNG5jyxgAFDgeTUVusVE8_4EaprrBQ&s",
                rating: 4.5,
                description: "Marinated cottage cheese cubes grilled to perfection with spices and herbs."
            },
            {
                name: "Chicken Biryani",
                price: 250,
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0w_ScFOzjAgCrSBAyT6Q1ZvJXd5nLisnh0w&s",
                rating: 4.8,
                description: "Fragrant basmati rice cooked with tender chicken and aromatic spices."
            },
            {
                name: "Masala Dosa",
                price: 120,
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9tXNH_xCEYOU9wjkNFLKfCHUf1mvc8QmR4g&s",
                rating: 4.3,
                description: "Crispy rice crepe filled with spiced potato filling, served with chutneys."
            },
            {
                name: "Butter Chicken",
                price: 300,
                img: "https://www.marionskitchen.com/wp-content/uploads/2024/02/20240212_MK_Easiest-Butter-Chicken-From-Scratch-2-1200x900.webp",
                rating: 4.7,
                description: "Tender chicken in a rich, creamy tomato and butter sauce."
            },
            {
                name: "Chicken 65",
                price: 300,
                img: "https://swatisani.net/kitchen/wp-content/uploads/2014/11/1200px-Chicken_65_Dish.jpg",
                rating: 4.4,
                description: "Spicy, deep-fried chicken chunks with a burst of South Indian flavors."
            },
            {
                name: "Noodles",
                price: 300,
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWflwB7e_iDZLws_OqLt2djomUC4wn77nXRA&s",
                rating: 4.2,
                description: "Stir-fried noodles with fresh vegetables and your choice of sauce."
            },
            {
                name: "Chicken Pizza",
                price: 300,
                img: "https://static.toiimg.com/thumb/53339084.cms?imgsize=85489&width=800&height=800",
                rating: 4.6,
                description: "Thin crust pizza topped with chicken, cheese, and fresh vegetables."
            },
            {
                name: "Mocktails",
                price: 300,
                img: "https://www.cocktailplans.com/wp-content/uploads/2025/02/blue-lagoon-mocktail-recipe-0001.jpg",
                rating: 4.1,
                description: "Refreshing non-alcoholic beverages with tropical fruit flavors."
            },
            {
                name: "Mango Dessert",
                price: 300,
                img: "https://www.sailusfood.com/wp-content/uploads/2013/05/mango-dessert-recipes.jpg",
                rating: 4.9,
                description: "Creamy mango mousse with fresh mango chunks and biscuit base."
            }
        ];

        let cart = [];
        let orderHistory = [];

        const foodList = document.getElementById("foodList");

        foods.forEach(food => {
            let div = document.createElement("div");
            div.className = "card";

            // Create star rating HTML
            let starsHtml = '';
            const fullStars = Math.floor(food.rating);
            const hasHalfStar = food.rating % 1 !== 0;

            for (let i = 0; i < fullStars; i++) {
                starsHtml += '<i class="fas fa-star"></i>';
            }

            if (hasHalfStar) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            }

            const emptyStars = 5 - Math.ceil(food.rating);
            for (let i = 0; i < emptyStars; i++) {
                starsHtml += '<i class="far fa-star"></i>';
            }

            div.innerHTML = `
                <div class="card-content">
                    <h3>${food.name}</h3>
                    <p class="price">₹${food.price}</p>
                    <div class="rating">
                        ${starsHtml}
                        <span>${food.rating}</span>
                    </div>
                    <div class="description">
                        ${food.description}
                    </div>
                    <button class="btn" onclick="addToCart('${food.name}', ${food.price})">Add to Cart</button>
                </div>
                <img src="${food.img}" alt="${food.name}">
            `;
            foodList.appendChild(div);
        });

        function addToCart(item, price) {
            const button = event.target;
            const originalText = button.innerHTML;

            // Show loading animation
            button.innerHTML = '<span class="loading"></span>';
            button.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                cart.push({
                    item,
                    price
                });
                document.getElementById("cartCount").innerText = cart.length;

                // Show success animation
                button.innerHTML = '✓ Added!';
                button.classList.add('success');

                // Reset button after animation
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.classList.remove('success');
                }, 1000);
            }, 600);
        }

        function loadRestaurant(name) {
            const card = event.currentTarget;
            card.style.transform = 'scale(0.95)';

            setTimeout(() => {
                card.style.transform = '';
                alert(`Showing more items from ${name}`);
            }, 300);
        }

        function showPage(pageId) {
            document.getElementById("homePage").style.display = "none";
            document.getElementById("cartPage").style.display = "none";
            document.getElementById("loginPage").style.display = "none";
            document.getElementById(pageId).style.display = "block";
            if (pageId === "cartPage") renderCart();
        }

        function renderCart() {
            const cartItems = document.getElementById("cartItems");
            let total = 0;
            cartItems.innerHTML = "";
            if (cart.length === 0) {
                cartItems.innerHTML = "<p>Your cart is currently empty. Start adding some delicious food!</p>";
                document.getElementById("totalAmount").innerText = "0";
                return;
            }
            cart.forEach((obj, index) => {
                let p = document.createElement("p");
                p.innerHTML = `
                    <strong>${obj.item}</strong> - ₹${obj.price}
                    <button class="remove-btn" onclick="removeFromCart(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItems.appendChild(p);
                total += obj.price;
            });
            document.getElementById("totalAmount").innerText = total;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            document.getElementById("cartCount").innerText = cart.length;
            renderCart();
        }

        function placeOrder() {
            if (cart.length === 0) {
                alert("Cart is empty!");
                return;
            }

            const button = event.target;
            const originalText = button.innerHTML;

            // Show loading animation
            button.innerHTML = '<span class="loading"></span> Processing...';
            button.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                // Generate order details
                const orderId = 'FL-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
                const orderDate = new Date().toLocaleString();
                const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

                // Store order in history
                orderHistory.push({
                    id: orderId,
                    date: orderDate,
                    items: [...cart],
                    total: totalAmount
                });

                // Prepare email content
                prepareEmailContent(orderId, orderDate, totalAmount);

                // Show email confirmation modal
                document.getElementById('emailModal').style.display = 'flex';

                // Clear cart
                cart = [];
                document.getElementById("cartCount").innerText = 0;
                renderCart();

                // Reset button
                button.innerHTML = originalText;
                button.disabled = false;
            }, 1500);
        }

        function prepareEmailContent(orderId, orderDate, totalAmount) {
            // Set order details in email preview
            document.getElementById('orderId').textContent = orderId;
            document.getElementById('orderDate').textContent = orderDate;
            document.getElementById('emailTotalAmount').textContent = totalAmount;

            // Get customer name from login or use default
            const username = document.getElementById('username').value || 'Customer';
            document.getElementById('customerName').textContent = username;

            // Populate order items in email
            const emailOrderItems = document.getElementById('emailOrderItems');
            emailOrderItems.innerHTML = '';

            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'order-item';
                itemDiv.innerHTML = `
                    <span>${item.item}</span>
                    <span>₹${item.price}</span>
                `;
                emailOrderItems.appendChild(itemDiv);
            });
        }

        function closeModal() {
            document.getElementById('emailModal').style.display = 'none';
            showPage('homePage');
        }

        function checkLogin() {
            let user = document.getElementById("username").value.trim();
            let pass = document.getElementById("password").value.trim();

            if (user === "" || pass === "") {
                alert("❌ Please fill all fields!");
                return false;
            }

            const button = document.querySelector('#loginPage .btn');
            const originalText = button.innerHTML;

            // Show loading animation
            button.innerHTML = '<span class="loading"></span> Logging in...';
            button.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                alert("✅ Login successful (demo)");

                // Reset button
                button.innerHTML = originalText;
                button.disabled = false;

                // Show home page
                showPage('homePage');
            }, 1200);

            return false;
        }

        // Initialize home page
        showPage("homePage");
