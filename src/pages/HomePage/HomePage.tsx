import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { Divider } from '../../components/Divider/Divider';
import { Footer } from '../../components/Footer/Footer';
import { GoogleAd } from '../../components/GoogleAd/GoogleAd';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { JoinGame } from '../../components/Poker/JoinGame/JoinGame';
import { RecentGames } from '../../components/Poker/RecentGames/RecentGames';

export const HomePage = () => {
  return (
    <>
      <div className='flex flex-col items-center w-full animate-fade-in-down'>
        <HeroSection />
          
        <GoogleAd />
      </div>
      <Footer />
    </>
  );
};

import { HTMLAttributes, ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  maxWidth?: string;
  className?: string;
};

const Section = ({ children, maxWidth = 'max-w-7xl', className = '' }: SectionProps) => (
  <div
    className={`flex flex-col lg:flex-row w-full ${maxWidth} items-center justify-center ${className}`}
  >
    {children}
  </div>
);

type ColumnProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Column = ({ children, className = '', ...props }: ColumnProps) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

const HeroSection = () => {
  const isJoin = useRouteMatch('/join');
  const { t } = useTranslation();
  return (
    <Section className='pt-24'>
      <Column className='flex flex-col items-center w-full lg:w-1/3 px-4'>
          <RecentGamesSection />
      </Column>
      <Column className='flex flex-col items-center w-full lg:w-1/2 px-4'>
        <div className='w-full max-w-md'>{isJoin ? <JoinGame /> : <CreateGame />}</div>
      </Column>
    </Section>
  );
};

const RecentGamesSection = () => {
  const { t } = useTranslation();
  return (
    <Section>
        <Column>
            <div className='p-2 flex flex-col items-center justify-center'>
                <RecentGames/>
            </div>
        </Column>
    </Section>
  );
};

export default HomePage;
