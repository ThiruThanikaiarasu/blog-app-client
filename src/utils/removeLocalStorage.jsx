const removeLocalStorage = () => {
    localStorage.removeItem('isUserLoggedIn')
    localStorage.removeItem('userProfile')
}

export default removeLocalStorage