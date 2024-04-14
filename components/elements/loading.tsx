import Image from 'next/image'
import spin from '@/public/anime-spin.gif'

const Spin = () => {
    return (
        <div className=' flex items-start justify-center h-[calc(100svh-220px)] w-svw' >
            <Image width={32} priority height={32} alt='loading...' src={spin} />
        </div>
    )
}

export default Spin