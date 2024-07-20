const { createContext, useState, useContext } = require("react");



export const stateContext = createContext(null)
export const useStateContext = () => useContext(stateContext);
export const StateProvider = function ({ children }) {

    const [tasksData, setTasksData] = useState([])

    const fetchAllTasks = async ()=>{
        let fetchedData = await fetch(`https://voosh-assignment-backend-vv41.onrender.com/tasks/${localStorage.getItem("userId")}`, {
            method: 'GET',
            credentials:'include', headers: {
              'Content-Type': 'application/json'
            }
          })
         const data = await fetchedData.json()
         setTasksData(data.data)
    }

    const checkForTokenValidation = async ()=>{
        let fetchedData = await fetch(`https://voosh-assignment-backend-vv41.onrender.com/token-validation/`, {
            method: 'GET',
            credentials:'include', headers: {
              'Content-Type': 'application/json'
            }
          })
          if(!fetchedData.ok){
            return false
          }
          else return true
    }

    const [userEmail, setUserEmail] = useState("")

    const [isUserLoggedin, setIsUserLoggedin] = useState(false)

    const [loginModalOpen, setLoginModalOpen] = useState(true)
    const [showNavBar, setShowNavBar] = useState(true)

    const [detailsModalShow, setDetailsModalShow] = useState(false);
    const [cardDetails, setCardDetails] = useState([])

    const [editModalShow, setEditModalShow] = useState(false);

    const [addModalShow, setAddModalShow] = useState(false);

    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const [taskId,setTaskId] = useState("")


    return <stateContext.Provider value={{taskId,setTaskId,checkForTokenValidation,fetchAllTasks,deleteModalShow, setDeleteModalShow, tasksData, setTasksData, isUserLoggedin, setIsUserLoggedin, userEmail, setUserEmail, addModalShow, setAddModalShow, editModalShow, setEditModalShow, cardDetails, setCardDetails, detailsModalShow, setDetailsModalShow, loginModalOpen, setLoginModalOpen, showNavBar, setShowNavBar }}>
        {children}
    </stateContext.Provider>
} 