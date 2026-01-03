// Product Data
var products = [
    { id: 1, name: "Neon City Street", price: 89.99, originalPrice: 109.99, image: "🏪", pieces: 1250, category: "City", badge: "HOT", description: "A vibrant neon-lit city street scene with LED lighting effects. Includes 3 minifigures and detailed storefronts.", rating: 4.8, reviews: 234 },
    { id: 2, name: "Gundam RX-78", price: 159.99, originalPrice: null, image: "🤖", pieces: 2100, category: "Mecha", badge: "NEW", description: "The legendary Gundam RX-78 in stunning detail. Features articulated joints and display stand.", rating: 4.9, reviews: 456 },
    { id: 3, name: "Space Station Alpha", price: 129.99, originalPrice: 149.99, image: "🛸", pieces: 1800, category: "Space", badge: "SALE", description: "Modular space station with rotating sections, solar panels, and 5 astronaut minifigures.", rating: 4.7, reviews: 189 },
    { id: 4, name: "Pixel Art Mario", price: 49.99, originalPrice: null, image: "🎮", pieces: 680, category: "Characters", badge: null, description: "Classic 8-bit Mario in 3D brick form. Perfect for retro gaming fans.", rating: 4.6, reviews: 567 },
    { id: 5, name: "Sakura Temple", price: 199.99, originalPrice: null, image: "🏯", pieces: 2800, category: "City", badge: "EXCLUSIVE", description: "Traditional Japanese temple with cherry blossom trees and garden landscape.", rating: 5.0, reviews: 123 },
    { id: 6, name: "Transformer Beast", price: 179.99, originalPrice: 219.99, image: "🦁", pieces: 2400, category: "Mecha", badge: "SALE", description: "Transforming mecha that converts from robot to beast mode. Premium collector edition.", rating: 4.8, reviews: 345 },
    { id: 7, name: "Lunar Rover X", price: 79.99, originalPrice: null, image: "🚗", pieces: 890, category: "Space", badge: null, description: "Detailed lunar exploration vehicle with movable wheels and sample collection tools.", rating: 4.5, reviews: 178 },
    { id: 8, name: "Cyber Samurai", price: 139.99, originalPrice: 159.99, image: "⚔️", pieces: 1650, category: "Characters", badge: "HOT", description: "Futuristic samurai warrior with LED katana and detailed armor plating.", rating: 4.9, reviews: 289 },
    { id: 9, name: "Downtown Diner", price: 94.99, originalPrice: null, image: "🍔", pieces: 1100, category: "City", badge: null, description: "Classic American diner with detailed interior, jukebox, and 4 minifigures.", rating: 4.7, reviews: 412 },
    { id: 10, name: "Eva Unit-01", price: 249.99, originalPrice: null, image: "👾", pieces: 3200, category: "Mecha", badge: "EXCLUSIVE", description: "Evangelion Unit-01 in massive scale. Includes entry plug and display base.", rating: 5.0, reviews: 89 },
    { id: 11, name: "Mars Colony", price: 189.99, originalPrice: 229.99, image: "🔴", pieces: 2600, category: "Space", badge: "SALE", description: "Complete Mars colony with biodome, rovers, and research facility.", rating: 4.8, reviews: 156 },
    { id: 12, name: "Pikachu Giant", price: 69.99, originalPrice: null, image: "⚡", pieces: 850, category: "Characters", badge: "NEW", description: "Oversized Pikachu with dynamic lightning bolt effects.", rating: 4.9, reviews: 678 },
    { id: 99, name: "Cyber Dragon Mecha Set", price: 299.99, originalPrice: 399.99, image: "🐉", pieces: 3500, category: "Mecha", badge: "LIMITED", description: "3,500+ pieces of pure engineering marvel. Features LED lighting, articulated joints, and exclusive collector's packaging. Limited to 1000 pieces worldwide.", rating: 5.0, reviews: 56 }
];

// ==================== USER AUTHENTICATION ====================
var currentUser = null;
try {
    currentUser = JSON.parse(localStorage.getItem('blockverse_user'));
} catch(e) {
    currentUser = null;
}

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem('blockverse_users')) || [];
    } catch(e) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem('blockverse_users', JSON.stringify(users));
}

function registerUser(userData) {
    var users = getUsers();
    
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === userData.email) {
            return { success: false, message: 'Email already registered' };
        }
        if (users[i].username === userData.username) {
            return { success: false, message: 'Username already taken' };
        }
    }
    
    var newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: new Date().toISOString(),
        wishlist: [],
        orders: []
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Registration successful!' };
}

function loginUser(email, password) {
    var users = getUsers();
    var user = null;
    
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            user = users[i];
            break;
        }
    }
    
    if (user) {
        currentUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        localStorage.setItem('blockverse_user', JSON.stringify(currentUser));
        return { success: true, user: currentUser };
    }
    
    return { success: false, message: 'Invalid email or password' };
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('blockverse_user');
    updateAuthUI();
    showToast('Logged out successfully!');
    window.location.href = 'index.html';
}

function isLoggedIn() {
    return currentUser !== null;
}

function getCurrentUser() {
    return currentUser;
}

function updateAuthUI() {
    var authButtons = document.getElementById('auth-buttons');
    var userMenu = document.getElementById('user-menu');
    var mobileAuthButtons = document.getElementById('mobile-auth-buttons');
    var mobileUserMenu = document.getElementById('mobile-user-menu');
    
    if (isLoggedIn()) {
        if (authButtons) authButtons.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            var userName = document.getElementById('user-name');
            if (userName) userName.textContent = currentUser.firstName || currentUser.username;
        }
        if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');
        if (mobileUserMenu) {
            mobileUserMenu.classList.remove('hidden');
            var mobileUserName = document.getElementById('mobile-user-name');
            if (mobileUserName) mobileUserName.textContent = currentUser.firstName || currentUser.username;
        }
    } else {
        if (authButtons) authButtons.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
        if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
        if (mobileUserMenu) mobileUserMenu.classList.add('hidden');
    }
}

// ==================== CART MANAGEMENT ====================
var cart = [];
try {
    cart = JSON.parse(localStorage.getItem('blockverse_cart')) || [];
} catch(e) {
    cart = [];
}

