import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import logoImage from '../assets/logo.svg';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleGoHome() {
    navigate('/');
  }

  return (
    <div className='max-w-7xl mx-auto flex flex-col items-center px-6 py-12 gap-12'>
      <div className="relative w-full flex justify-center">
        {location.pathname !== '/' && (
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 text-white" onClick={handleGoHome}>
            <CaretLeft size={36} />
          </button>
        )}

        <img src={logoImage} />
      </div>

     <Outlet />
    </div>
  );
}