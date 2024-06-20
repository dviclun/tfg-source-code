import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { Grid, Typography } from "@mui/material";
import PropTypes from 'prop-types';



export const LandingArticleReverse = ({isSmall, children, image, imageClass, title, ...props}) => {
  return (
    <Grid {...props} >
                    <Grid container item xs={12} md={6} justifyContent='center' alignItems='center'>
                        <Parallax opacity={[0,5]} speed={10}>
                            <Typography variant={isSmall ? 'h6': 'h4'} sx={{textAlign:{xs: 'center', md: 'left'}, fontFamily: 'Poppins', fontWeight: 'bold'}}>{title}</Typography>
                            {children}
                        </Parallax>
                    </Grid>
                    <Grid container item xs={12} md={6} justifyContent='center' alignItems='center'>
                            <Parallax opacity={[0,5]} speed={10}>
                                <img className={imageClass} src={image}></img>
                            </Parallax>    
                    </Grid>  
    </Grid>
  )
}

LandingArticleReverse.propTypes = {
  isSmall: PropTypes.bool,
  children: PropTypes.node,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  title: PropTypes.string,
  props: PropTypes.any
}