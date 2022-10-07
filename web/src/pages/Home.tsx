import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react'

import GameCard from '../components/GameCard';
import CreateAdBanner from '../components/CreateAdBanner';
import CreateAdModal from '../components/CreateAdModal';

import IGame from '../interfaces/Game';

import 'keen-slider/keen-slider.min.css'
import '../styles/main.css';


export default function Home() {
  const [games, setGames] = useState<Array<IGame>>([]);

  const [options, setOptions] = useState<KeenSliderOptions>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(options);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data));
    
  }, []);

  useEffect(() => {
    if (games.length) {
      games.length > 6
        ? setOptions({
          initial: 0,
          loop: true,
          mode: "free-snap",
          slides: {
            perView: 6,
            spacing: 24,
          }
          })
        : setOptions({
          slides: {
            perView: 6,
            spacing: 24,
          }
        });

      setLoaded(true);
    }
  }, [games]);
  
  return (
    <>
      <h1 className='text-6xl text-white font-black mt-8'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='w-full mt-4'>
        <div className='relative'>
          <div ref={sliderRef} className="keen-slider">
            {games.map(game => 
              <div className="keen-slider__slide" key={game.id}>
                <GameCard
                  id={game.id}
                  bannerUrl={game.bannerUrl}
                  title={game.title}
                  ads={game._count?.ads ?? 0}
                />
              </div>
            )}
          </div>
          {loaded && instanceRef.current && games.length > 6 && (
            <>
              <button
                className='absolute top-0 bottom-0 left-0 z-10 text-white transition hover:text-zinc-400 cursor-w-resize'
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              >
                <CaretLeft size={48} />
              </button>
              <button
                className='absolute top-0 bottom-0 right-0 z-10 text-white transition hover:text-zinc-400 cursor-e-resize'
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              >
                <CaretRight size={48} />
              </button>
            </>
          )}
        </div>

        <Dialog.Root>
          <CreateAdBanner />
          
          <CreateAdModal />
        </Dialog.Root>
      </div>
    </>
  );
}
