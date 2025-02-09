"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaLeaf,
  FaSearch,
  FaHome
} from "react-icons/fa";
import { GiWheat } from "react-icons/gi";
import {
  MdLocalOffer,
  MdRestaurantMenu,
  MdInfo,
  MdEmail,
} from "react-icons/md";
import CartModal from "@/components/CartModal";
import { Salad } from "@/types/salad";

interface CartItem {
  salad: Salad;
  quantity: number;
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("name");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const salads: Salad[] = [
    {
      name: "Caesar Salad",
      image:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80",
      description:
        "Classic Caesar salad with crisp romaine lettuce, parmesan cheese, and homemade croutons.",
      price: 12.99,
      rating: 4.5,
      reviews: 128,
      dietary: {
        vegetarian: true,
        glutenFree: false,
      },
    },
    {
      name: "Greek Salad",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
      description:
        "Traditional Greek salad with fresh cucumbers, tomatoes, olives, and feta cheese.",
      price: 11.99,
      rating: 4.7,
      reviews: 156,
      dietary: {
        vegetarian: true,
        glutenFree: true,
      },
    },
    {
      name: "Cobb Salad",
      image:
        "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=800&q=80",
      description:
        "Hearty Cobb salad loaded with chicken, bacon, eggs, avocado, and blue cheese.",
      price: 14.99,
      rating: 4.6,
      reviews: 98,
      dietary: {
        vegetarian: false,
        glutenFree: true,
      },
    },
    {
      name: "Spinach Salad",
      image:
        "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&q=80",
      description:
        "Fresh baby spinach salad with strawberries, almonds, and balsamic dressing.",
      price: 10.99,
      rating: 4.4,
      reviews: 87,
      dietary: {
        vegetarian: true,
        glutenFree: true,
      },
    },
    {
      name: "Waldorf Salad",
      image:
        "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800&q=80",
      description:
        "Classic Waldorf salad with apples, celery, walnuts, and creamy dressing.",
      price: 13.99,
      rating: 4.3,
      reviews: 76,
      dietary: {
        vegetarian: true,
        glutenFree: true,
      },
    },
    {
      name: "Nicoise Salad",
      image:
        "https://images.unsplash.com/photo-1511357840105-748c95f0a7e7?w=800&q=80",
      description:
        "Traditional Nicoise salad with tuna, eggs, green beans, and olives.",
      price: 15.99,
      rating: 4.8,
      reviews: 112,
      dietary: {
        vegetarian: false,
        glutenFree: true,
      },
    },
  ];

  const menuItems = [
    { name: "Home", icon: <FaHome className="w-5 h-5" /> },
    { name: "Menu", icon: <MdRestaurantMenu className="w-5 h-5" /> },
    { name: "About Us", icon: <MdInfo className="w-5 h-5" /> },
    { name: "Contact", icon: <MdEmail className="w-5 h-5" /> },
  ];

