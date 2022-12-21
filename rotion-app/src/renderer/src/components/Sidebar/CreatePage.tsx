import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Document } from '~/src/shared/types/ipc'

export function CreatePage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()



  const { isLoading: isCreateNewDocument,mutateAsync: createDocument } = useMutation(async () => {
    const response = await window.api.CreateDocument()

    return response.data
  }, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries(['documents'])//um alto refresh como se tivesse fazendo um query
      queryClient.setQueryData<Document[]>(['documents'], (documents) => {
        //tem que fazer a validação pois pode ser undefined
        if (documents && documents.length >= 0) {
          return [...documents, data]
        }
        return [data]
      })

      navigate(`/documents/${data.id}`)
    }
  })

  useEffect(() => {
    function onNewDocument() {
      createDocument()
    }
    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <button
      disabled={isCreateNewDocument}
      onClick={() => createDocument()}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60">
      <Plus className="h-4 w-4" />
      Novo Documento
    </button>
  )
}
