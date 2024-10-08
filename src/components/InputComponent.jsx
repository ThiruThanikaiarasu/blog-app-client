import React from "react"

const InputComponent = ({...props}) => {
    return (
        <React.Fragment>
            <input
                {...props}
            />
        </React.Fragment>
    )
}

export default InputComponent