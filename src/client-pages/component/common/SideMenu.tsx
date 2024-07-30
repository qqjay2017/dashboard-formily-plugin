// import { css } from "@emotion/css";

// function SideMenu() {
//   return (
//     <div
//       className={css`
//         width: 200px;
//         height: 100%;
//         overflow: hidden auto;
//         background-color: #fff;
//       `}
//     >
//       {[
//         {
//           label: "全部",
//           name: "",
//           icon: <LuDatabase />,
//         },
//         ...allChartType,
//       ].map((type, index) => {
//         return (
//           <ChartTypeItem
//             key={type.name + index}
//             {...type}
//             isActive={chartType === type.name}
//             onClick={() => {
//               setSearchParams({
//                 type: type.name,
//               });
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }

// export default SideMenu;