function saveCart() {
    localStorage.setItem('blockverse_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    var cartCounts = document.querySelectorAll('#cart-count');
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    for (var j = 0; j < cartCounts.length; j++) {
        cartCounts[j].textContent = totalItems;
    }
}

function addToCart(product) {
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            existing = cart[i];
            break;
        }
    }
    
    if (existing) {
        existing.quantity++;
    } else {
        var newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            pieces: product.pieces,
            category: product.category,
            quantity: 1
        };
        cart.push(newItem);
    }
    saveCart();
    showToast(product.name + ' added to cart!');
    
    var cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.classList.add('cart-bounce');
        setTimeout(function() { 
            cartCount.classList.remove('cart-bounce'); 
        }, 500);
    }
}

function addToCartById(productId) {
    var id = parseInt(productId);
    var product = getProductById(id);
    if (product) {
        addToCart(product);
    }
}

function removeFromCart(productId) {
    var id = parseInt(productId);
    var newCart = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    saveCart();
}

function updateQuantity(productId, delta) {
    var id = parseInt(productId);
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += delta;
            if (cart[i].quantity <= 0) {
                removeFromCart(id);
            } else {
                saveCart();
            }
            break;
        }
    }
}

function getCartTotal() {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    return total;
}

function clearCart() {
    cart = [];
    saveCart();
}

// ==================== PRODUCT FUNCTIONS ====================
function getProductById(id) {
    var productId = parseInt(id);
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            return products[i];
        }
    }
    return null;
}

// Product Card Template
function createProductCard(product) {
    var badgeColors = {
        'HOT': 'from-orange-500 to-red-500',
        'NEW': 'from-green-500 to-emerald-500',
        'SALE': 'from-pink-500 to-rose-500',
        'EXCLUSIVE': 'from-purple-500 to-violet-500',
        'LIMITED': 'from-yellow-500 to-amber-500'
    };
    
    var badgeIcons = {
        'HOT': '🔥',
        'NEW': '✨',
        'SALE': '💰',
        'EXCLUSIVE': '👑',
        'LIMITED': '⚡'
    };
    
    var badgeHtml = '';
    if (product.badge) {
        badgeHtml = '<div class="absolute top-4 left-4 z-20">' +
            '<div class="relative">' +
                '<div class="absolute inset-0 bg-gradient-to-r ' + badgeColors[product.badge] + ' rounded-full blur-md opacity-70"></div>' +
                '<span class="relative flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ' + badgeColors[product.badge] + ' rounded-full text-xs font-bold shadow-xl">' +
                    '<span>' + badgeIcons[product.badge] + '</span>' +
                    '<span>' + product.badge + '</span>' +
                '</span>' +
            '</div>' +
        '</div>';
    }
    
    var originalPriceHtml = '';
    var discountHtml = '';
    if (product.originalPrice) {
        var discount = Math.round((1 - product.price / product.originalPrice) * 100);
        originalPriceHtml = '<span class="text-sm text-gray-500 line-through">$' + product.originalPrice + '</span>';
        discountHtml = '<span class="ml-2 text-xs font-bold text-green-400">-' + discount + '%</span>';
    }
    
    // Star rating display
    var rating = product.rating || 4.5;
    var fullStars = Math.floor(rating);
    var starsHtml = '';
    for (var i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<span class="text-yellow-400">★</span>';
        } else {
            starsHtml += '<span class="text-gray-600">★</span>';
        }
    }
    
    var detailUrl = 'product-detail.html?id=' + product.id;
    
    var html = '<div class="product-card group relative">' +
        // Main card container
        '<div class="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-[2rem] border border-white/10 overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.4)] hover:-translate-y-3">' +
            
            // Animated gradient border on hover
            '<div class="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style="background: linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3), rgba(168,85,247,0.3)); background-size: 200% 200%; animation: gradient-shift 3s ease infinite;"></div>' +
            
            // Inner content wrapper
            '<div class="relative">' +
                // Image Section
                '<div class="relative">' +
                    badgeHtml +
                    
                    // Wishlist button
                    '<button onclick="event.preventDefault(); event.stopPropagation(); toggleWishlist(' + product.id + ', this)" class="wishlist-btn absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/80 hover:scale-110 transition-all duration-300 cursor-pointer border border-white/10">' +
                        (isInWishlist(product.id) ? '❤️' : '🤍') +
                    '</button>' +
                    
                    // Image container
                    '<a href="' + detailUrl + '" class="block relative cursor-pointer overflow-hidden">' +
                        '<div class="aspect-[4/3] bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-6 relative">' +
                            // Animated background circles
                            '<div class="absolute inset-0 overflow-hidden">' +
                                '<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>' +
                                '<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-100"></div>' +
                            '</div>' +
                            
                            // Grid pattern overlay
                            '<div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 20px 20px;"></div>' +
                            
                            // Shine sweep effect
                            '<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>' +
                            
                            // Product emoji
                            '<div class="relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">' +
                                '<span class="text-8xl md:text-9xl drop-shadow-2xl filter group-hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">' + product.image + '</span>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                '</div>' +
                
                // Content Section
                '<div class="relative p-5">' +
                    // Subtle top border glow
                    '<div class="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>' +
                    
                    // Category and Stats Row
                    '<div class="flex items-center justify-between mb-3 pt-1">' +
                        '<div class="flex items-center gap-2">' +
                            '<span class="text-xs font-semibold text-purple-400 px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg">' + product.category + '</span>' +
                            '<span class="text-xs text-gray-500 flex items-center gap-1">' +
                                '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>' +
                                product.pieces.toLocaleString() + ' pcs' +
                            '</span>' +
                        '</div>' +
                        '<div class="flex items-center gap-1 text-xs">' +
                            starsHtml +
                            '<span class="text-gray-500 ml-1">(' + (product.reviews || 0) + ')</span>' +
                        '</div>' +
                    '</div>' +
                    
                    // Product Name
                    '<a href="' + detailUrl + '" class="block cursor-pointer group/title">' +
                        '<h3 class="text-lg font-bold mb-3 leading-tight text-white group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-purple-400 group-hover/title:via-pink-400 group-hover/title:to-purple-400 transition-all duration-300">' + product.name + '</h3>' +
                    '</a>' +
                    
                    // Price and Action Row
                    '<div class="flex items-center justify-between pt-3 border-t border-white/5">' +
                        '<div class="flex flex-col">' +
                            '<div class="flex items-center gap-2">' +
                                '<span class="text-2xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">$' + product.price + '</span>' +
                                discountHtml +
                            '</div>' +
                            (product.originalPrice ? '<span class="text-xs text-gray-500 line-through">Was $' + product.originalPrice + '</span>' : '') +
                        '</div>' +
                        
                        // Add to cart button
                        '<button type="button" class="add-to-cart-btn relative w-14 h-14 cursor-pointer group/btn" data-id="' + product.id + '">' +
                            // Button glow
                            '<div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-50 group-hover/btn:opacity-80 transition-opacity"></div>' +
                            // Button body
                            '<div class="relative w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-purple-500/50 hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden">' +
                                // Shine effect
                                '<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"></div>' +
                                // Icon
                                '<svg class="w-6 h-6 relative z-10 group-hover/btn:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">' +
                                    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>' +
                                '</svg>' +
                            '</div>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    
    return html;
}

