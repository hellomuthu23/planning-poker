import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRouteMatch } from 'react-router-dom';
import { Divider } from '../../components/Divider/Divider';
import { Footer } from '../../components/Footer/Footer';
import { GoogleAd } from '../../components/GoogleAd/GoogleAd';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import { RecentGames } from '../../components/Poker/RecentGames/RecentGames';
import { AboutPlanningPokerContent } from '../AboutPage/AboutPage';
import SessionControllerImage from './../../images/Session.jpg';
import LandingImage from './../../images/background.jpg';
import './HomePage.css';

export const HomePage = () => {
  const isJoin = useRouteMatch('/join');
  const { t } = useTranslation();

  return (
    <>
      <div className='flex flex-col items-center w-full'>
        {/* Hero Section */}
        <div className='flex flex-col lg:flex-row w-full max-w-7xl items-center justify-center mt-8'>
          <div className='w-full lg:w-1/2 flex flex-col items-center px-4'>
            <h1 className='text-2xl font-bold text-center mb-4'>
              {t('HomePage.heroSection.title')}
            </h1>
            <div className='p-4'>
              <LazyLoadImage
                loading='lazy'
                alt={t('HomePage.heroSection.title')}
                className='HomePageImage rounded-lg shadow-md'
                src={LandingImage}
              />
            </div>
            <p className='text-base text-center text-gray-600 mb-4'>
              {t('HomePage.heroSection.description')}
            </p>
          </div>
          <div className='w-full lg:w-1/2 flex flex-col items-center px-4'>
            <div className='w-full max-w-md'>{isJoin ? <JoinGame /> : <CreateGame />}</div>
          </div>
        </div>

        <GoogleAd />

        <Divider />

        {/* Recent Games Section */}
        <div className='flex flex-col lg:flex-row w-full max-w-7xl items-center justify-center'>
          <div className='w-full lg:w-1/2 px-4 mb-8 lg:mb-0'>
            <div className='HomePageContainer'>
              <RecentGames />
            </div>
          </div>
          <div className='w-full lg:w-1/2 px-4'>
            <div className='HomePageContainer'>
              <p className='text-base text-gray-600'>
                Here is your recent Planning/Refinement sessions, click on the session name to join
                the session again.
              </p>
            </div>
          </div>
        </div>

        <Divider />

        {/* Intuitive UI Design Section */}
        <div className='flex flex-col lg:flex-row w-full max-w-5xl items-center justify-center'>
          <div className='w-full lg:w-1/2 px-4 mb-8 lg:mb-0'>
            <div className='HomePageContainer'>
              <h2 className='text-xl font-semibold mb-2'>Intuitive UI Design</h2>
              <p className='text-base text-gray-600'>
                Beautiful design for voting the story points, showing team members voting status
                with emojis(👍 - Voting Done, 🤔 - Yet to Vote). Once the card values are revealed,
                the card color helps to understand if the team's voting is sync or not. Session
                Moderator has full control on revealing story points and restarting the session.
              </p>
            </div>
          </div>
          <div className='w-full lg:w-1/2 px-4'>
            <div className='HomePageContainer flex justify-center'>
              <div className='p-4'>
                <img
                  className='SessionImage rounded-lg shadow-md'
                  alt='Session controller'
                  src={SessionControllerImage}
                />
              </div>
            </div>
          </div>
        </div>

        <GoogleAd />
        <Divider />
        {/* About Section */}
        <div className='w-full max-w-7xl my-8'>
          <AboutPlanningPokerContent />
        </div>

        <GoogleAd />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
