import { Link } from "react-router-dom";

interface GameCardProps {
  id: string;
  bannerUrl: string;
  title: string;
  ads: number;
}

export default function GameCard(props: GameCardProps) {
  return (
    <Link to={props.id} className='relative rounded-lg overflow-hidden'>
      <img src={props.bannerUrl} alt={props.title} className="w-full" />

      <div className='w-full pt-16 pb-4 px-4 bg-card-gradient absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white block'>{ props.title }</strong>
        <span className='text-zinc-300 text-sm block'>{props.ads} anúncio{ props.ads !== 1 && 's' }</span>
      </div>
    </Link>
  )
}