// ==================== UI HELPERS ====================
function showToast(message, type) {
    type = type || 'success';
    var existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    var icons = {
        success: '✓',
        error: '✗',
        info: 'ℹ',
        warning: '⚠'
    };
    
    var colors = {
        success: 'from-purple-600 to-pink-600',
        error: 'from-red-600 to-rose-600',
        info: 'from-blue-600 to-cyan-600',
        warning: 'from-yellow-600 to-orange-600'
    };
    
    var toast = document.createElement('div');
    toast.className = 'toast fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r ' + colors[type] + ' text-white px-6 py-4 rounded-2xl font-medium shadow-2xl z-50 flex items-center gap-3';
    toast.innerHTML = '<span class="text-2xl">' + icons[type] + '</span><span>' + message + '</span>';
    document.body.appendChild(toast);
    
    setTimeout(function() { 
        if (toast && toast.parentNode) {
            toast.remove(); 
        }
    }, 3000);
}

function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    }
}

function toggleUserDropdown() {
    var dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        if (dropdown.classList.contains('hidden')) {
            dropdown.classList.remove('hidden');
        } else {
            dropdown.classList.add('hidden');
        }
    }
}

function getUrlParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ==================== EVENT HANDLERS ====================
function handleAddToCartClick(e) {
    var btn = e.target;
    // Find the button if clicked on child element
    while (btn && !btn.classList.contains('add-to-cart-btn')) {
        btn = btn.parentElement;
    }
    
    if (btn && btn.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        e.stopPropagation();
        var productId = btn.getAttribute('data-id');
        if (productId) {
            addToCartById(productId);
        }
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count
    updateCartCount();
    
    // Update auth UI
    updateAuthUI();
    
    // Add page enter animation
    document.body.classList.add('page-enter');
    
    // Event delegation for add to cart buttons
    document.addEventListener('click', function(e) {
        var btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            var productId = btn.getAttribute('data-id');
            if (productId) {
                addToCartById(productId);
            }
        }
        
        // Close user dropdown when clicking outside
        var dropdown = document.getElementById('user-dropdown');
        var userMenuBtn = document.getElementById('user-menu-btn');
        if (dropdown && !dropdown.classList.contains('hidden')) {
            if (userMenuBtn && !userMenuBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        }
    });
});

// ==================== SIDE CART ====================
function openSideCart() {
    var overlay = document.getElementById('cart-overlay');
    var sidebar = document.getElementById('cart-sidebar');
    if (overlay && sidebar) {
        overlay.classList.add('active');
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderSideCart();
    }
}

function closeSideCart() {
    var overlay = document.getElementById('cart-overlay');
    var sidebar = document.getElementById('cart-sidebar');
    if (overlay && sidebar) {
        overlay.classList.remove('active');
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function renderSideCart() {
    var cartItems = document.getElementById('side-cart-items');
    var cartEmpty = document.getElementById('side-cart-empty');
    var cartFooter = document.getElementById('side-cart-footer');
    var cartTotal = document.getElementById('side-cart-total');
    var cartItemCount = document.getElementById('side-cart-count');
    
    if (!cartItems) return;
    
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    
    if (cartItemCount) {
        cartItemCount.textContent = totalItems + ' item' + (totalItems !== 1 ? 's' : '');
    }
    
    if (cart.length === 0) {
        cartItems.classList.add('hidden');
        if (cartEmpty) cartEmpty.classList.remove('hidden');
        if (cartFooter) cartFooter.classList.add('hidden');
    } else {
        cartItems.classList.remove('hidden');
        if (cartEmpty) cartEmpty.classList.add('hidden');
        if (cartFooter) cartFooter.classList.remove('hidden');
        
        var html = '';
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            html += '<div class="flex gap-4 py-4 border-b border-white/10">' +
                '<a href="product-detail.html?id=' + item.id + '" class="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">' +
                    '<span class="text-4xl">' + item.image + '</span>' +
                '</a>' +
                '<div class="flex-1 min-w-0">' +
                    '<h4 class="font-bold text-sm truncate">' + item.name + '</h4>' +
                    '<p class="text-purple-400 font-bold">$' + item.price + '</p>' +
                    '<div class="flex items-center gap-2 mt-2">' +
                        '<button onclick="updateSideCartQty(' + item.id + ', -1)" class="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 text-sm">-</button>' +
                        '<span class="text-sm font-medium w-6 text-center">' + item.quantity + '</span>' +
                        '<button onclick="updateSideCartQty(' + item.id + ', 1)" class="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 text-sm">+</button>' +
                        '<button onclick="removeFromSideCart(' + item.id + ')" class="ml-auto text-gray-500 hover:text-red-400 text-sm">🗑️</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }
        cartItems.innerHTML = html;
        
        if (cartTotal) {
            cartTotal.textContent = '$' + getCartTotal().toFixed(2);
        }
    }
}

function updateSideCartQty(productId, delta) {
    updateQuantity(productId, delta);
    renderSideCart();
}

function removeFromSideCart(productId) {
    removeFromCart(productId);
    renderSideCart();
}

// ==================== BLOG DATA ====================
var blogPosts = [
    {
        id: 1,
        title: "Top 10 Mecha Sets of 2024",
        excerpt: "Discover the most impressive mecha building sets that have taken the collector world by storm this year.",
        image: "🤖",
        category: "Reviews",
        author: "Alex Chen",
        date: "Dec 15, 2024",
        readTime: "5 min read",
        content: "The world of mecha building sets has never been more exciting. From intricate Gundam-inspired designs to original creations, 2024 has brought us some truly remarkable sets..."
    },
    {
        id: 2,
        title: "Building Tips: Advanced Techniques",
        excerpt: "Level up your building skills with these pro tips from master builders in the BLOCKVERSE community.",
        image: "🔧",
        category: "Tutorials",
        author: "Sarah Miller",
        date: "Dec 12, 2024",
        readTime: "8 min read",
        content: "Whether you're a beginner or an experienced builder, there's always room to improve your technique. In this guide, we'll cover advanced building methods..."
    },
    {
        id: 3,
        title: "Behind the Design: Cyber Dragon",
        excerpt: "An exclusive look at how our design team created the limited edition Cyber Dragon Mecha Set.",
        image: "🐉",
        category: "Behind the Scenes",
        author: "Mike Johnson",
        date: "Dec 10, 2024",
        readTime: "6 min read",
        content: "The Cyber Dragon took over 8 months to design and perfect. Our team wanted to create something truly special for collectors..."
    },
    {
        id: 4,
        title: "Collector's Corner: Display Ideas",
        excerpt: "Creative ways to showcase your building block collection and turn your space into a gallery.",
        image: "🖼️",
        category: "Lifestyle",
        author: "Emily Wang",
        date: "Dec 8, 2024",
        readTime: "4 min read",
        content: "Your completed builds deserve to be displayed proudly. Here are some innovative ideas for showcasing your collection..."
    },
    {
        id: 5,
        title: "New Release: Space Station Alpha",
        excerpt: "Everything you need to know about our latest space-themed set with over 1,800 pieces.",
        image: "🛸",
        category: "News",
        author: "Alex Chen",
        date: "Dec 5, 2024",
        readTime: "3 min read",
        content: "We're thrilled to announce the launch of Space Station Alpha, our most ambitious space set yet..."
    },
    {
        id: 6,
        title: "Community Spotlight: Amazing Builds",
        excerpt: "Featuring incredible custom creations from our talented BLOCKVERSE community members.",
        image: "⭐",
        category: "Community",
        author: "Emily Wang",
        date: "Dec 1, 2024",
        readTime: "5 min read",
        content: "Our community never ceases to amaze us with their creativity. This month, we're showcasing some of the most impressive builds..."
    }
];

function getBlogPostById(id) {
    var postId = parseInt(id);
    for (var i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].id === postId) {
            return blogPosts[i];
        }
    }
    return null;
}

