import tw from 'twin.macro';

export const h1Style = tw`text-4xl font-bold mb-4 text-blue-900`;
export const h2Style = tw`text-3xl font-bold mb-4 text-blue-800`;
export const h3Style = tw`text-xl font-bold`;
export const h4Style = tw`font-bold text-blue-800`;

const buttonGeneral =
  'font-bold py-2 px-4 rounded-full transition ease-out duration-150';
export const btnPrimary = tw`bg-green-500 hover:bg-green-600 hover:transform hover:-translate-y-px shadow-md hover:shadow-lg text-white ${buttonGeneral}`;
export const btnSecondary = tw`bg-gray-300 hover:bg-gray-400 ${buttonGeneral}`;
