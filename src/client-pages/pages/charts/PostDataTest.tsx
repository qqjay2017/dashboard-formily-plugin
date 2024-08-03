// import { Button } from "antd";
// import { uid } from "@formily/shared";
// import testjson from "./testjson.json";
// import { useEditChartApi } from "./useEditChartApi";

// export default function PsotDataTest() {
//   const editChartApi = useEditChartApi();
//   return (
//     <Button
//       onClick={async () => {
//         await Promise.all(
//           testjson.map((item) => {
//             return new Promise((resolve) => {
//               editChartApi({
//                 isCreate: true,
//                 chartId: uid(),
//                 values: item,
//               }).then(() => {
//                 resolve({});
//               });
//             });
//           })
//         );
//       }}
//     >
//       测试
//     </Button>
//   );
// }