// ==================== SEARCH FUNCTIONALITY ====================
var searchOpen = false;

function openSearch() {
    var overlay = document.getElementById('search-overlay');
    var modal = document.getElementById('search-modal');
    var input = document.getElementById('search-input-modal');
    if (overlay && modal) {
        overlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (input) {
            setTimeout(function() { input.focus(); }, 100);
        }
        searchOpen = true;
    }
}

function closeSearch() {
    var overlay = document.getElementById('search-overlay');
    var modal = document.getElementById('search-modal');
    if (overlay && modal) {
        overlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        searchOpen = false;
    }
}

function performSearch(query) {
    if (!query || query.trim() === '') return;
    window.location.href = 'products.html?search=' + encodeURIComponent(query.trim());
}

function renderSearchResults(query) {
    var container = document.getElementById('search-results');
    if (!container) return;
    
    if (!query || query.trim() === '') {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">Type to search products...</div>';
        return;
    }
    
    var results = [];
    var q = query.toLowerCase();
    for (var i = 0; i < products.length; i++) {
        var p = products[i];
        if (p.name.toLowerCase().indexOf(q) !== -1 || p.category.toLowerCase().indexOf(q) !== -1) {
            results.push(p);
        }
    }
    
    if (results.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-8">No products found for "' + query + '"</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < Math.min(results.length, 6); i++) {
        var p = results[i];
        html += '<a href="product-detail.html?id=' + p.id + '" class="flex items-center gap-4 p-3 hover:bg-white/10 rounded-xl transition">' +
            '<div class="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-3xl">' + p.image + '</div>' +
            '<div class="flex-1">' +
                '<h4 class="font-bold">' + p.name + '</h4>' +
                '<p class="text-sm text-gray-400">' + p.category + ' • ' + p.pieces + ' pcs</p>' +
            '</div>' +
            '<div class="text-lg font-bold text-purple-400">$' + p.price + '</div>' +
        '</a>';
    }
    
    if (results.length > 6) {
        html += '<div class="text-center pt-4 border-t border-white/10 mt-4">' +
            '<button onclick="performSearch(\'' + query + '\')" class="text-purple-400 hover:text-purple-300 font-medium">View all ' + results.length + ' results →</button>' +
        '</div>';
    }
    
    container.innerHTML = html;
}

