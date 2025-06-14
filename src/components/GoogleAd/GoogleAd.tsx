import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}
export const GoogleAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <>
      <ins
        className='adsbygoogle'
        style={{ display: 'block', width: '90%', height: '90px', margin: '30px' }}
        data-ad-client='ca-pub-3152802418728088'
        data-ad-slot='2256716101'
      ></ins>
    </>
  );
};
