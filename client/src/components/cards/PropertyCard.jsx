// file: PropertyCard.jsx
import React from "react";
import {
    AccessTime as AccessTimeIcon,
    AspectRatio as AspectRatioIcon,
    Favorite as FavoriteIcon,
} from "@mui/icons-material";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

const PropertyCard = ({ property }) => {
    return (
        <Card
            sx={{
                maxWidth: 290,
                height: 405,
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
            }}
        >
            {/* Hình ảnh và nhãn "Hot" */}
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height={200}
                    image={property.image}
                    alt={property.name}
                />
                {property.isHot && (
                    <Chip
                        label="Hot"
                        sx={{
                            position: "absolute",
                            top: 24,
                            left: 24,
                            bgcolor: "error.main",
                            color: "common.white",
                            fontFamily: "'Gantari', Helvetica",
                            fontWeight: 600,
                            fontSize: 20,
                            height: 40,
                            borderRadius: 1,
                        }}
                    />
                )}
            </Box>

            {/* Nội dung chi tiết */}
            <CardContent sx={{ p: 1.875, height: 190 }}>
                <Stack spacing={1.5} height="100%">
                    {/* Tiêu đề + nút Favorite */}
                    <Stack spacing={1}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                fontFamily="'Gantari', Helvetica"
                                fontWeight={600}
                                fontSize={20}
                                color="text.primary"
                            >
                                {property.name}
                            </Typography>
                            <IconButton aria-label="add to favorites" sx={{ p: 0 }}>
                                <FavoriteIcon />
                            </IconButton>
                        </Box>
                        <Typography
                            fontFamily="'Inter', Helvetica"
                            color="#7a7373"
                            fontSize={16}
                        >
                            {property.location}
                        </Typography>

                    </Stack>

                    {/* Giá thuê */}
                    <Typography
                        fontFamily="'Inter', Helvetica"
                        fontWeight={600}
                        fontSize={22}
                        color="error.main"
                    >
                        {property.price}
                        <Divider sx={{ borderColor: "rgba(122, 115, 115, 0.1)" }} />
                    </Typography>



                    {/* Diện tích và Thời gian */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-end"
                        pt={1}
                    >

                        {/* Diện tích */}
                        <Stack spacing={0.75}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <AspectRatioIcon />
                                <Typography
                                    fontFamily="'Inter', Helvetica"
                                    fontWeight={500}
                                    fontSize={16}
                                    color="#100e2c"
                                >
                                    {property.size}
                                </Typography>
                            </Stack>
                            <Typography
                                fontFamily="'Gantari', Helvetica"
                                fontWeight={500}
                                fontSize={14}
                                color="#100e2c"
                            >
                                Diện tích
                            </Typography>
                        </Stack>

                        {/* Thời gian */}
                        <Stack spacing={0.75}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <AccessTimeIcon />
                                <Typography
                                    fontFamily="'Inter', Helvetica"
                                    fontWeight={500}
                                    fontSize={16}
                                    color="#100e2c"
                                >
                                    {property.time}
                                </Typography>
                            </Stack>
                            <Typography
                                fontFamily="'Gantari', Helvetica"
                                fontWeight={500}
                                fontSize={14}
                                color="#100e2c"
                            >
                                Thời gian
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};
export default PropertyCard;