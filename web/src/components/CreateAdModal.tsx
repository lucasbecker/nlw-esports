import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import axios from 'axios';

import { CaretDown, Check, GameController } from 'phosphor-react';
import Input from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';
import IGame from '../interfaces/Game';

export default function CreateAdModal() {
  const [games, setGames] = useState<Array<IGame>>([]);
  const [weekDays, setWeekDays] = useState<Array<string>>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        discord: data.discord,
        yearsPlaying: Number(data.yearsPlaying),
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });

      alert("Anúncio criado com sucesso!");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao criar o anúncio!");
    }
  }

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data));
    
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#242634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-back/25'>
        <Dialog.Title className='text-3xl text-white font-black'>
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='game' className='font-semibold'>Qual o game?</label>
            <Select.Root name='game'>
              <Select.Trigger id='game' className='bg-zinc-900 py-3 px-4 rounded text-sm flex items-center justify-between'>
                <Select.Value placeholder='Selecione o game que deseja jogar' />
                <Select.Icon>
                  <CaretDown size={24} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className='overflow-hidden bg-zinc-900 p-2 text-white text-sm rounded shadow'>
                  <Select.Viewport>
                    {games.map(game => (
                      <Select.Item
                        key={game.id}
                        value={game.id}
                        className='py-1 px-2 rounded hover:bg-zinc-600 flex items-center gap-2'
                      >
                        <Select.ItemText>
                          {game.title}
                        </Select.ItemText>

                        <Select.ItemIndicator>
                          <Check />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          
          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Seu nome (ou nickname)</label>
            <Input id='name' name='name' type='text' placeholder='Como te chama dentro do game?' />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
              <Input id='yearsPlaying' name='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'>Qual seu Discord?</label>
              <Input id='discord' name='discord' type='text' placeholder='Usuário#0000' />
            </div>
          </div>

            <div className='flex flex-col gap-2'>
              <label>Quando costuma jogar?</label>

              <ToggleGroup.Root type='multiple' className='flex gap-2' value={weekDays} onValueChange={setWeekDays}>
                <ToggleGroup.Item value='0' className={`w-full h-10 rounded transition ${ weekDays.includes('0') ? 'bg-violet-400 hover:bg-violet-500' : 'bg-zinc-400 hover:bg-zinc-500'}`} title='Domingo' type='button'>D</ToggleGroup.Item>
                <ToggleGroup.Item value='1' className={`w-full h-10 rounded transition ${ weekDays.includes('1') ? 'bg-violet-400 hover:bg-violet-500' : 'bg-zinc-400 hover:bg-zinc-500'}`} title='Segunda' type='button'>S</ToggleGroup.Item>
                <ToggleGroup.Item value='2' className={`w-full h-10 rounded transition ${ weekDays.includes('2') ? 'bg-violet-400 hover:bg-violet-500' : 'bg-zinc-400 hover:bg-zinc-500'}`} title='Terça' type='button'>T</ToggleGroup.Item>
                <ToggleGroup.Item value='3' className={`w-full h-10 rounded transition ${ weekDays.includes('3') ? 'bg-violet-400 hover:bg-violet-500' : 'bg-zinc-400 hover:bg-zinc-500'}`} title='Quarta' type='button'>Q</ToggleGroup.Item>
                <ToggleGroup.Item value='4' className={`w-full h-10 rounded transition ${ weekDays.includes('4') ? 'bg-violet-400 hover:bg-violet-500' : 'bg-zinc-400 hover:bg-zinc-500'}`} title='Quinta' type='button'>Q</ToggleGroup.Item>
                <ToggleGroup.Item value='5' className={`w-full h-10 rounded transition ${ weekDays.includes('5') ? 'bg-violet-400 hover:bg-violet-500' : 'bg-zinc-400 hover:bg-zinc-500'}`} title='Sexta' type='button'>S</ToggleGroup.Item>
                <ToggleGroup.Item value='6' className={`w-full h-10 rounded transition ${ weekDays.includes('6') ? 'bg-violet-400 hover:bg-violet-500' : 'bg-zinc-400 hover:bg-zinc-500'}`} title='Sábado' type='button'>S</ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='hourStart'>Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input id='hourStart' name='hourStart' type='time' placeholder='De' />
                <Input id='hourEnd' name='hourEnd' type='time' placeholder='Até' />
              </div>
            </div>

          <div className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root
              id='useVoiceChannel'
              // name='useVoiceChannel'
              className='w-6 h-6 p-1 rounded bg-zinc-900'
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                checked !== 'indeterminate' ? setUseVoiceChannel(checked) : setUseVoiceChannel(false);
              }}
            >
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400'/>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor='useVoiceChannel' className='cursor-pointer'>Costumo me conenctar ao chat de voz</label>
          </div>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition'
              type='reset'
            >
              Cancelar
            </Dialog.Close>
            <button
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition'
              type='submit'
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}