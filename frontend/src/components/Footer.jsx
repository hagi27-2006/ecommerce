import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm text-gray-700">
      {/* Лого хэсэг */}
      <div className="flex justify-center sm:justify-start">
        <img src={'icons8_shoppers_drug_mart_100px.png'} className="mb-5 w-32" alt="Компанийн Лого" />
      </div>
      
      {/* Тодорхойлолт хэсэг */}
      <div className="flex flex-col items-center sm:items-start">
        <p className="w-full md:w-2/3 text-gray-600 text-center sm:text-left">
          Лорем ипсум долор сит амет консектетур адиписици элит. Куискуам, квос.
        </p>
      </div>

      {/* Түгээмэл холбоосууд хэсэг */}
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col">
          <h5 className="font-semibold mb-2">Түгээмэл холбоосууд</h5>
          <a href="#" className="hover:text-gray-600">Бидний тухай</a>
          <a href="#" className="hover:text-gray-600">Үйлчилгээнүүд</a>
          <a href="#" className="hover:text-gray-600">Холбоо барих</a>
          <a href="#" className="hover:text-gray-600">Нууцлалын бодлого</a>
        </div>

        {/* Нийгмийн сүлжээ холбоосууд хэсэг */}
        <div className="flex flex-col mt-5 sm:mt-0">
          <h5 className="font-semibold mb-2">Биднийг дага</h5>
          <a href="#" className="hover:text-gray-600">Facebook</a>
          <a href="#" className="hover:text-gray-600">Twitter</a>
          <a href="#" className="hover:text-gray-600">Instagram</a>
          <a href="#" className="hover:text-gray-600">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
