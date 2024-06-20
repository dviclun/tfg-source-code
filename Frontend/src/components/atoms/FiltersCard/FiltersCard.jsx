import { Card, CardActionArea, CardContent, CardMedia, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from "@mui/material/styles";
import PropTypes from 'prop-types';

import React from 'react'


export const FiltersCard = ({ cardTitle, imgHeight, muscularGroup, groupId, handleFilterClick, loadImage: loadImageProp }) => {

    const theme = useTheme();

    const isLarge = useMediaQuery(theme.breakpoints.down('lg'));

    const loadImage = loadImageProp || (() => {
        switch (muscularGroup.toLowerCase()) {
            case 'abs':
                return 'https://i.imgur.com/CZoXamC.jpg';

            case 'arms':
                return 'https://i.imgur.com/0cxsnnW.jpeg';

            case 'back':
                return 'https://i.imgur.com/6ha1HRo.jpeg';

            case 'biceps':
                return 'https://i.imgur.com/V7FmUoe.jpeg';
            case 'calves':
                return 'https://i.imgur.com/uzsr0mq.jpeg';
            case 'chest':
                return 'https://i.imgur.com/QkAeB2m.jpeg';
            case 'forearms':
                return 'https://i.imgur.com/1kwqMrd.jpeg';
            case 'glutes':
                return 'https://i.imgur.com/Vg6s5th.jpeg';
            case 'hamstrings':
                return 'https://i.imgur.com/ZpJS8lp.jpeg';
            case 'legs':
                return 'https://i.imgur.com/LvwURJZ.jpeg';
            case 'quadriceps':
                return 'https://i.imgur.com/GcxQJCD.jpeg';
            case 'shoulders':
                return 'https://i.imgur.com/TKyajtc.jpeg';
            case 'triceps':
                return 'https://i.imgur.com/qJwE6hn.jpeg';
            default:
                return 'https://i.imgur.com/CZoXamC.jpg'
        }
    })

    return (
        <Card className="trainingCard">
            <CardActionArea onClick={() => handleFilterClick(groupId)}>
                <CardMedia
                    className='cardImage'
                    component="img"
                    height={imgHeight}
                    image={loadImage()}
                />
                <CardContent className='cardBg' sx={{ position: "absolute", top: 0, zIndex: '100', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant={isLarge ? 'body2' : 'h6'} sx={{ fontFamily: 'Poppins', fontWeight: 'bold', color: '#fff', fontStyle: 'italic' }}>
                        {cardTitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

FiltersCard.propTypes = {
    cardTitle: PropTypes.string,
    imgHeight: PropTypes.string,
    muscularGroup: PropTypes.string,
    groupId: PropTypes.number,
    handleFilterClick: PropTypes.func
}