// ==================== UNIFIED HEADER ====================
function getHeaderHTML(activePage) {
    activePage = activePage || '';
    
    var navItems = [
        { name: 'Home', href: 'index.html', id: 'home' },
        { name: 'Products', href: 'products.html', id: 'products' },
        { name: 'Blog', href: 'blog.html', id: 'blog' },
        { name: 'About', href: 'about.html', id: 'about' },
        { name: 'Contact', href: 'contact.html', id: 'contact' }
    ];
    
    var navLinksHTML = '';
    var mobileNavLinksHTML = '';
    
    for (var i = 0; i < navItems.length; i++) {
        var item = navItems[i];
        var isActive = activePage === item.id;
        navLinksHTML += '<a href="' + item.href + '" class="' + (isActive ? 'text-white' : 'text-gray-300 hover:text-white transition') + ' font-medium">' + item.name + '</a>';
        mobileNavLinksHTML += '<a href="' + item.href + '" class="' + (isActive ? 'text-white' : 'text-gray-300 hover:text-white transition') + ' font-medium">' + item.name + '</a>';
    }
    
    return '<nav class="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/10">' +
        '<div class="max-w-7xl mx-auto px-6 py-4">' +
            '<div class="flex items-center justify-between">' +
                '<a href="index.html" class="flex items-center gap-2">' +
                    '<div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">' +
                        '<span class="text-2xl">🧱</span>' +
                    '</div>' +
                    '<span class="text-2xl font-black font-space gradient-text">BLOCKVERSE</span>' +
                '</a>' +
                '<div class="hidden md:flex items-center gap-8">' + navLinksHTML + '</div>' +
                '<div class="flex items-center gap-4">' +
                    '<button onclick="openSearch()" class="p-2 hover:bg-white/10 rounded-xl transition">' +
                        '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>' +
                        '</svg>' +
                    '</button>' +
                    '<div id="auth-buttons" class="hidden md:flex items-center gap-2">' +
                        '<a href="login.html" class="px-4 py-2 text-gray-300 hover:text-white transition font-medium">Login</a>' +
                        '<a href="register.html" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:opacity-90 transition">Sign Up</a>' +
                    '</div>' +
                    '<div id="user-menu" class="hidden relative">' +
                        '<button id="user-menu-btn" onclick="toggleUserDropdown()" class="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">' +
                            '<div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm font-bold">👤</div>' +
                            '<span id="user-name" class="font-medium hidden sm:block">User</span>' +
                            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>' +
                        '</button>' +
                        '<div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">' +
                            '<a href="account.html" class="block px-4 py-3 hover:bg-white/10 transition flex items-center gap-2"><span>👤</span> My Account</a>' +
                            '<a href="orders.html" class="block px-4 py-3 hover:bg-white/10 transition flex items-center gap-2"><span>📦</span> My Orders</a>' +
                            '<a href="wishlist.html" class="block px-4 py-3 hover:bg-white/10 transition flex items-center gap-2"><span>❤️</span> Wishlist</a>' +
                            '<div class="border-t border-white/10"></div>' +
                            '<button onclick="logoutUser()" class="w-full text-left px-4 py-3 hover:bg-white/10 transition flex items-center gap-2 text-red-400"><span>🚪</span> Logout</button>' +
                        '</div>' +
                    '</div>' +
                    '<button onclick="openSideCart()" class="relative p-2 hover:bg-white/10 rounded-xl transition">' +
                        '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>' +
                        '</svg>' +
                        '<span id="cart-count" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs flex items-center justify-center font-bold">0</span>' +
                    '</button>' +
                    '<button onclick="toggleMobileMenu()" class="md:hidden p-2 hover:bg-white/10 rounded-xl transition">' +
                        '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>' +
                        '</svg>' +
                    '</button>' +
                '</div>' +
            '</div>' +
            '<div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 border-t border-white/10 pt-4">' +
                '<div class="flex flex-col gap-4">' + mobileNavLinksHTML +
                    '<div id="mobile-auth-buttons" class="flex flex-col gap-2 pt-4 border-t border-white/10">' +
                        '<a href="login.html" class="px-4 py-2 text-center text-gray-300 hover:text-white transition font-medium">Login</a>' +
                        '<a href="register.html" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-center">Sign Up</a>' +
                    '</div>' +
                    '<div id="mobile-user-menu" class="hidden flex flex-col gap-2 pt-4 border-t border-white/10">' +
                        '<div class="flex items-center gap-2 px-2 py-2">' +
                            '<div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm">👤</div>' +
                            '<span id="mobile-user-name" class="font-medium">User</span>' +
                        '</div>' +
                        '<a href="account.html" class="px-4 py-2 hover:bg-white/10 rounded-lg transition">My Account</a>' +
                        '<a href="orders.html" class="px-4 py-2 hover:bg-white/10 rounded-lg transition">My Orders</a>' +
                        '<a href="wishlist.html" class="px-4 py-2 hover:bg-white/10 rounded-lg transition">Wishlist</a>' +
                        '<button onclick="logoutUser()" class="px-4 py-2 text-left hover:bg-white/10 rounded-lg transition text-red-400">Logout</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</nav>';
}

function getSideCartHTML() {
    return '<div id="cart-overlay" class="cart-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onclick="closeSideCart()"></div>' +
    '<div id="cart-sidebar" class="cart-sidebar fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-white/10 z-50 flex flex-col">' +
        '<div class="p-6 border-b border-white/10 flex items-center justify-between">' +
            '<div>' +
                '<h2 class="text-xl font-black">Shopping Cart 🛒</h2>' +
                '<p id="side-cart-count" class="text-gray-400 text-sm">0 items</p>' +
            '</div>' +
            '<button onclick="closeSideCart()" class="p-2 hover:bg-white/10 rounded-xl transition">' +
                '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' +
            '</button>' +
        '</div>' +
        '<div id="side-cart-items" class="flex-1 overflow-y-auto p-6"></div>' +
        '<div id="side-cart-empty" class="hidden flex-1 flex flex-col items-center justify-center p-6">' +
            '<div class="text-6xl mb-4">🛒</div>' +
            '<h3 class="text-xl font-bold mb-2">Cart is Empty</h3>' +
            '<p class="text-gray-400 text-center mb-6">Looks like you haven\'t added any blocks yet!</p>' +
            '<button onclick="closeSideCart()" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:opacity-90 transition">Continue Shopping</button>' +
        '</div>' +
        '<div id="side-cart-footer" class="p-6 border-t border-white/10 bg-gray-900/80 backdrop-blur-sm">' +
            '<div class="flex items-center justify-between mb-4">' +
                '<span class="text-gray-400">Subtotal</span>' +
                '<span id="side-cart-total" class="text-2xl font-black">$0.00</span>' +
            '</div>' +
            '<p class="text-xs text-gray-500 mb-4">Shipping and taxes calculated at checkout</p>' +
            '<a href="checkout.html" class="block w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg text-center hover:opacity-90 transition btn-glow">Checkout 💳</a>' +
            '<button onclick="closeSideCart()" class="block w-full py-3 mt-2 text-center text-gray-400 hover:text-white transition">Continue Shopping</button>' +
        '</div>' +
    '</div>';
}

