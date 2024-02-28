import CheckboxIcon from "../../assets/Icons/CheckboxIcon"
import EmptyCheckboxIcon from "../../assets/Icons/EmptyCheckboxIcon"
import { ImageGallery } from "../../types/global.types"
import { FaMoon } from "react-icons/fa6";

interface HeaderProps {
    styles: {
        backgroundColor: string;
        color: string;
        // Add more style properties as needed
    },
    onDelete: (selectedItems: ImageGallery[]) => void
    images: ImageGallery[]
    darkModeSetting: () => void

}
function Header({ onDelete, images, darkModeSetting, styles }: HeaderProps) {
    const selectedItems = images.filter((image) => image.isSelected)


    return (
        <div className="flex items-center justify-between gap-4 p-5" style={styles}>
            <p className="text-2xl font-semibold text-gray-800" style={styles}>Image Gallery</p>

            {
                selectedItems.length > 0 ? <>
                    <h2 className="text-lg md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        {
                            selectedItems.length > 0 ? (<CheckboxIcon className="text-blue-600" />) : (<EmptyCheckboxIcon />)
                        }
                        <span>
                            {
                                selectedItems.length > 1 ? `${selectedItems.length} Files Selected` : `${selectedItems.length} Files Selected`
                            }
                        </span>
                    </h2>
                    <button className="font-semibold text-red-500 text-base md:text-lg hover:underline"
                        onClick={selectedItems.length > 0 ? () => onDelete(selectedItems) : () => { }}>
                        {
                            selectedItems.length > 1 ? `Delete Files` : `Delete Files`
                        }
                    </button>
                </> : <div className="flex items-center justify-between gap-4 p-5">
                    <button><FaMoon onClick={darkModeSetting} className="" /></button>
                </div>
            }
        </div>
    )
}

export default Header