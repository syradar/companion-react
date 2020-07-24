import tw from 'twin.macro';

export const h1Style = tw`text-4xl font-bold mb-4`;
export const h2Style = tw`text-3xl font-bold mb-4`;
export const h3Style = tw`text-xl font-bold`;
export const h4Style = tw`font-bold`;

const buttonGeneral =
  'font-bold py-2 px-4 rounded-full transition ease-out duration-150';
export const btnPrimary = tw`bg-nord8 hover:bg-nord8-darker hover:transform hover:transform shadow-md hover:shadow-lg text-white ${buttonGeneral}`;
export const btnSecondary = tw`bg-nord5 hover:bg-nord4 ${buttonGeneral}`;