function getSearchModalHTML() {
    return '<div id="search-overlay" class="search-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onclick="closeSearch()"></div>' +
    '<div id="search-modal" class="search-modal fixed top-0 left-0 right-0 z-50 p-4 md:p-8">' +
        '<div class="max-w-2xl mx-auto bg-gray-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl" onclick="event.stopPropagation()">' +
            '<div class="p-4 border-b border-white/10">' +
                '<div class="flex items-center gap-4">' +
                    '<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>' +
                    '<input type="text" id="search-input-modal" placeholder="Search products..." class="flex-1 bg-transparent text-lg text-white placeholder-gray-500 outline-none" oninput="renderSearchResults(this.value)" onkeydown="if(event.key===\'Enter\')performSearch(this.value)">' +
                    '<button onclick="closeSearch()" class="p-2 hover:bg-white/10 rounded-lg transition">' +
                        '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' +
                    '</button>' +
                '</div>' +
            '</div>' +
            '<div id="search-results" class="p-4 max-h-96 overflow-y-auto">' +
                '<div class="text-center text-gray-500 py-8">Type to search products...</div>' +
            '</div>' +
            '<div class="p-4 border-t border-white/10 bg-white/5">' +
                '<div class="flex flex-wrap gap-2">' +
                    '<span class="text-gray-500 text-sm">Popular:</span>' +
                    '<button onclick="document.getElementById(\'search-input-modal\').value=\'Mecha\';renderSearchResults(\'Mecha\')" class="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition">Mecha</button>' +
                    '<button onclick="document.getElementById(\'search-input-modal\').value=\'City\';renderSearchResults(\'City\')" class="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition">City</button>' +
                    '<button onclick="document.getElementById(\'search-input-modal\').value=\'Space\';renderSearchResults(\'Space\')" class="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition">Space</button>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function getFooterHTML() {
    return '<footer class="relative overflow-hidden">' +
        '<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>' +
        '<div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>' +
        '<div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2"></div>' +
        '<div class="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>' +
        '<div class="absolute inset-0 overflow-hidden pointer-events-none">' +
            '<div class="absolute top-20 left-[10%] text-4xl opacity-5 float-animation" style="animation-duration: 15s;">🧱</div>' +
            '<div class="absolute top-40 right-[15%] text-3xl opacity-5 float-animation" style="animation-duration: 18s; animation-delay: -3s;">⚡</div>' +
            '<div class="absolute bottom-32 left-[20%] text-5xl opacity-5 float-animation" style="animation-duration: 20s; animation-delay: -7s;">🎮</div>' +
            '<div class="absolute bottom-20 right-[10%] text-4xl opacity-5 float-animation" style="animation-duration: 16s; animation-delay: -5s;">✨</div>' +
        '</div>' +
        '<div class="relative z-10 pt-20 pb-16">' +
            '<div class="max-w-7xl mx-auto px-6">' +
                '<div class="relative bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40 rounded-[2.5rem] p-10 md:p-14 border border-white/10 backdrop-blur-sm overflow-hidden mb-20">' +
                    '<div class="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 rounded-[2.5rem]"></div>' +
                    '<div class="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>' +
                    '<div class="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>' +
                    '<div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">' +
                        '<div class="text-center lg:text-left max-w-xl">' +
                            '<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">' +
                                '<span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span></span>' +
                                '<span class="text-sm font-medium">Join 50,000+ Builders</span>' +
                            '</div>' +
                            '<h3 class="text-3xl md:text-4xl font-black mb-3">Stay in the <span class="gradient-text">Loop</span> 🚀</h3>' +
                            '<p class="text-gray-400">Get exclusive drops, early access, building tips, and 15% off your first order!</p>' +
                        '</div>' +
                        '<div class="w-full lg:w-auto">' +
                            '<form class="flex flex-col sm:flex-row gap-3">' +
                                '<div class="relative">' +
                                    '<span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">📧</span>' +
                                    '<input type="email" placeholder="Enter your email" class="w-full sm:w-72 pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all duration-300">' +
                                '</div>' +
                                '<button type="submit" class="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95">' +
                                    '<span class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>' +
                                    '<span class="relative flex items-center gap-2">Subscribe<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></span>' +
                                '</button>' +
                            '</form>' +
                            '<p class="text-gray-500 text-xs mt-3 text-center sm:text-left">No spam ever. Unsubscribe anytime.</p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">' +
                    '<div class="col-span-2">' +
                        '<div class="flex items-center gap-3 mb-6">' +
                            '<div class="relative"><div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50"></div><div class="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl"><span class="text-3xl">🧱</span></div></div>' +
                            '<div><span class="text-2xl font-black font-space gradient-text block">BLOCKVERSE</span><span class="text-xs text-gray-500">Build. Create. Inspire.</span></div>' +
                        '</div>' +
                        '<p class="text-gray-400 text-sm mb-6 leading-relaxed">Premium designer building blocks for the modern collector. Join our global community of 50,000+ passionate builders.</p>' +
                        '<div class="flex gap-3">' +
                            '<a href="#" class="group relative w-11 h-11 rounded-xl overflow-hidden transition-transform hover:scale-110"><div class="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="absolute inset-0 bg-white/10 border border-white/20 group-hover:border-transparent transition-colors"></div><div class="absolute inset-0 flex items-center justify-center text-lg">📸</div></a>' +
                            '<a href="#" class="group relative w-11 h-11 rounded-xl overflow-hidden transition-transform hover:scale-110"><div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="absolute inset-0 bg-white/10 border border-white/20 group-hover:border-transparent transition-colors"></div><div class="absolute inset-0 flex items-center justify-center text-lg">🐦</div></a>' +
                            '<a href="#" class="group relative w-11 h-11 rounded-xl overflow-hidden transition-transform hover:scale-110"><div class="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="absolute inset-0 bg-white/10 border border-white/20 group-hover:border-transparent transition-colors"></div><div class="absolute inset-0 flex items-center justify-center text-lg">📺</div></a>' +
                            '<a href="#" class="group relative w-11 h-11 rounded-xl overflow-hidden transition-transform hover:scale-110"><div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="absolute inset-0 bg-white/10 border border-white/20 group-hover:border-transparent transition-colors"></div><div class="absolute inset-0 flex items-center justify-center text-lg">💬</div></a>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<h5 class="font-bold text-white mb-5 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>Shop</h5>' +
                        '<ul class="space-y-3">' +
                            '<li><a href="products.html" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">→</span> All Products</a></li>' +
                            '<li><a href="products.html?category=new" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">→</span> New Arrivals</a></li>' +
                            '<li><a href="products.html?category=bestseller" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">→</span> Best Sellers</a></li>' +
                            '<li><a href="products.html?category=sale" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">→</span> Sale <span class="text-xs px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded-md">HOT</span></a></li>' +
                        '</ul>' +
                    '</div>' +
                    '<div>' +
                        '<h5 class="font-bold text-white mb-5 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>Collections</h5>' +
                        '<ul class="space-y-3">' +
                            '<li><a href="products.html?category=city" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400">→</span> 🏙️ City</a></li>' +
                            '<li><a href="products.html?category=mecha" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400">→</span> 🤖 Mecha</a></li>' +
                            '<li><a href="products.html?category=space" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400">→</span> 🚀 Space</a></li>' +
                            '<li><a href="products.html?category=characters" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400">→</span> 🎭 Characters</a></li>' +
                        '</ul>' +
                    '</div>' +
                    '<div>' +
                        '<h5 class="font-bold text-white mb-5 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>Support</h5>' +
                        '<ul class="space-y-3">' +
                            '<li><a href="contact.html" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">→</span> Help Center</a></li>' +
                            '<li><a href="contact.html" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">→</span> Shipping Info</a></li>' +
                            '<li><a href="contact.html" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">→</span> Returns</a></li>' +
                            '<li><a href="contact.html" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">→</span> Contact Us</a></li>' +
                        '</ul>' +
                    '</div>' +
                    '<div>' +
                        '<h5 class="font-bold text-white mb-5 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>Company</h5>' +
                        '<ul class="space-y-3">' +
                            '<li><a href="about.html" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400">→</span> About Us</a></li>' +
                            '<li><a href="blog.html" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400">→</span> Blog</a></li>' +
                            '<li><a href="#" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400">→</span> Careers <span class="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-md">Hiring</span></a></li>' +
                            '<li><a href="#" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"><span class="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400">→</span> Press Kit</a></li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<div class="flex flex-col lg:flex-row items-center justify-between gap-8 py-8 border-t border-b border-white/10">' +
                    '<div class="flex flex-wrap justify-center gap-6">' +
                        '<div class="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10"><span class="text-2xl">🔒</span><div><div class="text-xs font-bold text-white">Secure Checkout</div><div class="text-xs text-gray-500">256-bit SSL</div></div></div>' +
                        '<div class="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10"><span class="text-2xl">🚚</span><div><div class="text-xs font-bold text-white">Free Shipping</div><div class="text-xs text-gray-500">Orders $75+</div></div></div>' +
                        '<div class="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10"><span class="text-2xl">↩️</span><div><div class="text-xs font-bold text-white">Easy Returns</div><div class="text-xs text-gray-500">30-day policy</div></div></div>' +
                        '<div class="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10"><span class="text-2xl">⭐</span><div><div class="text-xs font-bold text-white">4.9/5 Rating</div><div class="text-xs text-gray-500">10K+ Reviews</div></div></div>' +
                    '</div>' +
                    '<div class="flex flex-wrap justify-center gap-2">' +
                        '<div class="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2"><span class="text-lg">💳</span><span class="text-xs font-medium text-gray-400">Visa</span></div>' +
                        '<div class="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2"><span class="text-lg">💳</span><span class="text-xs font-medium text-gray-400">Mastercard</span></div>' +
                        '<div class="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2"><span class="text-lg">🅿️</span><span class="text-xs font-medium text-gray-400">PayPal</span></div>' +
                        '<div class="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2"><span class="text-lg">🍎</span><span class="text-xs font-medium text-gray-400">Apple Pay</span></div>' +
                    '</div>' +
                '</div>' +
                '<div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">' +
                    '<div class="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">' +
                        '<p>© 2024 BLOCKVERSE. All rights reserved.</p>' +
                        '<div class="hidden md:block w-1 h-1 bg-gray-700 rounded-full"></div>' +
                        '<p>Made with 💜 in Los Angeles, CA</p>' +
                    '</div>' +
                    '<div class="flex flex-wrap justify-center gap-6 text-sm">' +
                        '<a href="#" class="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>' +
                        '<a href="#" class="text-gray-500 hover:text-white transition-colors">Terms of Service</a>' +
                        '<a href="#" class="text-gray-500 hover:text-white transition-colors">Cookie Settings</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</footer>';
}

