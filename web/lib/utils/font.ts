import localFont from 'next/font/local';

export const poppins = localFont({
  src: [
    {
      weight: '300',
      path: '../fonts/poppins/Poppins-Light.ttf',
    },
    {
      weight: '500',
      path: '../fonts/poppins/Poppins-Regular.ttf',
    },
    {
      weight: '700',
      path: '../fonts/poppins/Poppins-Bold.ttf',
    },
  ],
});
