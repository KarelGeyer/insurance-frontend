import { Grid, Paper } from "@mui/material";

interface IProps {
  children: React.ReactNode;
  marginTop: number;
  alignContent?: "center" | "flex-start" | "flex-end";
}

const Section = ({ children, marginTop, alignContent = "center" }: IProps) => {
  return (
    <Grid container justifyContent="center" sx={{ marginTop }}>
      <Grid item xs={12} md={10} lg={8} xl={9}>
        <Paper
          elevation={5}
          style={{
            padding: 20,
            textAlign: "start",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: alignContent,
          }}
        >
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Section;