function initPage(activePage) {
    // Insert header
    var headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = getHeaderHTML(activePage);
    }
    
    // Insert side cart
    var sideCartContainer = document.getElementById('sidecart-container');
    if (sideCartContainer) {
        sideCartContainer.innerHTML = getSideCartHTML();
    }
    
    // Insert search modal
    var searchContainer = document.getElementById('search-container');
    if (searchContainer) {
        searchContainer.innerHTML = getSearchModalHTML();
    }
    
    // Insert footer
    var footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = getFooterHTML();
    }
    
    // Update cart and auth UI
    updateCartCount();
    updateAuthUI();
    
    // Keyboard shortcut for search
    document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (searchOpen) {
                closeSearch();
            } else {
                openSearch();
            }
        }
        if (e.key === 'Escape' && searchOpen) {
            closeSearch();
        }
    });
}

// ==================== WISHLIST MANAGEMENT ====================
function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem('blockverse_wishlist')) || [];
    } catch(e) {
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem('blockverse_wishlist', JSON.stringify(wishlist));
}

function addToWishlist(productId) {
    var wishlist = getWishlist();
    var id = parseInt(productId);
    
    if (wishlist.indexOf(id) === -1) {
        wishlist.push(id);
        saveWishlist(wishlist);
        showToast('Added to wishlist! ❤️', 'success');
        return true;
    } else {
        showToast('Already in wishlist', 'info');
        return false;
    }
}

function removeFromWishlist(productId) {
    var wishlist = getWishlist();
    var id = parseInt(productId);
    var index = wishlist.indexOf(id);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        saveWishlist(wishlist);
        showToast('Removed from wishlist', 'success');
    }
}

function isInWishlist(productId) {
    var wishlist = getWishlist();
    return wishlist.indexOf(parseInt(productId)) > -1;
}

function toggleWishlist(productId, buttonElement) {
    var id = parseInt(productId);
    if (isInWishlist(id)) {
        removeFromWishlist(id);
        if (buttonElement) {
            buttonElement.innerHTML = '🤍';
        }
    } else {
        addToWishlist(id);
        if (buttonElement) {
            buttonElement.innerHTML = '❤️';
        }
    }
}

function getWishlistProducts() {
    var wishlist = getWishlist();
    var wishlistProducts = [];
    for (var i = 0; i < wishlist.length; i++) {
        var product = getProductById(wishlist[i]);
        if (product) {
            wishlistProducts.push(product);
        }
    }
    return wishlistProducts;
}

// ==================== ORDER MANAGEMENT ====================
function getOrders() {
    try {
        return JSON.parse(localStorage.getItem('blockverse_orders')) || [];
    } catch(e) {
        return [];
    }
}

function saveOrders(orders) {
    localStorage.setItem('blockverse_orders', JSON.stringify(orders));
}

