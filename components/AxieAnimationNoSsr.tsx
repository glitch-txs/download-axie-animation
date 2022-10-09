import dynamic from 'next/dynamic';

export const AxieAnimation = dynamic(
  () => import('./').then(module => module.AxieAnimation),
  { ssr: false, loading: () => <></> },
);