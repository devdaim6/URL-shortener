import { FC } from 'react'

interface LoadingProps {
    size?: number
}
const Loading: FC<LoadingProps> = ({ size }) => {
    return (
        <div className="flex justify-center items-center">
            {size ? <div className={`animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500`}></div>
                : <div className={`animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500`}></div>
            } </div>
    )
}

export default Loading