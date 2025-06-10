import env from '@/lib/env'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageItemProps {
    id: string
}

export default function ImageItem({ id }: ImageItemProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('access_token')
        fetch(`${env.NEXT_PUBLIC_APP_BACKEND_URL}/api/v1/images/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Erreur lors du chargement de l\'image')
                return res.json()
            })
            .then(data => {
                setImageUrl(data.url)
                setError(null)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <div>Chargement...</div>
    if (error) return <div>Erreur: {error}</div>
    if (!imageUrl) return <div>Aucune image trouvée</div>

    return (
        <Image
            src={imageUrl}
            alt="Image"
            className="w-full h-auto max-w-full rounded shadow"
            width={500}
            height={500}
            unoptimized
        />
    )
}
