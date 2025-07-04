import React, { useEffect, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Skeleton,
  Chip,
  Divider,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchCommentsByPostId = async ({ pageParam = 1 }) => {
  await delay(2000);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${pageParam}`
  );
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return { data, nextPostId: pageParam + 1, currentPostId: pageParam };
};

const SkeletonCard = () => (
  <Card elevation={3} sx={{ borderRadius: 3 }}>
    <CardContent>
      <Skeleton variant="text" width="60%" height={30} />
      <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1, mb: 1 }} />
      <Skeleton variant="text" width="40%" height={18} />
    </CardContent>
  </Card>
);

const Test = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: fetchCommentsByPostId,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return lastPage.nextPostId;
    },
  });

  const loaderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        📬 User Comments
      </Typography>

      <Stack spacing={3}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : data.pages.map((page) =>
              page.data.map((comment) => (
                <Card
                  key={comment.id}
                  elevation={3}
                  sx={{ borderRadius: 3, p: 2 }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      {comment.name}
                    </Typography>

                    <Chip
                      label={comment.email}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />

                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                      {comment.body}
                    </Typography>

                    <Divider sx={{ mb: 1 }} />

                    <Typography variant="caption" color="text.secondary">
                      Post ID: {comment.postId} &nbsp;|&nbsp; Comment ID: {comment.id}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
      </Stack>

      {/* Show Skeletons while fetching next page */}
      {isFetchingNextPage && (
        <Box mt={4}>
          <Stack spacing={3}>
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCard key={`next-page-skeleton-${i}`} />
            ))}
          </Stack>
        </Box>
      )}

      <Box ref={loaderRef} sx={{ height: 20, mt: 3 }} />

      {isError && (
        <Typography color="error" align="center" mt={5}>
          {error.message}
        </Typography>
      )}
    </Container>
  );
};

export default Test;
