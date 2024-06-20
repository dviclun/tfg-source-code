import { Grid, Typography, useMediaQuery } from "@mui/material"
import PropTypes from 'prop-types';
import { useTheme } from "@mui/material/styles";

export const SectionTitle = ({title, subtitle}) => {
    const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid item xs={12}>
            <Typography variant={isSmall ? "h4" : "h3"} sx={{textAlign:'center', fontFamily:'Poppins', fontWeight: 'bolder'}} >{title.toUpperCase()}</Typography>
            <Typography variant={isSmall ? "body1" : "h6"} sx={{textAlign:'center', fontFamily:'Poppins', fontWeight: 'light', fontStyle: 'italic'}}>{subtitle}</Typography>
            <hr className="separator"/>
        </Grid>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}