// import React, { useState, useEffect } from "react";
// import { Container, Typography, Stack, Skeleton } from "@mui/material";
// import { useQuery } from "@tanstack/react-query";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import DraggableUserCard from "./DraggableCard";

// const fetchUsers = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   if (!res.ok) throw new Error("Failed to fetch users");
//   return res.json();
// };

// const LOCAL_STORAGE_KEY = "reorderedUsers";

// const UserList = () => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["users"],
//     queryFn: fetchUsers,
//     staleTime: Infinity,
//     refetchOnWindowFocus: false,
//   });

//   const [users, setUsers] = useState([]);
//   const [initialDataLoaded, setInitialDataLoaded] = useState(false);

//   useEffect(() => {
//     const savedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);

//     if (savedUsers) {
//       setUsers(JSON.parse(savedUsers));
//       setInitialDataLoaded(true);
//     } else if (data && !initialDataLoaded) {
//       const withStringIds = data.map((u) => ({
//         ...u,
//         id: u.id.toString(), // DnD requires string IDs
//       }));
//       setUsers(withStringIds);
//       setInitialDataLoaded(true);
//     }
//   }, [data, initialDataLoaded]);

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     const reordered = Array.from(users);
//     const [movedItem] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, movedItem);

//     setUsers(reordered);
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reordered)); // ✅ Save to localStorage
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 6 }}>
//       <Typography variant="h4" textAlign="center" mb={3}>
//         👥 Draggable User Cards (Persistent)
//       </Typography>

//       {isError && (
//         <Typography color="error" align="center">
//           {error.message}
//         </Typography>
//       )}

//       {!initialDataLoaded ? (
//         <Stack spacing={2}>
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Skeleton
//               key={i}
//               variant="rectangular"
//               height={160}
//               sx={{ borderRadius: 2 }}
//             />
//           ))}
//         </Stack>
//       ) : (
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <Droppable droppableId="userList">
//             {(provided) => (
//               <Stack
//                 spacing={2}
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//               >
//                 {users.map((user, index) => (
//                   <Draggable key={user.id} draggableId={user.id} index={index}>
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <DraggableUserCard user={user} isDragging={snapshot.isDragging} />
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </Stack>
//             )}
//           </Droppable>
//         </DragDropContext>
//       )}
//     </Container>
//   );
// };

// export default UserList;

import React, { useState, useEffect } from "react";
import { Container, Typography, Stack, Skeleton } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DraggableUserCard from "./DraggableCard";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

const UserList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      const fromCache = queryClient.getQueryData(["users"]);
      const withIds = fromCache.map((u) => ({ ...u, id: u.id.toString() }));
      setUsers(withIds);
    }
  }, [data, queryClient]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(users);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setUsers(reordered);
    queryClient.setQueryData(["users"], reordered); // ✅ Update cache
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        👥 Draggable User Cards
      </Typography>

      {isError && (
        <Typography color="error" align="center">
          {error.message}
        </Typography>
      )}

      {isLoading || users.length === 0 ? (
        <Stack spacing={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={160}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="userList">
            {(provided) => (
              <Stack
                spacing={2}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {users.map((user, index) => (
                  <Draggable key={user.id} draggableId={user.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DraggableUserCard user={user} isDragging={snapshot.isDragging} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Container>
  );
};

export default UserList;

