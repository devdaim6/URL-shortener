"use client"
import { getOriginalURL } from '@/actions/getOriginalURL'
import Loading from '@/components/Loading'
import { notFound, redirect } from 'next/navigation'
import { FC, useEffect, useState } from 'react'


const page: FC = ({ params }: any) => {
    const [originalUrl, setOriginalURL] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getOriginalURL(setOriginalURL, setLoading, params.urlCode);
    }, [])

    if (loading)
        return <Loading size={60} />

    if (originalUrl)
        return redirect(originalUrl)
    else
        return notFound()

}

export default page