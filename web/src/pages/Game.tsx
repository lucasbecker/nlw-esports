import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import IGame from "../interfaces/Game";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import AdCard from "../components/AdCard";

export default function Game() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<IGame>();

  const [options, setOptions] = useState<KeenSliderOptions>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(options);

  function handleGoHome() {
    navigate('/');
  }

  useEffect(() => {
    axios(`http://localhost:3333/games/${gameId}`).then(response => setGame(response.data)).catch(err => handleGoHome());
  }, []);

   useEffect(() => {
    if (!!game) {
      game.ads && game.ads.length > 4
        ? setOptions({
          initial: 0,
          loop: true,
          mode: "free-snap",
          slides: {
            perView: 4,
            spacing: 24,
          }
          })
        : setOptions({
          slides: {
            perView: 4,
            spacing: 24,
          }
        });

      setLoaded(true);
    }
  }, [game]);

  return (
    <>
      <h1 className='text-6xl text-white font-black mt-8'>
        { game?.title }
      </h1>

      <div className='w-full mt-4'>
        <div className='relative'>
          <div ref={sliderRef} className="keen-slider">
            {game?.ads?.map(ad => 
              <div className="keen-slider__slide" key={ad.id}>
                <AdCard {...ad} />
              </div>
            )}
          </div>
          {loaded && instanceRef.current && game && game.ads && game.ads.length > 4 && (
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
      </div>
    </>
  )
}