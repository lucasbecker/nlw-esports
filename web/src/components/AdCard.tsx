import { GameController } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';
import AdModal from "../components/AdModal";
import IAd from "../interfaces/Ad";

interface AdCardProps extends IAd {}

export default function AdCard(props: AdCardProps) {
  return (
    <div className='bg-[#2A2634] rounded-lg p-5 flex flex-col gap-4'>    
      <div className="w-full">
        <span className='text-zinc-300 text-sm block'>Nome</span>
        <strong className='font-bold text-white block'>{props.name}</strong>
      </div>

      <div className="w-full">
        <span className='text-zinc-300 text-sm block'>Tempo de jogo</span>
        <strong className='font-bold text-white block'>{props.yearsPlaying} ano(s)</strong>
      </div>

      <div className="w-full">
        <span className='text-zinc-300 text-sm block'>Disponibilidade</span>
        <strong className='font-bold text-white block'>{props.weekDays.length} dia{props.weekDays.length !== 1 && 's'} ○ {props.hourStart} - {props.hourEnd}</strong>
      </div>

      <div className="w-full">
        <span className='text-zinc-300 text-sm block'>Chamada de áudio?</span>
        {props.useVoiceChannel
          ? <strong className='font-bold text-emerald-400 block'>Sim</strong>
          : <strong className='font-bold text-red-400 block'>Não</strong>
        }
      </div>

      <Dialog.Root>  
        <Dialog.Trigger className="w-full bg-[#8B5CF6] text-white font-bold flex justify-center items-center gap-2 py-3 rounded-md">
          <GameController size={24} />
          Conectar
        </Dialog.Trigger>

        <AdModal id={props.id} />
      </Dialog.Root>
    </div>
  )
}