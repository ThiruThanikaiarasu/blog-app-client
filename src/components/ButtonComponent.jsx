import React from 'react'

const ButtonComponent = ({children, ...props}) => {
    return (
        <React.Fragment>
            <button
                {...props}
            >
                {children}
            </button>
        </React.Fragment>
    )
}

export default ButtonComponent