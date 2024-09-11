import './index.css'

interface BannerProps {
  src: string
  alt?: string
}

const Banner = ({src, alt}:BannerProps) => {
  return (
    <section className='banner'>
        
      <img src={src} alt={alt} />
        
    </section>
  )
}

export default Banner