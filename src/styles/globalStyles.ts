import tw from 'twin.macro';

export const h1Style = tw`text-4xl font-bold mb-4 text-blue-900`;
export const h2Style = tw`text-3xl font-bold mb-4`;
export const h3Style = tw`text-xl font-bold`;

const buttonGeneral = 'font-bold py-2 px-4 rounded-full';
export const btnPrimary = tw`bg-blue-500 hover:bg-blue-700 text-white ${buttonGeneral}`;
export const btnSecondary = tw`bg-gray-300 hover:bg-gray-500 ${buttonGeneral}`;
