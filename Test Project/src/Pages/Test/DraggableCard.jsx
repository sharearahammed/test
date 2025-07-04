// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   Divider,
// } from "@mui/material";

// const DraggableUserCard = ({ user, isDragging }) => {
//   return (
//     <Card
//       elevation={isDragging ? 8 : 3}
//       sx={{
//         borderRadius: 3,
//         p: 2,
//         mb: 2,
//         cursor: "grab",
//         backgroundColor: isDragging ? "#e3f2fd" : "white",
//         userSelect: "none",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
//           {user.name} ({user.username})
//         </Typography>
//         <Chip label={user.email} sx={{ mb: 1 }} />
//         <Typography variant="body2">📞 {user.phone}</Typography>
//         <Typography variant="body2">🌐 {user.website}</Typography>
//         <Divider sx={{ my: 1 }} />
//         <Typography variant="caption">
//           {user.address.street}, {user.address.city}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default DraggableUserCard;


import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

const DraggableUserCard = ({ user, isDragging }) => {
  return (
    <Card
      elevation={isDragging ? 8 : 3}
      sx={{
        borderRadius: 3,
        p: 2,
        mb: 2,
        cursor: "grab",
        backgroundColor: isDragging ? "#e3f2fd" : "white",
        userSelect: "none",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {user.name} ({user.username})
        </Typography>
        <Chip label={user.email} sx={{ mb: 1 }} />
        <Typography variant="body2">📞 {user.phone}</Typography>
        <Typography variant="body2">🌐 {user.website}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption">
          {user.address.street}, {user.address.city}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DraggableUserCard;

