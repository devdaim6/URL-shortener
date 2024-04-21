"use client"
import { FC, useEffect, useState } from 'react'
import { getOriginalURL } from '@/actions/getOriginalURL'
import Loading from '@/components/Loading'
import { notFound, redirect } from 'next/navigation'


interface RedirectionProps {
    urlCode: string
}

const Redirection: FC<RedirectionProps> = ({ urlCode }) => {
    const [originalUrl, setOriginalURL] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getOriginalURL(setOriginalURL, setLoading, urlCode);
    }, [])

    if (loading)
        return <Loading size={60} />

    if (originalUrl)
        return redirect(originalUrl)
    else
        return notFound()
}

export default Redirection