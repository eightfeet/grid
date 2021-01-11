import React from 'react'

interface Props {

}

const Dashboard:React.FC<Props> = ({children}) => {
    return (
        <>
            <div>
                菜单tab
            </div>
            {children}
        </>
    )
}

export default Dashboard
