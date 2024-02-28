import './App.css'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, TouchSensor, closestCenter } from '@dnd-kit/core'
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState, useEffect } from'react'
import { ImageGallery } from './types/global.types'
import { initialImageData } from './data'
import ImageCards from './components/Cards/imageCards'
import AddImageCard from './components/Cards/AddImageCard'
import ImageOverlayCard from './components/Cards/ImageOverlayCard'
import Header from './components/Header/Header'
import { useLocalStorage } from './Hooks/useLocalStorage'
function App() {
  const [images, setImages] = useState<ImageGallery[]>(initialImageData)

  const [activeItem, setActiveItem] = useState<ImageGallery | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  )

  const handleDragStart = (event: DragStartEvent) => {
    const {id} = event.active
    if (!id) return
    const currentItem = images.find((image)=> image.id === id)

    setActiveItem(currentItem || null)
  }
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null)
    const {active, over} = event
    if (!over) return
    if (active.id !== over.id) {
      setImages((items)=> {
      const oldIndex = items.findIndex((item) => item.id ===active.id)
      const newIndex = items.findIndex((item)=> item.id ===over.id)

      return arrayMove(items, oldIndex, newIndex)
    })
    }
  }

  function handleSelectImage(id : string){
    const newGallery = images.map((imageItem)=> {
      if (imageItem.id === id){
        return{
          ...imageItem, isSelected: !imageItem.isSelected
        }
      }
      return imageItem
    })

    setImages(newGallery)
  }

  const handleDelete = (selectedItems: ImageGallery[]) => {
    const newImages = images.filter((image) =>!selectedItems.includes(image))

    setImages(newImages)

  }

  // const [darkMode, setDarkMode] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

  useEffect(() => {
    // Update body background color when dark mode changes
    document.body.style.backgroundColor = darkMode ? "#161719" : "white";
  }, [darkMode]); // Run this effect whenever darkMode changes

  function darkModeSetting() {
    setDarkMode(!darkMode);
  }

  const styles = {
    backgroundColor: darkMode ? "#111119" : "#e8edeed5",
    color: darkMode? "white" : "black"
  }

  return (
    <>
      <div className="min-h-screen">
        <div className='container flex flex-col items-center'>
          <div className='bg-white my-8 rounded-lg max-w-5xl grid divide-y'>
            <Header styles={styles} darkModeSetting={darkModeSetting} 
            onDelete={handleDelete} images={images}/>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-8 p-8 xs:grid-cols-1' style={styles}>
                <SortableContext
                  items={images}
                  strategy={rectSortingStrategy}
                >
                  {images.map((image, index) =>
                  <ImageCards
                  key={index}
                  id={image.id}
                  isSelected={image.isSelected}
                  slug={image.slug}
                  onClick={handleSelectImage}
                  />
                  )
                }
                </SortableContext>

                <AddImageCard setImages={setImages} styles={styles} />

                <DragOverlay adjustScale={true} wrapperElement='div'>
                  {
                    activeItem ? (<ImageOverlayCard className='absolute z-50 h-full w-full' slug={activeItem.slug} />) : null
                  }
                </DragOverlay>

              </div>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
