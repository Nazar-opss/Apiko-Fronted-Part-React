import { Outlet, useNavigate } from "react-router-dom";
import logo from './logo.svg'
import { createPortal } from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer.js";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const CocktailContext = React.createContext()

function App() {
  const [numberCart, setNumber] = useState(0)
  const [search, setSearch] = useState('')
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/")
  }

  const navigateSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`catalog/search/${search}`)
      setSearch('')
      // TODO in future: make it like ?s={search}
    }
  }

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.idDrink === item.idDrink); // check if the item is already in the cart
  
    if (isItemInCart) {
    setCartItems(
        cartItems.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
        cartItem.idDrink === item.idDrink
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem // otherwise, return the cart item
        )
    );
    } else {
    setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
    }
  };

  const clearCart = () => {
    setCartItems([]);
    console.log('Ordered: ', cartItems.map(item => item.strDrink))
    setShowModal(false)
  };
  
console.log(cartItems)
console.log(numberCart)

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        setCartItems(JSON.parse(cartItems));
      }
  }, []);

  const CartModal = ({ onClose }) => {
    return(
      <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Корзина</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <h4>Назва</h4>
          <h4 style={{marginLeft: '60px'}}>Кількість</h4>
        </div>
          {
            cartItems.map((elem) => (
            <div className="modal_list_item" key={elem.idDrink}>
              <img src={elem.strDrinkThumb} alt={elem.strDrink} className='cocktailModal_img'></img>
              <div>{elem.strDrink}</div>
              <div>{elem.quantity}</div>
            </div>
          ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Закрити
          </Button>
          <Button variant="primary" onClick={clearCart}>
            Підтвердити
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" className="logo" onClick={navigateHome}></img>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <TextField id="input-with-sx" label="Пошук" type="text" variant="standard" color="warning" 
            value={search} 
            onKeyDown={(e) => navigateSearch(e)} 
            onChange={(e) => setSearch(e.target.value)} />
        </Box> 
      
        <Box onClick={ cartItems.length === 0 ? () => alert("Спочатку оберіть коктейль") : () => setShowModal(true) } className='cart'sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <h2 className="cart_text">Корзина</h2>
          <ShoppingCartIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <span className="cart_counter">{cartItems.length}</span>
        </Box>
        {showModal && createPortal(
          <CartModal onClose={() => setShowModal(false)} />,
          document.getElementById('modal-root'),
        )}
      </header>
  <CocktailContext.Provider value={{numberCart, setNumber, cartItems, setCartItems, addToCart}} >
      <main>
        <div className="main_container">
          <Outlet></Outlet>
        </div>
      </main>
      <footer>
        <Footer/>
      </footer>
  </CocktailContext.Provider>
    </div>
  );
}

export default App;
