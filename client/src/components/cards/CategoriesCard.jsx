// import React from 'react';
// import './Card.scss';  // Đảm bảo rằng bạn đã tạo file SCSS cho component

// const Card = () => {
//     return (
//         <div className="card">
//             {/* Label */}
//             <div className="label">Hot</div>

//             {/* Image */}
//             <img src="property-image.jpg" alt="Property" />

//             {/* Card Content */}
//             <div className="content">
//                 <h3>Phong tro So 1</h3>
//                 <p>Dĩ An, Bình Dương</p>
//                 <div className="price">6 Triệu / Tháng</div>

//                 {/* Info Section */}
//                 <div className="info">
//                     <div className="item">
//                         <i className="fas fa-expand"></i>
//                         <span>60m2</span>
//                     </div>
//                     <div className="item">
//                         <i className="fas fa-clock"></i>
//                         <span>5 giờ trước</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Card;



// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Clock, Heart, Maximize2 } from "lucide-react";
// import React from "react";

// export default function Categories(): JSX.Element {
//   // Location filter data
//   const locations = [
//     { name: "Tp.Hồ Chí Minh", width: "w-[127px]" },
//     { name: "Hà Nội", width: "w-[68px]" },
//     { name: "Bình Dương", width: "w-[105px]" },
//   ];

//   // Room listing data
//   const roomListings = [
//     {
//       id: 1,
//       image: "/img-4.png",
//       title: "Phong tro So 1",
//       location: "Dĩ An, Bình Dương",
//       price: "6 Triệu / Tháng",
//       size: "60m2",
//       time: "5 giờ trước",
//       isHot: true,
//     },
//     {
//       id: 2,
//       image: "/img-5.png",
//       title: "Phong tro So 1",
//       location: "Dĩ An, Bình Dương",
//       price: "6 Triệu / Tháng",
//       size: "60m2",
//       time: "5 giờ trước",
//       isHot: true,
//     },
//     {
//       id: 3,
//       image: "/img-6.png",
//       title: "Phong tro So 1",
//       location: "Dĩ An, Bình Dương",
//       price: "6 Triệu / Tháng",
//       size: "60m2",
//       time: "5 giờ trước",
//       isHot: true,
//     },
//     {
//       id: 4,
//       image: "/img-7.png",
//       title: "Phong tro So 1",
//       location: "Dĩ An, Bình Dương",
//       price: "6 Triệu / Tháng",
//       size: "60m2",
//       time: "5 giờ trước",
//       isHot: true,
//     },
//     {
//       id: 5,
//       image: "/img-2.png",
//       title: "Phong tro So 1",
//       location: "Dĩ An, Bình Dương",
//       price: "6 Triệu / Tháng",
//       size: "60m2",
//       time: "5 giờ trước",
//       isHot: true,
//     },
//     {
//       id: 6,
//       image: "/img.png",
//       title: "Phong tro So 1",
//       location: "Dĩ An, Bình Dương",
//       price: "6 Triệu / Tháng",
//       size: "60m2",
//       time: "5 giờ trước",
//       isHot: true,
//     },
//     {
//       id: 7,
//       image: "/image.png",
//       title: "Phong tro So 1",
//       location: "Dĩ An, Bình Dương",
//       price: "6 Triệu / Tháng",
//       size: "60m2",
//       time: "5 giờ trước",
//       isHot: true,
//     },
//     {
//       id: 8,
//       image: "/img-3.png",
//       title: "Phong tro So 1",
//       location: "Dĩ An, Bình Dương",
//       price: "6 Triệu / Tháng",
//       size: "60m2",
//       time: "5 giờ trước",
//       isHot: true,
//     },
//   ];

//   return (
//     <section className="flex flex-col max-w-[1440px] mx-auto py-[50px] px-[30px] gap-10">
//       <header className="flex justify-center">
//         <h1 className="[font-family:'Inter-Bold',Helvetica] font-bold text-black text-4xl tracking-[0] leading-5">
//           PHÒNG TRỌ NỔI BẬT
//         </h1>
//       </header>

//       <div className="flex flex-col gap-[15px]">
//         <div className="flex items-center gap-[9px] max-w-[1194px] mx-auto">
//           <h2 className="[font-family:'Inter-Bold',Helvetica] font-bold text-black text-base tracking-[0] leading-5">
//             Cho Thuê Phòng Trọ
//           </h2>

//           <div className="flex gap-2">
//             {locations.map((location, index) => (
//               <Button
//                 key={index}
//                 variant="outline"
//                 className={`${location.width} bg-soft-grey rounded-lg [font-family:'Gantari-Medium',Helvetica] font-medium text-black text-base`}
//               >
//                 {location.name}
//               </Button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-[1194px] mx-auto">
//           {roomListings.map((room) => (
//             <Card
//               key={room.id}
//               className="overflow-hidden border-none shadow-none"
//             >
//               <div className="relative h-[215px] rounded-t-xl overflow-hidden">
//                 <div
//                   className="w-full h-full bg-cover bg-center p-6"
//                   style={{ backgroundImage: `url(${room.image})` }}
//                 >
//                   {room.isHot && (
//                     <Badge className="absolute top-6 left-6 bg-red text-white px-5 py-2.5 text-xl [font-family:'Gantari-SemiBold',Helvetica] font-semibold">
//                       Hot
//                     </Badge>
//                   )}
//                 </div>
//               </div>

//               <CardContent className="p-0">
//                 <div className="flex flex-col h-[190px] bg-white rounded-b-xl shadow-[2px_2px_10px_#0000001a]">
//                   <div className="flex-1 flex flex-col gap-5 p-[15px]">
//                     <div className="flex flex-col gap-4">
//                       <div className="flex justify-between items-center">
//                         <h3 className="[font-family:'Gantari-SemiBold',Helvetica] font-semibold text-black text-xl">
//                           {room.title}
//                         </h3>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="p-0 h-auto"
//                         >
//                           <Heart className="w-6 h-6 text-red" />
//                         </Button>
//                       </div>
//                       <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#7a7373] text-base">
//                         {room.location}
//                       </p>
//                     </div>
//                     <p className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-red text-[22px]">
//                       {room.price}
//                     </p>
//                   </div>

//                   <div className="flex justify-between items-center p-3 pt-3 pb-0 border-t border-[#7a73731a]">
//                     <div className="flex flex-col gap-1">
//                       <div className="flex items-center gap-2">
//                         <Maximize2 className="w-6 h-6" />
//                         <span className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#100e2c] text-base">
//                           {room.size}
//                         </span>
//                       </div>
//                       <span className="[font-family:'Gantari-Medium',Helvetica] font-medium text-[#100e2c] text-sm">
//                         Diện tích
//                       </span>
//                     </div>

//                     <div className="flex flex-col gap-1">
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-6 h-6" />
//                         <span className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#100e2c] text-base">
//                           {room.time}
//                         </span>
//                       </div>
//                       <span className="[font-family:'Gantari-Medium',Helvetica] font-medium text-[#100e2c] text-sm">
//                         Thời gian
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
