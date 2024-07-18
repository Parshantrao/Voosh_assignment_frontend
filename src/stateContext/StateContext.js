const { createContext, useState, useContext } = require("react");



export const stateContext = createContext(null)
export const useStateContext = () => useContext(stateContext);
export const StateProvider = function ({ children }) {

    const [loginModalOpen, setLoginModalOpen] = useState(true)
    const [showNavBar,setShowNavBar] = useState(true)

    const [detailsModalShow, setDetailsModalShow] = useState(false);
    const [cardDetails,setCardDetails]  = useState([])

    const [editModalShow, setEditModalShow] = useState(false);

    const [addModalShow, setAddModalShow] = useState(false);

    return <stateContext.Provider value={{addModalShow, setAddModalShow,editModalShow, setEditModalShow,cardDetails,setCardDetails,detailsModalShow, setDetailsModalShow, loginModalOpen, setLoginModalOpen, showNavBar,setShowNavBar }}>
        {children}
    </stateContext.Provider>
} 