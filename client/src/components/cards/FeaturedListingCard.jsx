import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const FeaturedListingCard = ({ image, title, description }) => {
    return (
        <Card
            sx={{
                height: "450px",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                border: "1px solid #d5d5d5",
                boxShadow: "1px 1px 7px rgba(0, 0, 0, 0.25)",
            }}
        >
            <CardMedia
                component="div"
                sx={{
                    height: 241,
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <CardContent sx={{ p: 1.5, height: "100%" }}>
                <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{
                        fontSize: "15px",
                        lineHeight: "30px",
                        height: "59px",
                        overflow: "hidden",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight="light"
                    sx={{
                        fontSize: "12px",
                        lineHeight: "30px",
                        height: "90px",
                        overflow: "hidden",
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FeaturedListingCard; 