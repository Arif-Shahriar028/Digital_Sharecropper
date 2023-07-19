import React from 'react';

const appointLists = [
  {
    id: 1,
    appointmentTime: '10:30 AM',
    place: 'Rangpur,Sadar',
    status: 'Pending',
  },
  {
    id: 2,
    appointmentTime: '12:30 PM',
    place: 'Rangpur,Sadar',
    status: 'Accepted',
  },
];
const DealForLandowner = () => {
  return (
    <React.Fragment>
      <table className="w-full table-auto mt-3 border-[1px]">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {/* <th className="py-3 px-6 text-center"></th> */}
            <th className="py-3 px-6 text-center">Landowner NID</th>
            <th className="py-3 px-6 text-center">Farmer NID</th>
            <th className="py-3 px-6 text-center">Location</th>
            <th className="py-3 px-6 text-center">Land amount</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-md">
          {appointLists.map((req) => (
            <tr
              key={req.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {/* {req.landUnit} */}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {/* {req.landLocation} */}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {req.appointmentTime}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {req.place}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default DealForLandowner;
