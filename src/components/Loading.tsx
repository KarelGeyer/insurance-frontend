import { Box, CircularProgress, Skeleton } from "@mui/material";

interface IProps {
  isSimple?: boolean;
  isLinear?: boolean;
}

const Loading = ({ isSimple = false, isLinear = false }: IProps) => {
  return (
    <>
      {isSimple ? (
        <>
          {isLinear ? (
            <Skeleton sx={{ minWidth: 100 }} />
          ) : (
            <CircularProgress />
          )}
        </>
      ) : (
        <Box sx={{ width: 600 }}>
          <Skeleton animation="wave" sx={{ marginTop: 5 }} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" sx={{ marginBottom: 5 }} />
        </Box>
      )}
    </>
  );
};

export default Loading;
