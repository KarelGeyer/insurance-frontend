import { Box, Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ width: 600 }}>
      <Skeleton animation="wave" sx={{ marginTop: 5 }} />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" sx={{ marginBottom: 5 }} />
    </Box>
  );
};

export default Loading;
