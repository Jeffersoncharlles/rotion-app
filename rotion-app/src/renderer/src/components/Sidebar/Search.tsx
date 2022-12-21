import { MagnifyingGlass } from 'phosphor-react'
import { useState } from 'react'
import { SearchBar } from '../SearchBar'

export function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    setIsSearchOpen(isOpen)
  }

  return (
    <>
      <button onClick={() => handleOpenChange(true)} className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50">
        <MagnifyingGlass className="w-5 h-5" />
        Busca rápida
      </button>

      <SearchBar open={isSearchOpen} onOpenChange={handleOpenChange} />
    </>

  )
}
