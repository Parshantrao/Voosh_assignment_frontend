

const fetchAllTasks = async () => {
    let fetchedData = await fetch(`${process.env.REACT_APP_BACKEND_DEPLOYED_URL_PRODUCTION}/tasks`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await fetchedData.json();
    if (data.status) return data?.data;
    else return false
}

const checkForTokenValidation = async () => {
    let fetchedData = await fetch(`${process.env.REACT_APP_BACKEND_DEPLOYED_URL_PRODUCTION}/token-validation`, {
        method: 'GET',
        credentials: 'include', headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!fetchedData.ok) {
        return false
    }
    else {
        return true
    }
}

export { fetchAllTasks, checkForTokenValidation }