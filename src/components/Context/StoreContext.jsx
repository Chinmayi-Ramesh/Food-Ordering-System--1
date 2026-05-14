import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { food_list as staticFoodList } from "../../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState(staticFoodList);

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems(prev => ({...prev, [itemId]: 1}))
        } 
        else {
            setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}))
        }
    }

    const removeFromCart = (itemId) => {
        if(cartItems[itemId]){
            setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}))
        }
    }
    const getTotalCartAmount = ( ) => {
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }


    const url = "http://localhost:5000"
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data.success && Array.isArray(response.data.data)) {
                setFoodList(response.data.data);
            } else {
                setFoodList(staticFoodList);
            }
        } catch(error) {
            console.error("Error loading food list:", error);
            setFoodList(staticFoodList);
        }
    };

    // Load token, cart, and food_list on mount
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
        }
        
            const storedCart = localStorage.getItem("cartItems");
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        }
        loadData();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const [search, setSearch] = useState("");

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userName,
        setUserName,
        search,
        setSearch,
        fetchFoodList
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider


