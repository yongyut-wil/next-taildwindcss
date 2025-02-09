"use client";
import { useState } from "react";
import {
  FaShoppingCart,
  FaLeaf,
  FaSearch,
  FaHome,
  FaFilter,
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

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("name");
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    setCart((prev) => {
      const existing = prev.find((item) => item.id === saladIndex);
      if (existing) {
        return prev.map((item) =>
          item.id === saladIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: saladIndex, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCart((prev) => {
      if (quantity === 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredSalads = salads
    .filter(
      (salad) =>
        (salad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          salad.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterVegetarian || salad.dietary.vegetarian) &&
        (!filterGlutenFree || salad.dietary.glutenFree)
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
        <aside className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border-r border-base-300">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Menu</h2>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a className="flex items-center gap-3 p-3 hover:bg-base-300 rounded-lg transition-colors">
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <FaFilter />
              Filters
            </h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="cursor-pointer label justify-start gap-3">
                  <input
                    type="checkbox"
                    checked={filterVegetarian}
                    onChange={(e) => setFilterVegetarian(e.target.checked)}
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text flex items-center gap-2">
                    <FaLeaf className="text-success" />
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
                  <span className="label-text flex items-center gap-2">
                    <GiWheat className="text-primary" />
                    Gluten Free
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Sort By</h2>
            <select
              className="select select-bordered w-full hover:select-primary focus:select-primary"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "price" | "rating" | "name")
              }
            >
              <option value="name">Name</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        <header className="navbar bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-30">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
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
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FaLeaf className="text-2xl" />
              Salad Factory
            </h1>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <button
                className="btn btn-ghost btn-circle text-white hover:bg-green-500"
                onClick={() => setIsCartOpen(true)}
              >
                <div className="indicator">
                  <FaShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="badge badge-sm indicator-item bg-yellow-400 text-black border-none">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow p-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="mb-8">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for your favorite salad..."
                  className="input input-bordered w-full pl-10 focus:input-success bg-white shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-green-600" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSalads.map((salad, index) => (
                <div
                  key={index}
                  className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-green-500"
                >
                  <figure className="relative">
                    <img
                      src={salad.image}
                      alt={salad.name}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {salad.dietary.vegetarian && (
                        <span className="badge bg-green-500 text-white border-none gap-2">
                          <FaLeaf /> Vegetarian
                        </span>
                      )}
                      {salad.dietary.glutenFree && (
                        <span className="badge bg-blue-500 text-white border-none gap-2">
                          <GiWheat /> Gluten Free
                        </span>
                      )}
                    </div>
                  </figure>
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <h2 className="card-title text-green-700 font-bold">
                        {salad.name}
                      </h2>
                      <div className="text-xl font-bold text-green-600">
                        ${salad.price}
                      </div>
                    </div>
                    <p className="text-gray-600">{salad.description}</p>
                    <div className="flex items-center mt-2">
                      <div className="rating rating-sm">
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
                      <span className="ml-2 text-sm text-gray-500">
                        ({salad.reviews} reviews)
                      </span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button
                        onClick={() => addToCart(index)}
                        className="btn bg-green-600 hover:bg-green-700 text-white border-none gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <MdLocalOffer className="h-5 w-5" />
                        Add to Cart - ${salad.price}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <FaLeaf className="text-green-400" />
                  Salad Factory
                </h3>
                <p className="text-sm text-gray-300">
                  Fresh, healthy, delicious salads delivered to you.
                </p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Quick Links</h3>
                <ul className="text-sm text-gray-300">
                  {menuItems.map((item, index) => (
                    <li key={index} className="mb-1">
                      <a
                        href="#"
                        className="hover:text-green-400 transition-colors flex items-center gap-2"
                      >
                        {item.icon}
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold mb-2">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center text-gray-400">
              2024 Salad Factory. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        salads={salads}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}
