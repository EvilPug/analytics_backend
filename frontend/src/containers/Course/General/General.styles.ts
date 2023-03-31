import {createStyles, Theme, makeStyles} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  title: {
    width: '80%',
    fontSize: '24px',
  },
  courseName: {
    fontWeight: 500,
  },
  textItem: {
    marginBottom: '10px'
  },
  description: {
    marginBottom: '10px',
  },
  content: {
    display: 'flex',
    justifyContent: 'row',
  },
  main: {
    marginTop: 15,
    width: '80%',
  },
  btn: {
    minWidth: '120px',
    background: theme.palette.primary.main,
    marginBottom: '20px',
  },
  link: {
    minWidth: '120px',
    textDecoration: 'none',
  },
  btnLink: {
    width: '100%',
    background: theme.palette.primary.main,
    marginBottom: '20px',
  },
  options: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
  },
}));