import { twMerge } from "tailwind-merge"
import ImageIcon from "../../assets/Icons/ImageIcon"
import { ImageGallery } from "../../types/global.types"
import { useState } from "react"
import Modal from "../Modal/Modal"
import CloseIcon from "../../assets/Icons/CloseIcon"
import { nanoid } from "nanoid"

interface AddImageCard{
    styles: {
        backgroundColor: string;
        color: string;
        // Add more style properties as needed
      },
    setImages: React.Dispatch<React.SetStateAction<ImageGallery[]>>
}
function AddImageCard({setImages, styles}:AddImageCard) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const imgUrl = event.currentTarget["image-url"].value

        if (!imgUrl) return

        setImages((prev)=>[
            ...prev, 
            {
                id:nanoid(),
                 slug:imgUrl, 
                 isSelected:false
                }])
                setIsModalOpen(false)
    }
  return (
    <>
    <button 
    onClick={()=>setIsModalOpen(true)}
    type="button" className={twMerge('rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-500 aspect-square p-8'
    
    )}>
        <ImageIcon/>
        <p className="font-semibold text-xs md:text-base whitespace-nowrap">Add Image</p>
    </button>
    <Modal open={isModalOpen}
    handleClose={()=>setIsModalOpen(false)} modalId="addImageModal"
    
    >
<form onSubmit={handleSubmit} action="" className="relative py-12 px-6 bg-neutral-50 rounded w-[650px] max-h-[95vh" style={styles}>
    <CloseIcon onClick={()=> setIsModalOpen(false)} width={31} className="absolute top-4 right-4 cursor-pointer text-red-600 hover:text-red-700 transition-all"/>
    <h2 className="text-2xl font-semibold text-center mb-8">Add New Image URL</h2>
    <input type="url" name='image-url' placeholder="https://example.com/image.png"
    className="w-full border border-gray-600 focus:border-transparent rounded-md"
    />
    <div className="flex justify-end mt-4">
        <button type="submit" className="px-8 py-2.5 bg-emerald-600 text-white duration-500 rounded-md">Add Image</button>
    </div>
</form>

    </Modal>
    </>
  )
}

export default AddImageCard