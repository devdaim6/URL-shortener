import Redirection from "@/components/Redirection"
import { FC } from "react"

const page: FC = ({ params }: any) => {
    return <Redirection urlCode={params.urlCode} />
}

export default page