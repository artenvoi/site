// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
    
// Add this function inside your DOMContentLoaded listener:

function highlightActivePage() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname.split('/').pop(); // Gets 'index.html', 'about.html', etc.

    navLinks.forEach(link => {
        // Handle the case where the link is the 'Get a Quote' button or another non-page link
        if (link.classList.contains('btn')) {
            return;
        }
        
        const linkPath = link.getAttribute('href').split('/').pop();
        
        // Logic to highlight the link
        if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
            link.classList.add('active');
        } else {
            // Important: remove the class from non-active links just in case
            link.classList.remove('active');
        }
    });
}

// Call the function on page load
highlightActivePage(); 
// The rest of your script.js code follows...

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navUl.classList.remove('show');
            }
        });
    });
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Store Category Filter
    const categoryButtons = document.querySelectorAll('.category-tabs button');
    const productCards = document.querySelectorAll('.product-card');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const categoryValue = this.getAttribute('data-category');
                
                productCards.forEach(card => {
                    if (categoryValue === 'all' || card.getAttribute('data-category') === categoryValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Shopping Cart Functionality
    const cart = [];
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const paystackCheckoutBtn = document.getElementById('paystack-checkout');
    
    // Sample product data (in a real app, this would come from a database)
    const products = {
        'logo-templates': {
            name: 'Premium Logo Templates Pack',
            price: 49.99,
            image: 'images/store/logo-templates.jpg'
        },
        'logo-course': {
            name: 'Logo Design Masterclass',
            price: 99.99,
            image: 'images/store/logo-course.jpg'
        },
        'brand-guide': {
            name: 'Brand Identity Guide Template',
            price: 29.99,
            image: 'images/store/brand-guide.jpg'
        },
        'flyer-templates': {
            name: 'Flyer Design Templates',
            price: 39.99,
            image: 'images/store/flyer-templates.jpg'
        },
        'package-course': {
            name: 'Package Design Workshop',
            price: 79.99,
            image: 'images/store/package-course.jpg'
        },
        'font-bundle': {
            name: 'Premium Font Bundle',
            price: 59.99,
            image: 'images/store/font-bundle.jpg'
        }
    };
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const product = products[productId];
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            updateCart();
            openCart();
        });
    });
    
    // Update cart UI
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <p>Qty: ${item.quantity}</p>
                    <p class="remove-item" data-id="${item.id}">Remove</p>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const itemIndex = cart.findIndex(item => item.id === productId);
                
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                    updateCart();
                }
            });
        });
    }
    
    // Open cart
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close cart
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Close cart when clicking overlay or close button
    cartOverlay.addEventListener('click', closeCart);
    closeCartBtn.addEventListener('click', closeCart);
    
    // Paystack Checkout
    if (paystackCheckoutBtn) {
        paystackCheckoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // Calculate total amount in kobo (Paystack uses amounts in kobo)
            const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity * 100), 0);
            
            // In a real application, you would generate a unique reference
            const reference = 'DERKI_' + Math.floor(Math.random() * 1000000000 + 1);
            
            // Create Paystack handler
            const handler = PaystackPop.setup({
                key: 'pk_test_your_paystack_public_key', // Replace with your Paystack public key
                email: 'customer@example.com', // Customer's email (in a real app, collect this from user)
                amount: totalAmount,
                ref: reference,
                callback: function(response) {
                    // Handle successful payment
                    alert('Payment complete! Reference: ' + response.reference);
                    // In a real app, you would process the order here
                    cart.length = 0;
                    updateCart();
                    closeCart();
                },
                onClose: function() {
                    // Handle when user closes payment modal
                    alert('Payment window closed.');
                }
            });
            
            handler.openIframe();
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0) {
        // Show first testimonial
        testimonials[currentTestimonial].classList.add('active');
        
        // Next testimonial
        nextBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        });
        
        // Previous testimonial
        prevBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling (would be connected to backend in real app)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.id === 'newsletter-form') {
                alert('Thank you for subscribing to our newsletter!');
            } else if (this.classList.contains('contact-form')) {
                alert('Thank you for your message! We will get back to you soon.');
            }
            
            this.reset();
        });
    });
});