  const addToCart = (saladIndex: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.salad.name === salads[saladIndex].name
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // Add new item
        return [...prevCart, { salad: salads[saladIndex], quantity: 1 }];
      }
    });

    // Show a toast notification
    const toast = document.getElementById("toast") as HTMLDivElement;
    if (toast) {
      toast.classList.remove("hidden");
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 2000);
    }
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(index);
      return;
    }

    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity = newQuantity;
      return newCart;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const filteredSalads = salads
    .filter(
      (salad) =>
        (salad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          salad.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterVegetarian || salad.dietary.vegetarian) &&
        (!filterGlutenFree || salad.dietary.glutenFree) &&
        (!maxPrice || salad.price <= maxPrice)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="drawer lg:drawer-open bg-base-100">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Drawer Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="menu p-4 w-80 min-h-full bg-white text-base-content border-r border-gray-100 shadow-lg">
          {/* User Profile Section */}
          <div className="mb-8 text-center">
            <div className="avatar placeholder mb-4">
              <div className="bg-green-100 text-green-600 rounded-full w-20 h-20 mx-auto">
                <span className="text-3xl">SF</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Welcome to</h3>
            <h2 className="text-xl font-bold text-green-600">Salad Factory</h2>
          </div>

          {/* Main Navigation */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Main Menu</h2>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-all duration-200 text-gray-700 hover:text-green-600 active:bg-green-100">
                    <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dietary Preferences */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Dietary Preferences</h2>
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="form-control">
                <label className="cursor-pointer label justify-start gap-3">
                  <input
                    type="checkbox"
                    checked={filterVegetarian}
                    onChange={(e) => setFilterVegetarian(e.target.checked)}
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text flex items-center gap-2 text-gray-700">
                    <FaLeaf className="text-green-500" />
                    Vegetarian
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label justify-start gap-3">
                  <input
                    type="checkbox"
                    checked={filterGlutenFree}
                    onChange={(e) => setFilterGlutenFree(e.target.checked)}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text flex items-center gap-2 text-gray-700">
                    <GiWheat className="text-blue-500" />
                    Gluten Free
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Price Range</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <input
                type="range"
                min={0}
                max={20}
                value={maxPrice || 20}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="range range-success"
                step={1}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>Max: ${maxPrice || 20}</span>
              </div>
            </div>
          </div>

          {/* Sorting Options */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Sort By</h2>
            <select
              className="select select-bordered w-full bg-gray-50 text-gray-700 hover:border-green-500 focus:border-green-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "price" | "rating" | "name")}
            >
              <option value="name">Name: A to Z</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>

          {/* Daily Special */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Today&apos;s Special</h2>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-white p-2 flex items-center justify-center">
                  <MdLocalOffer className="text-2xl text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-700">20% OFF</h3>
                  <p className="text-sm text-green-600">On all Greek Salads</p>
                </div>
              </div>
              <button className="btn btn-sm bg-white text-green-600 hover:bg-green-50 border-green-200 w-full">
                View Offer
              </button>
            </div>
          </div>

          {/* Health Tips */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Health Tip of the Day</h2>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700 italic">
                &ldquo;Adding colorful vegetables to your salad increases its antioxidant properties and nutritional value.&rdquo;
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Header */}
        <header className="navbar bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-30 px-2 sm:px-4">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <FaLeaf className="text-xl sm:text-2xl" />
              <span className="hidden sm:inline">Salad Factory</span>
              <span className="sm:hidden">SF</span>
            </h1>
          </div>
          <div className="flex-none gap-2 sm:gap-4">
            {/* Order Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500 bg-opacity-50 rounded-lg text-sm">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>Kitchen Open</span>
            </div>
            {/* Cart Button */}
            <div className="dropdown dropdown-end">
              <button
                className="btn btn-ghost btn-sm sm:btn-md btn-circle text-white hover:bg-green-500 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <div className="indicator">
                  <FaShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {cart.length > 0 && (
                    <span className="badge badge-xs sm:badge-sm bg-yellow-400 text-black border-none">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow p-3 sm:p-6 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            {/* Hero Section */}
            <div className="mb-8 sm:mb-12 text-center px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Fresh & Healthy Salads</h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Discover our handcrafted salads made with fresh, locally-sourced ingredients. 
                Perfect for a healthy lifestyle.
              </p>
            </div>

            {/* Search Bar with Categories */}
            <div className="mb-8 sm:mb-12 px-4">
              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for your favorite salad..."
                    className="input input-bordered w-full pl-10 focus:input-primary bg-white shadow-md text-gray-800 placeholder-gray-400 text-sm sm:text-base h-10 sm:h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-[50%] -translate-y-[50%] text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button className="btn btn-xs sm:btn-sm bg-white hover:bg-green-50 text-gray-700 border-gray-200">
                    All Salads
                  </button>
                  <button className="btn btn-xs sm:btn-sm bg-white hover:bg-green-50 text-gray-700 border-gray-200">
                    Vegetarian
                  </button>
                  <button className="btn btn-xs sm:btn-sm bg-white hover:bg-green-50 text-gray-700 border-gray-200">
                    Gluten Free
                  </button>
                  <button className="btn btn-xs sm:btn-sm bg-white hover:bg-green-50 text-gray-700 border-gray-200">
                    Popular
                  </button>
                </div>
              </div>
            </div>

            {/* Salad Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
              {filteredSalads.map((salad, index) => (
                <div
                  key={index}
                  className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <figure className="relative overflow-hidden">
                    <Image
                      src={salad.image}
                      alt={salad.name}
                      width={800}
                      height={600}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2 flex-col sm:flex-row">
                      {salad.dietary.vegetarian && (
                        <span className="badge badge-xs sm:badge-sm bg-green-500 text-white border-none gap-1 sm:gap-2 shadow-lg">
                          <FaLeaf className="w-3 h-3 sm:w-4 sm:h-4" /> 
                          <span className="hidden sm:inline">Vegetarian</span>
                          <span className="sm:hidden">Veg</span>
                        </span>
                      )}
                      {salad.dietary.glutenFree && (
                        <span className="badge badge-xs sm:badge-sm bg-blue-500 text-white border-none gap-1 sm:gap-2 shadow-lg">
                          <GiWheat className="w-3 h-3 sm:w-4 sm:h-4" /> 
                          <span className="hidden sm:inline">Gluten Free</span>
                          <span className="sm:hidden">GF</span>
                        </span>
                      )}
                    </div>
                    {/* Price Badge */}
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                      <div className="bg-white px-2 sm:px-3 py-1 rounded-full shadow-lg text-green-600 font-semibold text-sm sm:text-base">
                        ${salad.price}
                      </div>
                    </div>
                  </figure>
                  <div className="card-body p-3 sm:p-6">
                    <div className="mb-2">
                      <h2 className="card-title text-base sm:text-lg text-gray-800 mb-1 sm:mb-2">{salad.name}</h2>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{salad.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="rating rating-xs sm:rating-sm">
                          {[...Array(5)].map((_, i) => (
                            <input
                              key={i}
                              type="radio"
                              name={`rating-${index}`}
                              className="mask mask-star-2 bg-yellow-400"
                              checked={i + 1 === Math.round(salad.rating)}
                              readOnly
                            />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">
                          ({salad.reviews})
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(index)}
                        className="btn btn-xs sm:btn-sm bg-green-600 hover:bg-green-700 text-white border-none gap-1 sm:gap-2 shadow-md hover:shadow-lg"
                      >
                        <MdLocalOffer className="h-3 w-3 sm:h-4 sm:w-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="max-w-xs">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <FaLeaf className="text-green-400" />
                  Salad Factory
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Fresh, healthy, and delicious salads delivered to you. Made with locally-sourced ingredients.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
                <ul className="space-y-1 sm:space-y-2 text-gray-400">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <span className="w-5 flex-shrink-0">{item.icon}</span>
                        <span className="truncate">{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Opening Hours</h3>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <span className="whitespace-nowrap">Monday - Friday:</span>
                    <span className="whitespace-nowrap">10:00 - 22:00</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="whitespace-nowrap">Saturday - Sunday:</span>
                    <span className="whitespace-nowrap">11:00 - 23:00</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Newsletter</h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                  Subscribe to get special offers and updates.
                </p>
                <div className="flex gap-2 max-w-xs">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="input input-xs sm:input-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400 flex-grow min-w-0"
                  />
                  <button className="btn btn-xs sm:btn-sm btn-success whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700 text-center text-gray-400 text-xs sm:text-sm">
              <p> 2024 Salad Factory. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Toast Notification */}
      <div
        id="toast"
        className="hidden toast toast-top toast-end z-50"
      >
        <div className="alert alert-success">
          <span>Item added to cart!</span>
        </div>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}
