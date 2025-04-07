// file: FeaturedPropertiesSection.jsx
import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import PropertyCard from "../cards/PropertyCard";

const FeaturedProperties = () => {
    // Location filter buttons data
    const locationFilters = [
        { id: 1, name: "Tp.Hồ Chí Minh" },
        { id: 2, name: "Hà Nội" },
        { id: 3, name: "Bình Dương" },
    ];

    // Property cards data
    const propertyCards = [
        {
            id: 1,
            name: "Phong tro So 1",
            location: "Dĩ An, Bình Dương",
            price: "6 Triệu / Tháng",
            size: "60m2",
            time: "5 giờ trước",
            image: "https://c.animaapp.com/m8mtc6xrHmsOL1/img/img-7.png",
            isHot: true,
        },
        {
            id: 2,
            name: "Phong tro So 1",
            location: "Dĩ An, Bình Dương",
            price: "6 Triệu / Tháng",
            size: "60m2",
            time: "5 giờ trước",
            image: "https://c.animaapp.com/m8mtc6xrHmsOL1/img/img-7.png",
            isHot: true,
        },
        // ... các item khác
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
                py: 6.25,
                px: 3.75,
            }}
        >
            <Typography
                variant="h3"
                fontFamily="'Inter', Helvetica"
                fontWeight="bold"
                color="text.primary"
                textAlign="center"
            >
                PHÒNG TRỌ NỔI BẬT
            </Typography>

            <Stack spacing={2} width="100%" alignItems="center">
                {/* Khu vực filter địa điểm */}
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    width="100%"
                    maxWidth="1194px"
                >
                    <Typography
                        fontFamily="'Inter', Helvetica"
                        fontWeight="bold"
                        color="text.primary"
                        fontSize={16}
                    >
                        Cho Thuê Phòng Trọ
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        {locationFilters.map((filter) => (
                            <Button
                                key={filter.id}
                                sx={{
                                    bgcolor: "secondary.main",
                                    color: "text.primary",
                                    borderRadius: 2,
                                    fontFamily: "'Gantari', Helvetica",
                                    fontWeight: 500,
                                    fontSize: 16,
                                    "&:hover": {
                                        bgcolor: "secondary.dark",
                                    },
                                }}
                            >
                                {filter.name}
                            </Button>
                        ))}
                    </Stack>
                </Stack>

                {/* Danh sách card */}
                <Grid
                    container
                    spacing={2.5}
                    maxWidth="1194px"
                    justifyContent="flex-start"
                >
                    {propertyCards.map((property) => (
                        <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
                            {/* Sử dụng PropertyCard component */}
                            <PropertyCard property={property} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Box>
    );
};
export default FeaturedProperties;
