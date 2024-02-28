import { twMerge } from "tailwind-merge"
import { ImageGallery } from "../../types/global.types"
interface ImageCard extends Partial<ImageGallery> {
    className?: string
    onClick?: (id: string) => void
}
function ImageOverlayCard({slug, className=""}: ImageCard) {
  return (
    <div className={twMerge('rounded-lg overflow-hidden border border-gray-300 group flex items-center justify-center h-full', className)}>
        <img src={slug} alt="slug" className="block h-full w-fill object-cover"/>
    </div>
  )
}

export default ImageOverlayCard