function createOrder(orderData) {
    var orders = getOrders();
    var orderNumber = 'BLK-' + Date.now().toString(36).toUpperCase();
    
    var newOrder = {
        id: orderNumber,
        date: new Date().toISOString(),
        status: 'processing',
        items: orderData.items || [],
        subtotal: orderData.subtotal || 0,
        shipping: orderData.shipping || 0,
        tax: orderData.tax || 0,
        total: orderData.total || 0,
        shippingAddress: orderData.shippingAddress || {},
        paymentMethod: orderData.paymentMethod || 'card'
    };
    
    orders.unshift(newOrder);
    saveOrders(orders);
    
    return newOrder;
}

function getOrderById(orderId) {
    var orders = getOrders();
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            return orders[i];
        }
    }
    return null;
}

// ==================== USER PROFILE MANAGEMENT ====================
function updateUserProfile(userData) {
    if (!isLoggedIn()) return { success: false, message: 'Not logged in' };
    
    var users = getUsers();
    var currentEmail = currentUser.email;
    
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === currentEmail) {
            users[i].firstName = userData.firstName || users[i].firstName;
            users[i].lastName = userData.lastName || users[i].lastName;
            users[i].phone = userData.phone || users[i].phone;
            users[i].address = userData.address || users[i].address;
            users[i].city = userData.city || users[i].city;
            users[i].state = userData.state || users[i].state;
            users[i].zip = userData.zip || users[i].zip;
            
            saveUsers(users);
            
            // Update current user in session
            currentUser.firstName = users[i].firstName;
            currentUser.lastName = users[i].lastName;
            localStorage.setItem('blockverse_user', JSON.stringify(currentUser));
            
            return { success: true, message: 'Profile updated successfully!' };
        }
    }
    
    return { success: false, message: 'User not found' };
}

function changePassword(currentPassword, newPassword) {
    if (!isLoggedIn()) return { success: false, message: 'Not logged in' };
    
    var users = getUsers();
    var currentEmail = currentUser.email;
    
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === currentEmail) {
            if (users[i].password !== currentPassword) {
                return { success: false, message: 'Current password is incorrect' };
            }
            
            users[i].password = newPassword;
            saveUsers(users);
            
            return { success: true, message: 'Password changed successfully!' };
        }
    }
    
    return { success: false, message: 'User not found' };
}

function getUserFullData() {
    if (!isLoggedIn()) return null;
    
    var users = getUsers();
    var currentEmail = currentUser.email;
    
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === currentEmail) {
            return users[i];
        }
    }
    
    return null;
}

// ==================== EXPOSE GLOBAL FUNCTIONS ====================
window.products = products;
window.cart = cart;
window.addToCart = addToCart;
window.addToCartById = addToCartById;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.getCartTotal = getCartTotal;
window.clearCart = clearCart;
window.saveCart = saveCart;
window.updateCartCount = updateCartCount;
window.getProductById = getProductById;
window.createProductCard = createProductCard;
window.showToast = showToast;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleUserDropdown = toggleUserDropdown;
window.getUrlParam = getUrlParam;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.registerUser = registerUser;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.getUsers = getUsers;
window.updateAuthUI = updateAuthUI;
window.openSideCart = openSideCart;
window.closeSideCart = closeSideCart;
window.renderSideCart = renderSideCart;
window.updateSideCartQty = updateSideCartQty;
window.removeFromSideCart = removeFromSideCart;
window.blogPosts = blogPosts;
window.getBlogPostById = getBlogPostById;
window.openSearch = openSearch;
window.closeSearch = closeSearch;
window.performSearch = performSearch;
window.renderSearchResults = renderSearchResults;
window.initPage = initPage;
window.getHeaderHTML = getHeaderHTML;
window.getSideCartHTML = getSideCartHTML;
window.getSearchModalHTML = getSearchModalHTML;
window.getFooterHTML = getFooterHTML;

// Wishlist functions
window.getWishlist = getWishlist;
window.saveWishlist = saveWishlist;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.isInWishlist = isInWishlist;
window.getWishlistProducts = getWishlistProducts;
window.toggleWishlist = toggleWishlist;

// Order functions
window.getOrders = getOrders;
window.saveOrders = saveOrders;
window.createOrder = createOrder;
window.getOrderById = getOrderById;

// Profile functions
window.updateUserProfile = updateUserProfile;
window.changePassword = changePassword;
window.getUserFullData = getUserFullData;

// ==================== CONFIRM MODAL ====================
function showConfirmModal(options) {
    var defaults = {
        icon: '⚠️',
        title: 'Confirm Action',
        message: 'Are you sure you want to proceed?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        onConfirm: function() {},
        onCancel: function() {}
    };
    
    var settings = {};
    for (var key in defaults) {
        settings[key] = options[key] !== undefined ? options[key] : defaults[key];
    }
    
    // Remove existing modal
    var existingModal = document.getElementById('confirm-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    var modalHtml = '<div id="confirm-modal-overlay" class="confirm-modal-overlay">' +
        '<div class="confirm-modal">' +
            '<div class="confirm-modal-icon">' + settings.icon + '</div>' +
            '<h3 class="confirm-modal-title">' + settings.title + '</h3>' +
            '<p class="confirm-modal-message">' + settings.message + '</p>' +
            '<div class="confirm-modal-buttons">' +
                '<button class="confirm-modal-btn cancel" id="confirm-modal-cancel">' + settings.cancelText + '</button>' +
                '<button class="confirm-modal-btn confirm" id="confirm-modal-confirm">' + settings.confirmText + '</button>' +
            '</div>' +
        '</div>' +
    '</div>';
    
    // Add to DOM
    var container = document.createElement('div');
    container.innerHTML = modalHtml;
    document.body.appendChild(container.firstChild);
    
    var overlay = document.getElementById('confirm-modal-overlay');
    var cancelBtn = document.getElementById('confirm-modal-cancel');
    var confirmBtn = document.getElementById('confirm-modal-confirm');
    
    // Show modal with animation
    setTimeout(function() {
        overlay.classList.add('active');
    }, 10);
    
    // Close modal function
    function closeModal() {
        overlay.classList.remove('active');
        setTimeout(function() {
            overlay.remove();
        }, 300);
    }
    
    // Event listeners
    cancelBtn.addEventListener('click', function() {
        closeModal();
        settings.onCancel();
    });
    
    confirmBtn.addEventListener('click', function() {
        closeModal();
        settings.onConfirm();
    });
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
            settings.onCancel();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            settings.onCancel();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

window.showConfirmModal = showConfirmModal;
