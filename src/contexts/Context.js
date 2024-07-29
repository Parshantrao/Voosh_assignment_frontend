import { useNavigate } from "react-router";
import { checkForTokenValidation } from "../serverCalls/ServerCalls";

const { createContext, useState, useContext, useEffect } = require("react");



export const stateContext = createContext(null)
export const useStateContext = () => useContext(stateContext);

export const StateProvider = function ({ children }) {

  const navigate = useNavigate()

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [tasksData, setTasksData] = useState([])


  const [userEmail, setUserEmail] = useState("")


  const [loginModalOpen, setLoginModalOpen] = useState(true)
  const [showNavBar, setShowNavBar] = useState(true)

  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [cardDetails, setCardDetails] = useState([])

  const [editModalShow, setEditModalShow] = useState(false);

  const [addModalShow, setAddModalShow] = useState(false);

  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const [taskId, setTaskId] = useState("")


  useEffect(() => {
    const tokenValidationCheck = async () => {
      try {

        const isTokenValid = await checkForTokenValidation();

        if (!isTokenValid) {
          setIsUserLoggedIn(false);
          // navigate('/login');
        } else {
          setIsUserLoggedIn(true);
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setIsUserLoggedIn(false);
        // navigate('/login');
      }
    };

    tokenValidationCheck();
  }, [isUserLoggedIn, navigate]);


  return <stateContext.Provider value={{setIsUserLoggedIn, isUserLoggedIn, taskId, setTaskId, deleteModalShow, setDeleteModalShow, tasksData, setTasksData, userEmail, setUserEmail, addModalShow, setAddModalShow, editModalShow, setEditModalShow, cardDetails, setCardDetails, detailsModalShow, setDetailsModalShow, loginModalOpen, setLoginModalOpen, showNavBar, setShowNavBar }}>
    {children}
  </stateContext.Provider>
} 