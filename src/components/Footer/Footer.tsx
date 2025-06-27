import { CopyrightSVG } from '../SVGs/CopyrightSVG';

export const Footer = () => {
  return (
    <footer>
      <div className='border-b border-gray-300'></div>
      <div className='flex w-full items-center justify-between p-2'>
        <div className='flex items-center justify-center pl-5'>
          <CopyrightSVG />
          <p className='text-sm pl-1 pb-0.5'>hellomuthu23</p>
        </div>

        <div className='border-r border-gray-300 mx-2 h-10'></div>
        <div className='FooterItemContainer'>
          <p className='text-sm'>Feedback: hellomuthu23@gmail.com</p>
        </div>

        <div className='border-r border-gray-300 mx-2 h-10'></div>
        <a href='https://github.com/hellomuthu23/planning-poker/issues'>Submit an Issue</a>
        <div className='border-r border-gray-300 mx-2 h-10'></div>
        <div className='pr-5'>
          <p className='text-sm'>
            <a href='https://www.buymeacoffee.com/hellomuthu23' target='_blank' rel='noreferrer'>
              <img
                src='https://cdn.buymeacoffee.com/buttons/v2/default-blue.png'
                alt='Buy Me A Coffee'
                style={{ height: '40px', width: '150px' }}
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
