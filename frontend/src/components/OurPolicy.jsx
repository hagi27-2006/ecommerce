import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className='flex flex-col items-center sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Солилцооны бодлого" />
        <p className='font-semibold'>30 хоногийн хялбар солилцоо</p>
        <p className='text-gray-400'>Худалдан авалтдаа сэтгэл хангалуун бус байна уу? Манай хялбар солилцооны бодлого таныг хамгаалах болно.</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Чанарын баталгаа" />
        <p className='font-semibold'>Чанарын баталгаа</p>
        <p className='text-gray-400'>Манай бүтээгдэхүүний чанарыг баталгаажуулж, та зөвхөн шилдэгийг хүлээн авах болно.</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Хэрэглэгчийн дэмжлэг" />
        <p className='font-semibold'>24/7 хэрэглэгчийн дэмжлэг</p>
        <p className='text-gray-400'>Манай тусгай дэмжлэгийн баг танд өдөр шөнөгүй туслахад бэлэн байна.</p>
      </div>
    </div>
  );
};

export default OurPolicy;
