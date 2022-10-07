import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { CheckCircle, X } from 'phosphor-react';
import { useEffect, useState } from 'react';

interface AdModalProps {
  id: string;
}

export default function AdModal(props: AdModalProps) {
  const [discord, setDiscord] = useState('');

  async function handleCopyDiscord() {
    try {
      await navigator.clipboard.writeText(discord);
      alert("Discord copiado!");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    axios(`http://localhost:3333/ads/${props.id}/discord`)
      .then(response => setDiscord(response.data.discord)).catch(err => setDiscord("Indisponível."));
  }, []);
  
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#242634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-80 shadow-back/25'>
        <Dialog.Close className='absolute top-4 right-4 text-zinc-500 p-1 rounded-md font-semibold hover:text-zinc-400 transition'>
            <X size={24} />
        </Dialog.Close>
        
        <Dialog.Title className='text-2xl text-white font-black flex flex-col items-center justify-center gap-6'>
          <CheckCircle size={64} color='#34D399'/>
          Let's Play
        </Dialog.Title>

        <Dialog.Description className='text-zinc-400 text-center'>
          Agora é só começar a jogar!
        </Dialog.Description>

        <div className='mt-6 flex flex-col gap-2 items-center justify-center'>
          <strong>Adicione no Discord</strong>
          <span className='block w-full p-3 bg-zinc-900 rounded text-zinc-200 text-center cursor-pointer' onClick={handleCopyDiscord}>{discord}</span>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}