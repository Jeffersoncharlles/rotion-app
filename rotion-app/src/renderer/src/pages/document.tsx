import { Link } from "react-router-dom";
import { Editor } from "../components/Editor";
import   {ToC} from '../components/ToC'


export const Document = () => {

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
       <Editor />
      </section>
    </main>
  );
}
