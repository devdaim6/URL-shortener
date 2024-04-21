import { FC } from 'react'

interface LoadingProps {
    size?: number
}
const Loading: FC<LoadingProps> = ({ size }) => {
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full h-${size ? size : 6} w-${size ? size : 6} border-t-2 border-b-2 border-purple-500`}></div>
        </div>
    )
}

export default Loading