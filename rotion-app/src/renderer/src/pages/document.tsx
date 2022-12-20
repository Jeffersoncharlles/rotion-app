import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import   {ToC} from '../components/ToC'


export const Document = () => {
  const { id } = useParams<{ id: string }>()

  //isFetching sempre que mudar o id ele vai mudar true ou false
  const { data,isFetching } = useQuery(['documents', id], async () => {
    const response = await window.api.fetchDocument({ id: id! })
    return response.data
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }

    return '';

  },[data])//valor so seja alterado quando a  data mudar

  return (
    <main className='flex-1 flex py-12 px-10 gap-8'>
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs uppercase">Table Of Content</span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Autenticante</ToC.Link>
            <ToC.Link>Banco de dados</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 leading-relaxed flex flex-col items-center">
        {!isFetching && data && <Editor content={initialContent} />}
      </section>
    </main>
  );
}
