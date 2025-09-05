import { useTranslation } from 'react-i18next';
import { GamesSVG } from '../SVGs/GamesSVG';

import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { LanguageControl } from '../LanguageControl/LanguageControl';
import { ExampleSVG } from '../SVGs/Example';
import { GithubSVG } from '../SVGs/Github';
import { GuideSVG } from '../SVGs/Guide';
import { InfoSVG } from '../SVGs/Info';
import { JoinSVG } from '../SVGs/Join';
import { MenuSVG } from '../SVGs/Menu';
import { PlusSVG } from '../SVGs/Plus';
import { ThemeControl } from '../ThemeControl/ThemeControl';
import { MenuItem } from './MenuItem';
export const title = 'Planning Poker';

export const Toolbar = () => {
  const history = useHistory();
  const screenSize = useBreakpoint();
  const { t } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path: string) => {
    history.push(path);
    setIsDropdownOpen(false); // Close dropdown after navigation
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      icon: <PlusSVG />,
      label: t('toolbar.menu.newSession'),
      onClick: () => handleNavigation('/'),
      testId: 'toolbar.menu.newSession',
    },
    {
      icon: <JoinSVG />,
      label: t('toolbar.menu.joinSession'),
      onClick: () => handleNavigation('/join'),
      testId: 'toolbar.menu.joinSession',
    }
  ];
  return (
    <div className='text-gray-100 flex w-full items-center shadow-sm special-color'>
      <div className='inline-flex items-center'>
        <button className='button-ghost flex items-center' onClick={() => history.push('/')}>
          <div className='pr-1'>
       
          </div>
          <p className='md:text-2xl text-sm font-normal'>{title}</p>
        </button>
      </div>

      {/* Right Section */}
      <div className='inline-flex items-center justify-end flex-1'>
        {screenSize === 'md' || screenSize === 'sm' || screenSize === 'xs' ? (
          <div className='flex relative' ref={dropdownRef}>
            <ThemeControl />
            <button
              className='button-ghost flex items-center'
              onClick={toggleDropdown}
              aria-label='Toggle Menu'
            >
              <MenuSVG />
            </button>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-10 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 flex flex-col'>
                {menuItems.map((item, index) => (
                  <MenuItem
                    icon={item.icon}
                    label={item.label}
                    onClick={item.onClick}
                    key={index}
                    testId={item.testId}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {menuItems.map((item, index) => (
              <MenuItem
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
                key={index}
                testId={item.testId}
              />
            ))}
            <ThemeControl />
          </>
        )}
      </div>
    </div>
  );
};
